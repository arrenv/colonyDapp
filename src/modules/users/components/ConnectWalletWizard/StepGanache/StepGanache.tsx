import React, { useState, useCallback } from 'react';
import { defineMessages } from 'react-intl';

import { WizardProps } from '~core/Wizard';
import { mergePayload } from '~utils/actions';
import Button from '~core/Button';
import Heading from '~core/Heading';
import Icon from '~core/Icon';
import { ActionForm, Select, SelectOption } from '~core/Fields';
import { ActionTypes } from '~redux/index';

import styles from './StepGanache.css';

const MSG = defineMessages({
  heading: {
    id: 'users.ConnectWalletWizard.StepGanache.heading',
    defaultMessage: "You're connected using a local ganache account",
  },
  subHeading: {
    id: 'users.ConnectWalletWizard.StepGanache.subHeading',
    defaultMessage: 'Would you like to access Colony with that?',
  },
  buttonAdvance: {
    id: 'users.ConnectWalletWizard.StepGanache.button.advance',
    defaultMessage: 'Continue',
  },
  buttonBack: {
    id: 'users.ConnectWalletWizard.StepGanache.button.back',
    defaultMessage: 'Back',
  },
  buttonRetry: {
    id: 'users.ConnectWalletWizard.StepGanache.button.retry',
    defaultMessage: 'Try Again',
  },
  accountIndex: {
    id: 'users.ConnectWalletWizard.StepGanache.select.account',
    defaultMessage: 'Account',
  },
});

interface FormValues {
  privateKey: string;
}

type Props = {
  simplified?: boolean;
} & WizardProps<FormValues>;

export const getAccounts = (): SelectOption[] => {
  // This file is generated by ganache, so it has to run before this file is compiled
  // eslint-disable-next-line camelcase
  let ganacheAccounts = { private_keys: [] };
  // process.env.DEV is set by the QA server in case we want to have a debug build. We also don't want to load the accounts then
  if (process.env.NODE_ENV === 'development' && !process.env.DEV) {
    try {
      /**
       * @TODO Fix webpack production build warning
       * When building for production, this outputs a WARNING from webpack stating
       * that it can't find the ganache accounts file. That is OK since in production
       * mode that file shouldn't be available. But due to the fact that it's requesting
       * the file specifically (and not a module relative import) it will complain that
       * it can't find it.
       */
      // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require, max-len
      ganacheAccounts = require(`~lib/colonyNetwork/ganache-accounts.json`);
      return Object.entries(ganacheAccounts.private_keys).map(
        ([address, privateKey]: [string, string]) => ({
          value: privateKey,
          label: address,
        }),
      );
    } catch (error) {
      throw new Error(
        `Could not get local accounts file. Please start ganache first`,
      );
    }
  }
  return [];
};

const displayName = 'users.ConnectWalletWizard.StepGanache';

const StepGanache = ({
  resetWizard,
  wizardForm,
  wizardValues,
  simplified = false,
}: Props) => {
  const accounts = getAccounts();
  const [privateKey, setPrivateKey] = useState<string>(accounts[0].value);

  const transform = useCallback(mergePayload({ ...wizardValues, privateKey }), [
    wizardValues,
    privateKey,
  ]);

  return (
    <ActionForm
      submit={ActionTypes.WALLET_CREATE}
      success={ActionTypes.USER_CONTEXT_SETUP_SUCCESS}
      error={ActionTypes.WALLET_CREATE_ERROR}
      transform={transform}
      {...wizardForm}
      initialValues={{
        ...wizardForm.initialValues,
        privateKey,
      }}
    >
      {({ isSubmitting }) => (
        <main>
          <div
            className={simplified ? styles.contentSimplified : styles.content}
          >
            <div className={styles.iconContainer}>
              <Icon
                name="wallet"
                title="wallet"
                appearance={{ size: 'medium' }}
              />
            </div>
            <Heading
              text={MSG.heading}
              appearance={{ size: 'medium', margin: 'none' }}
            />
            <Heading text={MSG.subHeading} appearance={{ size: 'medium' }} />
            <Select
              label={MSG.accountIndex}
              name="privateKey"
              onChange={(value) => setPrivateKey(value)}
              options={accounts}
            />
          </div>
          <div className={styles.actions}>
            <Button
              text={MSG.buttonBack}
              appearance={{ theme: 'secondary', size: 'large' }}
              onClick={resetWizard}
            />
            <Button
              text={MSG.buttonAdvance}
              appearance={{ theme: 'primary', size: 'large' }}
              type="submit"
              loading={isSubmitting}
            />
          </div>
        </main>
      )}
    </ActionForm>
  );
};

StepGanache.displayName = displayName;

export default StepGanache;
