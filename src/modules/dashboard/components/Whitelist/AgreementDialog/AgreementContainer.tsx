import React from 'react';

import { defineMessages, FormattedMessage } from 'react-intl';

import { SpinnerLoader } from '~core/Preloaders';

import styles from './AgreementDialog.css';

const MSG = defineMessages({
  title: {
    id:
      'dashboard.Extensions.Whitelist.AgreementDialog.AgreementContainer.title',
    defaultMessage: 'Sale agreement',
  },
  signedButton: {
    id: `dashboard.Extensions.Whitelist.AgreementDialog.AgreementContainer.gotItButton`,
    defaultMessage: 'Signed',
  },
  ipfsError: {
    id: `dashboard.Extensions.Whitelist.AgreementDialog.AgreementContainer.ipfsError`,
    defaultMessage: `Failed to retrieve data from IPFS. Please try again.`,
  },
});

interface Props {
  loading: boolean;
  text?: string;
}

const AgreementContainer = ({ loading, text }: Props) => {
  return loading ? (
    <SpinnerLoader appearance={{ size: 'huge', theme: 'primary' }} />
  ) : (
    <div className={styles.agreementContainer}>
      {text || (
        <div className={styles.error}>
          <FormattedMessage {...MSG.ipfsError} />
        </div>
      )}
    </div>
  );
};

AgreementContainer.displayName =
  'dashboard.Whitelist.AgreementDialog.AgreementContainer';

export default AgreementContainer;
