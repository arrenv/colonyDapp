/* @flow */

import React, { Component, Fragment } from 'react';
import { defineMessages } from 'react-intl';

import { metamask } from 'colony-wallet/providers';

import Button from '../../../../core/components/Button';
import Heading from '../../../../core/components/Heading';
import Icon from '../../../../core/components/Icon';
import styles from './MetaMask.css';

const MSG = defineMessages({
  heading: {
    id: 'ConnectWallet.providers.MetaMask.heading',
    defaultMessage: "You're connected to MetaMask",
  },
  subHeading: {
    id: 'ConnectWallet.providers.MetaMask.subHeading',
    defaultMessage: 'Would you like to access Colony with that?',
  },
  errorHeading: {
    id: 'ConnectWallet.providers.MetaMask.errorHeading',
    defaultMessage: "Oops we couldn't detect MetaMask",
  },
});

const BUTTON_MSG = defineMessages({
  advance: {
    id: 'ConnectWallet.providers.MetaMask.button.advance',
    defaultMessage: 'Go to Colony',
  },
  back: {
    id: 'ConnectWallet.providers.MetaMask.button.back',
    defaultMessage: 'Back',
  },
  retry: {
    id: 'ConnectWallet.providers.MetaMask.button.retry',
    defaultMessage: 'Try Again',
  },
});

type Props = {};

type State = {
  isValid: boolean,
};

type MetaMaskResponse = {
  chainId: number,
  ensAddress: String,
  name: String,
  testnet: boolean,
  url: String,
};

class MetaMask extends Component<Props, State> {
  state = {
    isValid: false,
  };

  componentDidMount() {
    this.connectMetaMask();
  }

  connectMetaMask = () => {
    const provider: MetaMaskResponse = metamask();
    const isValid = !!provider.chainId;
    this.setState({
      isValid,
    });
  };

  handleOnRetryClick = () => {
    this.connectMetaMask();
  };

  render() {
    const { isValid } = this.state;
    return (
      <Fragment>
        <div className={styles.content}>
          <Icon name="metamask" title="metamask" />
          {isValid ? (
            <Fragment>
              <Heading text={MSG.heading} />
              <Heading text={MSG.subHeading} />
            </Fragment>
          ) : (
            <Fragment>
              <Heading text={MSG.errorHeading} />
            </Fragment>
          )}
        </div>
        <div className={styles.actions}>
          <Button
            text={BUTTON_MSG.back}
            appearance={{ theme: 'ghost', colorSchema: 'noBorder' }}
          />
          {isValid ? (
            <Button
              text={BUTTON_MSG.advance}
              appearance={{ theme: 'primary' }}
            />
          ) : (
            <Button
              text={BUTTON_MSG.retry}
              appearance={{ theme: 'primary' }}
              onClick={this.handleOnRetryClick}
            />
          )}
        </div>
      </Fragment>
    );
  }
}

export default MetaMask;
