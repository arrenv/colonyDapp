import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import { SpinnerLoader } from '~core/Preloaders';
import Icon from '~core/Icon';
import Button from '~core/Button';
import Link from '~core/Link';

import {
  useLoggedInUser,
  useSubscribeToColonyMutation,
  useUnsubscribeFromColonyMutation,
  useUserColonyAddressesQuery,
  cacheUpdates,
  Colony,
} from '~data/index';
import { checkIfNetworkIsAllowed } from '~utils/networks';
import { CREATE_USER_ROUTE } from '~routes/index';

import ColonySubscriptionInfoPopover from './ColonySubscriptionInfoPopover';

import styles from './ColonySubscription.css';

const MSG = defineMessages({
  joinColony: {
    id: 'dashboard.ColonyHome.ColonySubscription.joinColony',
    defaultMessage: 'Join',
  },
  colonyMenuTitle: {
    id: 'dashboard.ColonyHome.ColonySubscription.colonyMenuTitle',
    defaultMessage: 'Colony Menu',
  },
});

interface Props {
  colony: Colony;
}

const ColonySubscription = ({ colony: { colonyAddress }, colony }: Props) => {
  const { username, walletAddress, networkId } = useLoggedInUser();

  const { data } = useUserColonyAddressesQuery({
    variables: { address: walletAddress },
  });

  const [
    subscribe,
    { loading: loadingSubscribe },
  ] = useSubscribeToColonyMutation({
    variables: { input: { colonyAddress } },
    update: cacheUpdates.subscribeToColony(colonyAddress),
  });
  const [
    unsubscribe,
    { loading: loadingUnsubscribe },
  ] = useUnsubscribeFromColonyMutation({
    variables: { input: { colonyAddress } },
    update: cacheUpdates.unsubscribeFromColony(colonyAddress),
  });

  const isSubscribed = (data?.user?.colonyAddresses || []).includes(
    colonyAddress,
  );

  const isNetworkAllowed = checkIfNetworkIsAllowed(networkId);

  return (
    <div className={styles.main}>
      {loadingSubscribe ||
        (loadingUnsubscribe && (
          <div className={styles.spinnerContainer}>
            <SpinnerLoader appearance={{ theme: 'primary', size: 'small' }} />
          </div>
        ))}
      {!isSubscribed && username && (
        <Button
          onClick={() => subscribe()}
          appearance={{ theme: 'blue', size: 'small' }}
        >
          <FormattedMessage {...MSG.joinColony} />
        </Button>
      )}
      {!isSubscribed && !username && (
        <Link
          className={styles.createUserRedirect}
          to={CREATE_USER_ROUTE}
          text={MSG.joinColony}
        />
      )}
      {isSubscribed && (
        <ColonySubscriptionInfoPopover
          colony={colony}
          onUnsubscribe={() => unsubscribe()}
          canUnsubscribe={isNetworkAllowed}
        >
          <div className={styles.menuIconContainer}>
            <Icon
              className={styles.menuIcon}
              name="three-dots-row"
              title={MSG.colonyMenuTitle}
            />
          </div>
        </ColonySubscriptionInfoPopover>
      )}
    </div>
  );
};

ColonySubscription.displayName = 'dashboard.ColonyHome.ColonySubscription';

export default ColonySubscription;
