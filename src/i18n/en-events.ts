/* eslint-disable max-len */

import { ColonyAndExtensionsEvents } from '~types/index';

const eventsMessageDescriptors = {
  'event.title': `{eventName, select,
      ${ColonyAndExtensionsEvents.OneTxPaymentMade} {{initiator} paid {amount} {tokenSymbol} from {fromDomain} to {recipient}}
      ${ColonyAndExtensionsEvents.ColonyFundsMovedBetweenFundingPots} {{initiator} transferred {amount} {tokenSymbol} from the {fromDomain} to {toDomain}}
      ${ColonyAndExtensionsEvents.TokensMinted} {{initiator} minted {amount} {tokenSymbol} to {recipient}}
      ${ColonyAndExtensionsEvents.DomainAdded} {{initiator} added Team: {fromDomain}}
      ${ColonyAndExtensionsEvents.DomainMetadata} {{initiator} changed {fromDomain} teams's from}
      ${ColonyAndExtensionsEvents.ColonyUpgraded} {This colony has upgraded to {newVersion}}
      other {{eventNameDecorated} emmited by {clientOrExtensionType}}
    }`,
  /*
   * This needs to be declared separely since we can't nest select declarations
   */
  [`event.${ColonyAndExtensionsEvents.ColonyMetadata}.nameLogo`]: `{initiator} changed this colony's name to {colonyName} and its logo`,
  [`event.${ColonyAndExtensionsEvents.ColonyMetadata}.name`]: `{initiator} changed this colony's name to {colonyName}`,
  [`event.${ColonyAndExtensionsEvents.ColonyMetadata}.logo`]: `{initiator} changed this colony's logo`,
  [`event.${ColonyAndExtensionsEvents.ColonyMetadata}.tokens`]: `{initiator} changed this colony's tokens`,
  [`event.${ColonyAndExtensionsEvents.ColonyMetadata}.fallback`]: `{initiator} changed this colony's metadata, but the values are the same`,
  'eventList.event': `{eventName, select,
      ${ColonyAndExtensionsEvents.DomainAdded} {{agent} added Team: {domain}}
      ${ColonyAndExtensionsEvents.DomainMetadata} {{agent} changed Team {domain} metadata to {metadata}}
      ${ColonyAndExtensionsEvents.Annotation} {{agent} annotated transaction {transactionHash} with {metadata}}
      ${ColonyAndExtensionsEvents.FundingPotAdded} {Funding pot {fundingPot} added}
      ${ColonyAndExtensionsEvents.ColonyInitialised} {{agent} created a colony with token {tokenSymbol} at address {tokenAddress}}
      ${ColonyAndExtensionsEvents.OneTxPaymentMade} {{agent} created an OneTx payment}
      ${ColonyAndExtensionsEvents.TokensMinted} {{agent} minted {amount} {tokenSymbol}}
      ${ColonyAndExtensionsEvents.ColonyFundsClaimed} {{agent} claimed {amount} {tokenSymbol} for colony}
      ${ColonyAndExtensionsEvents.PaymentAdded} {{agent} added payment with id {paymentId}}
      ${ColonyAndExtensionsEvents.PaymentRecipientSet} {{agent} added {recipient} as recipient to payment {paymentId}}
      ${ColonyAndExtensionsEvents.PaymentPayoutSet} {{agent} added {amount} {tokenSymbol} as payout to payment {paymentId}}
      ${ColonyAndExtensionsEvents.PaymentFinalized} {{agent} finalized payment with id {paymentId}}
      ${ColonyAndExtensionsEvents.PayoutClaimed} {{agent} claimed a payout of {amount} {tokenSymbol} from funding pot {fundingPot}}
      ${ColonyAndExtensionsEvents.ColonyMetadata} {{agent} changed Colony metadata to {metadata}}
      other {{eventName} emmited with values: {displayValues}}
    }`,
  [`event.${ColonyAndExtensionsEvents.DomainMetadata}.all`]: `{{initiator} changed {fromDomain} teams's name, description, color from {oldName}, {oldDescription}, {oldColor} to {newName}, {newDescription}, {newColor}`,
  [`event.${ColonyAndExtensionsEvents.DomainMetadata}.nameDescription`]: `{{initiator} changed {fromDomain} teams's name and description from {oldName}, {oldDescription} to {newName}, {newDescription}`,
  [`event.${ColonyAndExtensionsEvents.DomainMetadata}.nameColor`]: `{{initiator} changed {fromDomain} teams's name and color from {oldName}, {oldColor} to {newName}, {newColor}`,
  [`event.${ColonyAndExtensionsEvents.DomainMetadata}.descriptionColor`]: `{{initiator} changed {fromDomain} teams's description and color from {oldDescription}, {oldColor} to {newDescription}, {newColor}`,
  [`event.${ColonyAndExtensionsEvents.DomainMetadata}.description`]: `{{initiator} changed {fromDomain} teams's description from {oldDescription} to {newDescription}`,
  [`event.${ColonyAndExtensionsEvents.DomainMetadata}.name`]: `{{initiator} changed {fromDomain} teams's name from {oldName} to {newName}`,
  [`event.${ColonyAndExtensionsEvents.DomainMetadata}.color`]: `{{initiator} changed {fromDomain} teams's color from {oldColor} to {newColor}`,
  [`event.${ColonyAndExtensionsEvents.DomainMetadata}.fallback`]: `{initiator} changed this domain, but values are the same`,
};

export default eventsMessageDescriptors;
