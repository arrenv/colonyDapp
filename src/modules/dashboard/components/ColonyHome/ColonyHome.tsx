import { Redirect } from 'react-router';
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import { subscribeActions as subscribeToReduxActions } from 'redux-action-watch/lib/actionCreators';
import { useDispatch } from 'redux-react-hook';
import throttle from 'lodash/throttle';

import { COLONY_TOTAL_BALANCE_DOMAIN_ID, ROOT_DOMAIN } from '~constants';
import { Address } from '~types/index';
import {
  TasksFilterOptionType,
  TasksFilterOptions,
  tasksFilterSelectOptions,
} from '../shared/tasksFilter';
import { ActionTypes } from '~redux/index';
import { useDataFetcher, useSelector, useTransformer } from '~utils/hooks';
import { mergePayload } from '~utils/actions';
import Transactions from '~admin/Transactions';
import { Tab, Tabs, TabList, TabPanel } from '~core/Tabs';
import { Select } from '~core/Fields';
import Heading from '~core/Heading';
import Button, { ActionButton } from '~core/Button';
import RecoveryModeAlert from '~admin/RecoveryModeAlert';
import LoadingTemplate from '~pages/LoadingTemplate';
import BreadCrumb from '~core/BreadCrumb';
import {
  colonyAddressFetcher,
  colonyFetcher,
  domainsAndRolesFetcher,
} from '../../fetchers';
import {
  colonyNativeTokenSelector,
  colonyEthTokenSelector,
} from '../../selectors';
import { getUserRoles } from '../../../transformers';
import { isInRecoveryMode as isInRecoveryModeCheck } from '../../checks';
import { useLoggedInUser } from '~data/helpers';
import { canAdminister, hasRoot } from '../../../users/checks';

import ColonyFunding from './ColonyFunding';
import ColonyMeta from './ColonyMeta';
import TabContribute from './TabContribute';

import styles from './ColonyHome.css';

const MSG = defineMessages({
  loadingText: {
    id: 'dashboard.Admin.loadingText',
    defaultMessage: 'Loading Colony',
  },
  tabContribute: {
    id: 'dashboard.ColonyHome.tabContribute',
    defaultMessage: 'Tasks',
  },
  tabTransactions: {
    id: 'dashboard.ColonyHome.tabTransactions',
    defaultMessage: 'Transactions',
  },
  labelFilter: {
    id: 'dashboard.ColonyHome.labelFilter',
    defaultMessage: 'Filter',
  },
  placeholderFilter: {
    id: 'dashboard.ColonyHome.placeholderFilter',
    defaultMessage: 'Filter',
  },
  newTaskButton: {
    id: 'dashboard.ColonyHome.newTaskButton',
    defaultMessage: 'New Task',
  },
  noFilter: {
    id: 'dashboard.ColonyHome.noFilter',
    defaultMessage: 'All Transactions in Colony',
  },
});

interface Props {
  match: any;
}

const displayName = 'dashboard.ColonyHome';

const ColonyHome = ({
  match: {
    params: { colonyName },
  },
}: Props) => {
  const [filterOption, setFilterOption] = useState(TasksFilterOptions.ALL_OPEN);
  const [filteredDomainId, setFilteredDomainId] = useState(
    COLONY_TOTAL_BALANCE_DOMAIN_ID,
  );
  const [isTaskBeingCreated, setIsTaskBeingCreated] = useState(false);
  const [activeTab, setActiveTab] = useState<'tasks' | 'transactions'>('tasks');

  const dispatch = useDispatch();

  /*
   * @NOTE this needs to return the `subscribeToReduxActions` function, since that returns an
   * unsubscriber, and that gets called when the component is unmounted
   */
  useEffect(
    () =>
      subscribeToReduxActions(dispatch)({
        [ActionTypes.TASK_CREATE]: () => setIsTaskBeingCreated(true),
        [ActionTypes.TASK_CREATE_SUCCESS]: () => setIsTaskBeingCreated(false),
        [ActionTypes.TASK_CREATE_ERROR]: () => setIsTaskBeingCreated(false),
      }),
    [dispatch, setIsTaskBeingCreated],
  );

  const formSetFilter = useCallback(
    (_: string, value: TasksFilterOptionType) => setFilterOption(value as any),
    [setFilterOption],
  );

  /*
   * @NOTE Blockchain-first approach
   * We get the colony's address from the ENS resolver, then using that,
   * we fetch data from mongo
   */
  const { data: colonyAddress, error: addressError } = useDataFetcher(
    colonyAddressFetcher,
    [colonyName],
    [colonyName],
  );

  const { data: colony } = useDataFetcher(
    colonyFetcher,
    [colonyAddress],
    [colonyAddress],
  );

  const { data: domains, isFetching: isFetchingDomains } = useDataFetcher(
    domainsAndRolesFetcher,
    [colonyAddress],
    [colonyAddress],
  );

  const { walletAddress } = useLoggedInUser();

  const currentDomainUserRoles = useTransformer(getUserRoles, [
    domains,
    filteredDomainId || ROOT_DOMAIN,
    walletAddress,
  ]);

  const rootUserRoles = useTransformer(getUserRoles, [
    domains,
    ROOT_DOMAIN,
    walletAddress,
  ]);

  const crumbs = useMemo(() => {
    switch (filteredDomainId) {
      case 0:
        return [{ id: 'domain.all' }];

      case 1:
        return [{ id: 'domain.root' }];

      default:
        return domains[filteredDomainId]
          ? [{ id: 'domain.root' }, domains[filteredDomainId].name]
          : [{ id: 'domain.root' }];
    }
  }, [domains, filteredDomainId]);

  const colonyArgs: [Address | undefined] = [colonyAddress || undefined];
  const nativeTokenRef = useSelector(colonyNativeTokenSelector, colonyArgs);
  const ethTokenRef = useSelector(colonyEthTokenSelector, colonyArgs);

  const transform = useCallback(
    // Use ROOT_DOMAIN if filtered domain id equals 0
    mergePayload({
      colonyAddress,
      domainId: filteredDomainId || ROOT_DOMAIN,
    }),
    [colonyAddress, filteredDomainId],
  );

  if (!colonyName || addressError) {
    return <Redirect to="/404" />;
  }

  if (
    !colony ||
    !colonyAddress ||
    !domains ||
    isFetchingDomains
    /*
     * @TODO Re-add nativeTokenRef
     * Right now it gets hung up since the colony's data is no longer making it's way
     * into the redux state
     *
     *!nativeTokenRef ||
     */
  ) {
    return <LoadingTemplate loadingText={MSG.loadingText} />;
  }

  // Eventually this has to be in the proper domain. There's probably going to be a different UI for that
  const canCreateTask = canAdminister(currentDomainUserRoles);
  const isInRecoveryMode = isInRecoveryModeCheck(colony);

  const noFilter = (
    <Heading
      text={MSG.noFilter}
      appearance={{ size: 'tiny', margin: 'small' }}
    />
  );

  return (
    <div className={styles.main}>
      <aside className={styles.colonyInfo}>
        <div className={styles.metaContainer}>
          <ColonyMeta
            colony={colony}
            canAdminister={!isInRecoveryMode && canAdminister(rootUserRoles)}
            domains={domains}
            filteredDomainId={filteredDomainId}
            setFilteredDomainId={setFilteredDomainId}
          />
        </div>
      </aside>
      <main className={styles.content}>
        <div className={styles.breadCrumbContainer}>
          {domains && crumbs && <BreadCrumb elements={crumbs} />}
        </div>
        <Tabs>
          <TabList extra={activeTab === 'tasks' ? null : noFilter}>
            <Tab onClick={() => setActiveTab('tasks')}>
              <FormattedMessage {...MSG.tabContribute} />
            </Tab>
            <Tab onClick={() => setActiveTab('transactions')}>
              <FormattedMessage {...MSG.tabTransactions} />
            </Tab>
          </TabList>
          <div className={styles.interactiveBar}>
            {activeTab === 'tasks' ? (
              <>
                <Select
                  appearance={{ alignOptions: 'left', theme: 'alt' }}
                  connect={false}
                  elementOnly
                  label={MSG.labelFilter}
                  name="filter"
                  options={tasksFilterSelectOptions}
                  placeholder={MSG.placeholderFilter}
                  form={{ setFieldValue: formSetFilter }}
                  $value={filterOption}
                />
                {canCreateTask && (
                  <ActionButton
                    button={({ onClick, disabled, loading }) => (
                      <Button
                        appearance={{ theme: 'primary', size: 'medium' }}
                        text={MSG.newTaskButton}
                        disabled={disabled}
                        loading={loading}
                        onClick={throttle(onClick, 2000)}
                      />
                    )}
                    disabled={isInRecoveryMode}
                    error={ActionTypes.TASK_CREATE_ERROR}
                    submit={ActionTypes.TASK_CREATE}
                    success={ActionTypes.TASK_CREATE_SUCCESS}
                    transform={transform}
                    loading={isTaskBeingCreated}
                  />
                )}
              </>
            ) : null}
          </div>
          <TabPanel>
            <TabContribute
              allowTaskCreation={canCreateTask}
              colony={colony}
              filteredDomainId={filteredDomainId}
              filterOption={filterOption}
              ethTokenRef={ethTokenRef}
              nativeTokenRef={nativeTokenRef}
              showQrCode={hasRoot(rootUserRoles)}
            />
          </TabPanel>
          <TabPanel>
            <Transactions colonyAddress={colony.colonyAddress} />
          </TabPanel>
        </Tabs>
      </main>
      <aside className={styles.sidebar}>
        <ColonyFunding
          colonyAddress={colonyAddress}
          currentDomainId={filteredDomainId}
        />
      </aside>
      {isInRecoveryMode && <RecoveryModeAlert />}
    </div>
  );
};

ColonyHome.displayName = displayName;

export default ColonyHome;
