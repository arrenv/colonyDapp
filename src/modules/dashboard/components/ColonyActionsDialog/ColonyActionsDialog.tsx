import React from 'react';
import { defineMessages } from 'react-intl';

import { DialogProps } from '~core/Dialog';
import IndexModal from '~core/IndexModal';

import { WizardDialogType } from '~utils/hooks';

const MSG = defineMessages({
  title: {
    id: 'dashboard.ColonyActionsDialog.title',
    defaultMessage: 'What would you like to do?',
  },
  createExpenditure: {
    id: 'dashboard.ColonyActionsDialog.createExpenditure',
    defaultMessage: 'Create Expenditure',
  },
  createExpenditureDesc: {
    id: 'dashboard.ColonyActionsDialog.createExpenditureDesc',
    defaultMessage: 'Send funds from this colony to external addresses.',
  },
  manageFunds: {
    id: 'dashboard.ColonyActionsDialog.manageFunds',
    defaultMessage: 'Manage Funds',
  },
  manageFundsDesc: {
    id: 'dashboard.ColonyActionsDialog.manageFundsDesc',
    defaultMessage: 'The tools you need to manage your colony’s money.',
  },
  manageDomains: {
    id: 'dashboard.ColonyActionsDialog.manageDomains',
    defaultMessage: 'Manage Domains',
  },
  manageDomainsDesc: {
    id: 'dashboard.ColonyActionsDialog.manageDomainsDesc',
    defaultMessage: 'Need more structure? Need to change a domain name?',
  },
  smite: {
    id: 'dashboard.ColonyActionsDialog.smite',
    defaultMessage: 'Smite',
  },
  smiteDesc: {
    id: 'dashboard.ColonyActionsDialog.smiteDesc',
    defaultMessage: 'Punish bad behaviour by penalising Reputation.',
  },
  advanced: {
    id: 'dashboard.ColonyActionsDialog.advanced',
    defaultMessage: 'Advanced',
  },
  advancedDesc: {
    id: 'dashboard.ColonyActionsDialog.advancedDesc',
    defaultMessage:
      'Need to tinker under the hood? This is the place to do it.',
  },
});

interface CustomWizardDialogProps {
  nextStepExpenditure: string;
}

type Props = DialogProps & WizardDialogType<object> & CustomWizardDialogProps;

const displayName = 'dashboard.ColonyActionsDialog';

const ColonyActionsDialog = ({
  cancel,
  close,
  callStep,
  nextStepExpenditure,
}: Props) => {
  const items = [
    {
      title: MSG.createExpenditure,
      description: MSG.createExpenditureDesc,
      icon: 'emoji-bag-money-sign',
      onClick: () => callStep(nextStepExpenditure),
    },
    {
      title: MSG.manageFunds,
      description: MSG.manageFundsDesc,
      icon: 'emoji-money-wings',
    },
    {
      title: MSG.manageDomains,
      description: MSG.manageDomainsDesc,
      icon: 'emoji-crane',
    },
    {
      title: MSG.smite,
      description: MSG.smiteDesc,
      icon: 'emoji-firebolt',
      comingSoon: true,
    },
    {
      title: MSG.advanced,
      description: MSG.advancedDesc,
      icon: 'emoji-smiley-nerd',
    },
  ];
  return (
    <IndexModal cancel={cancel} close={close} title={MSG.title} items={items} />
  );
};

ColonyActionsDialog.displayName = displayName;

export default ColonyActionsDialog;
