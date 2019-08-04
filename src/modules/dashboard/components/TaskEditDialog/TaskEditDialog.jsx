/* @flow */

// $FlowFixMe until we have new react flow types with hooks
import React, { useCallback, useMemo, useEffect } from 'react';
import { defineMessages } from 'react-intl';
import * as yup from 'yup';
import { FieldArray } from 'formik';
import nanoid from 'nanoid';
import moveDecimal from 'move-decimal-point';
import BigNumber from 'bn.js';
import { subscribeActions as subscribeToReduxActions } from 'redux-action-watch/lib/actionCreators';
import { useDispatch } from 'redux-react-hook';

import type { ColonyType, UserType, TaskPayoutType } from '~immutable';
import type { ItemDataType } from '~core/OmniPicker';

import SingleUserPicker from '~core/SingleUserPicker';
import Button from '~core/Button';
import { ActionForm, FormStatus } from '~core/Fields';
import { FullscreenDialog } from '~core/Dialog';
import DialogSection from '~core/Dialog/DialogSection.jsx';
import Heading from '~core/Heading';
import DialogBox from '~core/Dialog/DialogBox.jsx';
import { SpinnerLoader } from '~core/Preloaders';
import { UserProfileRecord, UserRecord } from '~immutable';
import { ACTIONS } from '~redux';
import HookedUserAvatar from '~users/HookedUserAvatar';
import { mapPayload, mergePayload, pipe } from '~utils/actions';
import {
  useDataFetcher,
  useDataSubscriber,
  useDataMapFetcher,
  useSelector,
} from '~utils/hooks';

import WrappedPayout from './WrappedPayout.jsx';
import { colonySubscriber } from '../../subscribers';
import { taskSelector, taskRequestsSelector } from '../../selectors';
import { useColonyTokens } from '../../hooks/useColonyTokens';

import { userFetcher, usersByAddressFetcher } from '../../../users/fetchers';
import { allUsersAddressesSelector } from '../../../users/selectors';
import { createAddress } from '../../../../types';

import styles from './TaskEditDialog.css';

const MSG = defineMessages({
  titleAssignment: {
    id: 'dashboard.TaskEditDialog.titleAssignment',
    defaultMessage: 'Assignment',
  },
  titleFunding: {
    id: 'dashboard.TaskEditDialog.titleFunding',
    defaultMessage: 'Funding',
  },
  add: {
    id: 'dashboard.TaskEditDialog.add',
    defaultMessage: 'Add +',
  },
  notSet: {
    id: 'dashboard.TaskEditDialog.notSet',
    defaultMessage: 'Not set',
  },
  search: {
    id: 'dashboard.TaskEditDialog.search',
    defaultMessage: 'Search...',
  },
  selectAssignee: {
    id: 'dashboard.TaskEditDialog.selectAssignee',
    defaultMessage: 'Select Assignee',
  },
  workerRequiredError: {
    id: 'dashboard.TaskEditDialog.workerRequiredError',
    defaultMessage: 'Please select a worker.',
  },
  insufficientFundsError: {
    id: 'dashboard.TaskEditDialog.insufficientFundsError',
    defaultMessage: "You don't have enough funds",
  },
  tokenRequiredError: {
    id: 'dashboard.TaskEditDialog.tokenRequiredError',
    defaultMessage: 'Token required',
  },
  amountPositiveError: {
    id: 'dashboard.TaskEditDialog.amountPositiveError',
    defaultMessage: 'Amount must be a positive number.',
  },
  amountRequiredError: {
    id: 'dashboard.TaskEditDialog.amountRequiredError',
    defaultMessage: 'Amount required',
  },
  unknownToken: {
    id: 'dashboard.TaskEditDialog.unknownToken',
    defaultMessage: 'Unknown Token',
  },
});

type Props = {|
  cancel: () => void,
  close: () => void,
  draftId: string,
  maxTokens?: number,
  minTokens?: number,
|};

const UserAvatar = HookedUserAvatar({ fetchUser: false });

const supFilter = (data, filterValue) => {
  if (!filterValue) {
    return data;
  }

  const filtered = data.filter(
    user =>
      user &&
      filterValue &&
      (user.profile.username
        .toLowerCase()
        .includes(filterValue.toLowerCase()) ||
        user.profile.walletAddress
          .toLowerCase()
          .includes(filterValue.toLowerCase())),
  );

  const customValue = {
    id: 'filterValue',
    profile: {
      walletAddress: filterValue,
      displayName: filterValue,
    },
  };

  return [customValue].concat(filtered);
};

const supRenderAvatar = (address: string, item: ItemDataType<UserType>) => {
  const { id, ...user } = item;
  return <UserAvatar address={address} user={user} size="xs" />;
};

const canAddTokens = (values, maxTokens) =>
  !maxTokens || (values.payouts && values.payouts.length < maxTokens);

const canRemoveTokens = (values, minTokens) =>
  !minTokens || (values.payouts && values.payouts.length > minTokens);

const displayName = 'dashboard.TaskEditDialog';

const TaskEditDialog = ({
  cancel,
  close: closeDialog,
  draftId,
  maxTokens,
  minTokens,
}: Props) => {
  const dispatch = useDispatch();
  /*
   * @NOTE this needs to return the `subscribeToReduxActions` function, since that returns an
   * unsubscriber, and that gets called when the component is unmounted
   */
  useEffect(
    () =>
      subscribeToReduxActions(dispatch)({
        /*
         * @NOTE All this is needed in order to shortcircuit re-rendering the TaskEditDialog
         * There's a edge case that's happening here:
         * - ActionForm submits the values
         * - Formik after submitting the values causes this component to re-render
         * - In some cases it happens so fast, it actually re-renders before the success action being dispatched
         * - That prevents ActionForm from acting on the success action so the `onSuccess` callback never gets called
         *
         * This works, since only one payout success will ever be dispatched while this Dialog is opened
         * so there's no danger of this being closed prematurely
         */
        [ACTIONS.TASK_SET_WORKER_OR_PAYOUT_SUCCESS]: () => closeDialog(),
      }),
    [dispatch, closeDialog],
  );

  const {
    record: { colonyAddress, payouts: taskPayouts, reputation, workerAddress },
  } = useSelector(taskSelector, [draftId]);
  const {
    data: colonyData,
    isFetching: isFetchingColony,
  } = useDataSubscriber<ColonyType>(
    colonySubscriber,
    [colonyAddress],
    [colonyAddress],
    { alwaysSubscribe: false },
  );

  const [colonyTokenReferences, availableTokens] = useColonyTokens(
    colonyAddress,
  );

  // Get users that have requested to work on this task
  const userAddressesRequested = useSelector(taskRequestsSelector, [draftId]);
  const userAddressesInStore = useSelector(allUsersAddressesSelector);

  const userAddressesToPickFrom = userAddressesRequested.concat(
    userAddressesInStore,
  );
  const uniqueUserAddressesToPickFrom = new Set(userAddressesToPickFrom);

  const userData = useDataMapFetcher<UserType>(
    usersByAddressFetcher,
    Array.from(uniqueUserAddressesToPickFrom),
  );

  // Get user (worker) assigned to this task
  const {
    data: existingWorkerObj,
    isFetching: isFetchingExistingWorker,
  } = useDataFetcher<UserType>(userFetcher, [workerAddress], [workerAddress]);
  const existingWorker =
    !!workerAddress && !existingWorkerObj
      ? UserRecord({
          profile: UserProfileRecord({
            walletAddress: workerAddress,
          }),
        }).toJS()
      : existingWorkerObj;

  const users = useMemo(
    () =>
      userData
        .filter(({ data }) => !!data)
        .map(({ data, key }) => ({
          id: key,
          ...data,
        })),
    [userData],
  );

  const existingPayouts = useMemo(
    () =>
      taskPayouts.map(payout => {
        const { address, decimals } =
          (availableTokens &&
            availableTokens.find(token => token.address === payout.token)) ||
          {};
        return {
          token: address,
          amount: moveDecimal(
            new BigNumber(payout.amount).toString(10),
            -1 * parseInt(decimals, 10),
          ),
          id: payout.token.address,
        };
      }),
    [taskPayouts, availableTokens],
  );

  const validateForm = useMemo(
    () => {
      const workerShape = yup
        .object()
        .shape({
          profile: yup.object().shape({
            walletAddress: yup.string().required(MSG.workerRequiredError),
          }),
        })
        .nullable()
        .default(null);
      return yup.object().shape({
        payouts: yup
          .array()
          .of(
            yup.object().shape({
              token: yup.string().required(MSG.tokenRequiredError),
              amount: yup
                .number()
                .typeError(MSG.amountPositiveError)
                .required(MSG.amountRequiredError)
                .moreThan(0, MSG.amountPositiveError)
                .lessThanPot(
                  colonyTokenReferences,
                  availableTokens,
                  MSG.insufficientFundsError,
                ),
            }),
          )
          .min(minTokens)
          .max(maxTokens)
          .nullable()
          .default(null),
        worker: workerShape,
      });
    },
    [availableTokens, colonyTokenReferences, maxTokens, minTokens],
  );

  const tokenOptions = useMemo(
    () =>
      availableTokens &&
      availableTokens.map(({ address, symbol }) => ({
        value: address,
        label: symbol || MSG.unknownToken,
      })),
    [availableTokens],
  );

  const addTokenFunding = useCallback(
    (values: { payouts?: Array<TaskPayoutType> }, helpers: () => void) => {
      if (canAddTokens(values, maxTokens))
        helpers.push({
          id: nanoid(),
        });
    },
    [maxTokens],
  );

  const transform = useCallback(
    pipe(
      mapPayload(p => ({
        payouts: p.payouts.map(({ amount, token }) => {
          const { decimals } =
            (availableTokens &&
              availableTokens.find(
                ({ address: refAddress }) => refAddress === token,
              )) ||
            {};
          return {
            amount: new BigNumber(
              moveDecimal(amount, decimals ? parseInt(decimals, 10) : 18),
            ),
            token,
          };
        }),
        workerAddress:
          p.worker && p.worker.profile && p.worker.profile.walletAddress
            ? createAddress(p.worker.profile.walletAddress)
            : undefined,
      })),
      mergePayload({ colonyAddress, draftId }),
    ),
    [colonyAddress, draftId],
  );

  return (
    <FullscreenDialog
      cancel={cancel}
      /*
       * Setting `isDismissable` to `false` because we don't want a user to be able to
       * close this Dialog after they've submitted the form (while it's processing the data).
       *
       * We can't wrap the Dialog within the form (to use `isSubmitting`), because `react-modal`
       * uses Portals, thus the form wouldn't be able to be submitted.
       */
      isDismissable={false}
    >
      {isFetchingExistingWorker ? (
        <SpinnerLoader />
      ) : (
        <ActionForm
          initialValues={{
            payouts: existingPayouts,
            worker: existingWorker,
          }}
          error={ACTIONS.TASK_SET_WORKER_OR_PAYOUT_ERROR}
          submit={ACTIONS.TASK_SET_WORKER_OR_PAYOUT}
          success={ACTIONS.TASK_SET_WORKER_OR_PAYOUT_SUCCESS}
          transform={transform}
          onSuccess={closeDialog}
          validationSchema={validateForm}
        >
          {({ status, values, dirty, isSubmitting, isValid }) => {
            const canRemove = canRemoveTokens(values, minTokens);
            return (
              <>
                <FormStatus status={status} />
                <DialogBox>
                  <DialogSection appearance={{ border: 'bottom' }}>
                    <Heading
                      appearance={{ size: 'medium' }}
                      text={MSG.titleAssignment}
                    />
                    <SingleUserPicker
                      data={users}
                      isResettable
                      label={MSG.selectAssignee}
                      name="worker"
                      filter={supFilter}
                      placeholder={MSG.search}
                      renderAvatar={supRenderAvatar}
                    />
                  </DialogSection>
                  <DialogSection>
                    <FieldArray
                      name="payouts"
                      render={arrayHelpers => (
                        <>
                          <div className={styles.editor}>
                            <Heading
                              appearance={{ size: 'medium' }}
                              text={MSG.titleFunding}
                            />
                            {canAddTokens(values, maxTokens) && (
                              <Button
                                appearance={{ theme: 'blue', size: 'small' }}
                                text={MSG.add}
                                onClick={() =>
                                  addTokenFunding(values, arrayHelpers)
                                }
                              />
                            )}
                          </div>
                          {colonyData ? (
                            <>
                              {colonyTokenReferences &&
                                values.payouts &&
                                values.payouts.map((payout, index) => (
                                  <WrappedPayout
                                    arrayHelpers={arrayHelpers}
                                    canRemove={canRemove}
                                    colonyAddress={colonyAddress}
                                    index={index}
                                    key={payout.id}
                                    payout={payout}
                                    payouts={existingPayouts}
                                    reputation={reputation}
                                    tokenOptions={tokenOptions}
                                    tokenReferences={colonyTokenReferences}
                                  />
                                ))}
                            </>
                          ) : (
                            <>{isFetchingColony ? <SpinnerLoader /> : null}</>
                          )}
                        </>
                      )}
                    />
                  </DialogSection>
                </DialogBox>
                <div className={styles.buttonContainer}>
                  <Button
                    appearance={{ theme: 'secondary', size: 'large' }}
                    onClick={cancel}
                    text={{ id: 'button.cancel' }}
                    disabled={isSubmitting}
                  />
                  <Button
                    appearance={{ theme: 'primary', size: 'large' }}
                    text={{ id: 'button.confirm' }}
                    type="submit"
                    disabled={!dirty || !isValid}
                    loading={isSubmitting}
                  />
                </div>
              </>
            );
          }}
        </ActionForm>
      )}
    </FullscreenDialog>
  );
};

TaskEditDialog.displayName = displayName;

export default TaskEditDialog;
