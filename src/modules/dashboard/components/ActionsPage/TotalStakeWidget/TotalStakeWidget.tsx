import React, { useEffect } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import formatNumber from 'format-number';

import Heading from '~core/Heading';
import ProgressBar from '~core/ProgressBar';
import { useLoggedInUser } from '~data/index';
import {
  useStakeAmountsForMotionQuery,
  useColonyNativeTokenQuery,
  useTokenInfoLazyQuery,
} from '~data/generated';
import { Address } from '~types/index';

import styles from './TotalStakeWidget.css';

const displayName = 'TotalStakeWidget';

type Props = {
  tokenDecimals: number;
  colonyAddress: Address;
  motionId: string;
  isObjectionStake?: boolean;
};

const MSG = defineMessages({
  motionTitle: {
    id: 'dashboard.ActionsPage.TotalStakeWidget.motionTitle',
    defaultMessage: 'Stake',
  },
  objectionTitle: {
    id: 'dashboard.ActionsPage.TotalStakeWidget.objectionTitle',
    defaultMessage: 'Goal',
  },
  stakeProgress: {
    id: 'dashboard.ActionsPage.TotalStakeWidget.stakeProgress',
    defaultMessage: '{totalPercentage}% of {requiredStake} {tokenSymbol}',
  },
  userStake: {
    id: 'dashboard.ActionsPage.TotalStakeWidget.userStake',
    defaultMessage: `You staked {userPercentage}% of this motion ({userStake} {tokenSymbol}).`,
  },
});

const TotalStakeWidget = ({
  tokenDecimals,
  colonyAddress,
  motionId,
  isObjectionStake = false,
}: Props) => {
  const { walletAddress } = useLoggedInUser();
  const { data } = useStakeAmountsForMotionQuery({
    variables: {
      colonyAddress,
      userAddress: walletAddress,
      motionId,
      isObjectionStake,
      tokenDecimals,
    },
  });
  const {
    totalStaked,
    userStake,
    requiredStake,
  } = data?.stakeAmountsForMotion || {
    totalStaked: 0,
    userStake: 0,
    requiredStake: 0,
  };
  const {
    data: nativeTokenAddressData,
    loading: loadingNativeTokenAddress,
  } = useColonyNativeTokenQuery({
    variables: { address: colonyAddress },
  });
  const [
    fetchTokenInfo,
    { data: tokenInfoData, loading: loadingTokenInfoData },
  ] = useTokenInfoLazyQuery();

  useEffect(() => {
    if (nativeTokenAddressData) {
      const {
        processedColony: { nativeTokenAddress },
      } = nativeTokenAddressData;
      fetchTokenInfo({ variables: { address: nativeTokenAddress } });
    }
  }, [fetchTokenInfo, nativeTokenAddressData]);

  const totalStakedPercentage = (totalStaked * 100) / (requiredStake || 1);
  const userStakePercentage = (userStake * 100) / (requiredStake || 1);
  const formattedTotalStakedPercentage = formatNumber({
    truncate: 2,
  })(totalStakedPercentage);
  const formattedUserStakePercentage = formatNumber({
    truncate: 2,
  })(userStakePercentage);

  return (
    <div>
      <div className={styles.widgetHeading}>
        <Heading
          appearance={{
            theme: 'dark',
            size: 'small',
            weight: 'bold',
            margin: 'none',
          }}
          text={isObjectionStake ? MSG.objectionTitle : MSG.motionTitle}
        />
        <span className={styles.stakeProgress}>
          {!loadingTokenInfoData && !loadingNativeTokenAddress && (
            <FormattedMessage
              {...MSG.stakeProgress}
              values={{
                totalPercentage: formattedTotalStakedPercentage,
                requiredStake,
                tokenSymbol: tokenInfoData?.tokenInfo.symbol,
              }}
            />
          )}
        </span>
      </div>
      <ProgressBar
        value={totalStakedPercentage}
        max={100}
        appearance={{
          barTheme: isObjectionStake ? 'danger' : 'primary',
          backgroundTheme: 'default',
        }}
      />
      {userStake !== 0 && (
        <p className={styles.userStake}>
          {!loadingTokenInfoData && !loadingNativeTokenAddress && (
            <FormattedMessage
              {...MSG.userStake}
              values={{
                userPercentage: formattedUserStakePercentage,
                userStake,
                tokenSymbol: tokenInfoData?.tokenInfo.symbol,
              }}
            />
          )}
        </p>
      )}
    </div>
  );
};

TotalStakeWidget.displayName = displayName;

export default TotalStakeWidget;
