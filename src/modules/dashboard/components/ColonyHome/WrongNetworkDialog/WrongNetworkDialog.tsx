import React from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';

import Dialog, { DialogProps, DialogSection } from '~core/Dialog';
import ExternalLink from '~core/ExternalLink';
import Heading from '~core/Heading';

import styles from './WrongNetworkDialog.css';

const MSG = defineMessages({
  title: {
    id: 'dashboard.ColonyHome.WrongNetworkDialog.title',
    defaultMessage: 'Wrong Network',
  },
  description: {
    id: 'dashboard.ColonyHome.WrongNetworkDialog.description',
    defaultMessage: 'Please connect to xDai chain. <a>Learn more.</a>',
  },
});

const displayName = 'dashboard.ColonyHome.WrongNetworkDialog';

const WRONG_NETWORK_HELP_LINK =
  'https://colony.gitbook.io/colony/get-started/connect-metamask-to-xdai';

const WrongNetworkDialog = ({ cancel }: DialogProps) => {
  return (
    <Dialog cancel={cancel}>
      <DialogSection appearance={{ theme: 'sidePadding' }}>
        <div className={styles.modalHeading}>
          <Heading
            appearance={{ size: 'medium', margin: 'none', theme: 'dark' }}
            text={MSG.title}
          />
        </div>
      </DialogSection>
      <DialogSection appearance={{ theme: 'sidePadding' }}>
        <div className={styles.modalContent}>
          <FormattedMessage
            {...MSG.description}
            values={{
              a: (chunks) => (
                <ExternalLink href={WRONG_NETWORK_HELP_LINK}>
                  {chunks}
                </ExternalLink>
              ),
            }}
          />
        </div>
      </DialogSection>
    </Dialog>
  );
};

WrongNetworkDialog.displayName = displayName;

export default WrongNetworkDialog;
