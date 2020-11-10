import {
  ColonyClient,
  FundingPotAssociatedType,
  getBlockTime,
  getLogs,
} from '@colony/colony-js';
import { bigNumberify } from 'ethers/utils';
import { HashZero } from 'ethers/constants';

import { Transfer, Event } from '~data/index';
import { notUndefined } from '~utils/arrays';

// TODO Find better place for it..
const FILTERS = [
  "ColonyBootstrapped",
  "ColonyFundsClaimed",
  "ColonyFundsMovedBetweenFundingPots",
  "ColonyInitialised",
  "ColonyRewardInverseSet",
  "ColonyRoleSet",
  "ColonyUpgraded",
  "DomainAdded",
  "ExpenditureAdded",
  "ExpenditureCancelled",
  "ExpenditureFinalized",
  "ExpenditurePayoutSet",
  "ExpenditureRecipientSet",
  "ExpenditureSkillSet",
  "ExpenditureTransferred",
  "FundingPotAdded",
  "PaymentAdded",
  "PayoutClaimed",
  "RecoveryRoleSet",
  "RewardPayoutClaimed",
  "RewardPayoutCycleEnded",
  "RewardPayoutCycleStarted",
  "TaskAdded",
  "TaskBriefSet",
  "TaskCanceled",
  "TaskCompleted",
  "TaskDeliverableSubmitted",
  "TaskDueDateSet",
  "TaskFinalized",
  "TaskPayoutSet",
  "TaskRoleUserSet",
  "TaskSkillSet",
  "TaskWorkRatingRevealed"
]

export const getColonyAllEvents = async (
  colonyClient: ColonyClient,
): Promise<Event[]> => {
  const { provider } = colonyClient;

  const allEventsLogs = await FILTERS.reduce(async (acc, filter) => {
    const logs = await getLogs(
      colonyClient,
      colonyClient.filters[filter]()
    )
    return [...(await acc), ...logs]
  }, Promise.resolve([]))
  
  const events = await Promise.all(
    allEventsLogs.map(async (log) => {
      const event = colonyClient.interface.parseLog(log);
      const date = log.blockHash
        ? await getBlockTime(provider, log.blockHash)
        : 0;

      const tx = log.transactionHash
        ? await provider.getTransaction(log.transactionHash)
        : undefined;

      return {
        __typename: 'Event',
        ...event,
        date,
        from: (tx && tx.from) || null,
        hash: log.transactionHash || HashZero,
        to: colonyClient.address,
      };
    }),
  );

  return events;
}

export const getColonyFundsClaimedTransfers = async (
  colonyClient: ColonyClient,
): Promise<Transfer[]> => {
  const { provider } = colonyClient;

  const filter = colonyClient.filters.ColonyFundsClaimed(null, null, null);
  const logs = await getLogs(colonyClient, filter);

  const transfers = await Promise.all(
    logs.map(async (log) => {
      const event = colonyClient.interface.parseLog(log);
      const date = log.blockHash
        ? await getBlockTime(provider, log.blockHash)
        : 0;
      const {
        values: { token, payoutRemainder },
      } = event;

      const tx = log.transactionHash
        ? await provider.getTransaction(log.transactionHash)
        : undefined;

      // Don't show claims of zero
      if (!payoutRemainder.gt(bigNumberify(0))) return undefined;

      return {
        __typename: 'Transfer',
        amount: payoutRemainder.toString(),
        colonyAddress: colonyClient.address,
        date,
        from: (tx && tx.from) || null,
        hash: log.transactionHash || HashZero,
        incoming: true,
        to: colonyClient.address,
        token,
      };
    }),
  );

  return transfers.filter(notUndefined);
};

export const getPayoutClaimedTransfers = async (
  colonyClient: ColonyClient,
): Promise<Transfer[]> => {
  const { provider } = colonyClient;
  const filter = colonyClient.filters.PayoutClaimed(null, null, null);
  const logs = await getLogs(colonyClient, filter);

  const transfers = await Promise.all(
    logs.map(async (log) => {
      const event = colonyClient.interface.parseLog(log);
      const date = log.blockHash
        ? await getBlockTime(provider, log.blockHash)
        : 0;
      const {
        values: { fundingPotId, token, amount },
      } = event;

      const {
        associatedType,
        associatedTypeId,
      } = await colonyClient.getFundingPot(fundingPotId);

      if (associatedType !== FundingPotAssociatedType.Payment) return undefined;

      const { recipient: to } = await colonyClient.getPayment(associatedTypeId);

      return {
        __typename: 'Transfer',
        amount: amount.toString(),
        colonyAddress: colonyClient.address,
        date,
        from: null,
        hash: log.transactionHash || HashZero,
        incoming: false,
        to,
        token,
      };
    }),
  );

  return transfers.filter(notUndefined);
};

export const getColonyUnclaimedTransfers = async (
  colonyClient: ColonyClient,
): Promise<Transfer[]> => {
  const { provider } = colonyClient;
  const { tokenClient } = colonyClient;
  const claimedTransferFilter = colonyClient.filters.ColonyFundsClaimed(
    null,
    null,
    null,
  );
  const claimedTransferLogs = await getLogs(
    colonyClient,
    claimedTransferFilter,
  );
  const claimedTransferEvents = claimedTransferLogs.map((log) =>
    colonyClient.interface.parseLog(log),
  );

  // Get logs & events for token transfer to this colony
  const tokenTransferFilter = tokenClient.filters.Transfer(
    null,
    colonyClient.address,
    null,
  );
  const tokenTransferLogs = await getLogs(colonyClient, {
    // Do not limit it to the tokenClient. We want all transfers to the colony
    topics: tokenTransferFilter.topics,
  });

  const transfers = await Promise.all(
    tokenTransferLogs.map(async (log) => {
      const event = tokenClient.interface.parseLog(log);
      const date = log.blockHash
        ? await getBlockTime(provider, log.blockHash)
        : 0;
      const {
        values: { src, wad },
      } = event;
      const { blockNumber } = log;

      const transferClaimed = !!claimedTransferEvents.find(
        ({ values: { token } }, i) =>
          token === log.address &&
          blockNumber &&
          claimedTransferLogs &&
          claimedTransferLogs[i] &&
          claimedTransferLogs[i].blockNumber &&
          // blockNumber is defined (we just checked that), only TS doesn't know that for some reason
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          claimedTransferLogs[i].blockNumber! > blockNumber,
      );

      if (transferClaimed) return undefined;

      return {
        __typename: 'Transfer',
        amount: wad.toString(),
        colonyAddress: colonyClient.address,
        date,
        from: src || null,
        hash: log.transactionHash || HashZero,
        incoming: true,
        to: colonyClient.address,
        token: log.address,
      };
    }),
  );

  return transfers.filter(notUndefined);
};
