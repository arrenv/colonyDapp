import React, { useMemo } from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';
import classnames from 'classnames';

import Heading from '~core/Heading';
import QuestionMarkTooltip from '~core/QuestionMarkTooltip';
import { getMainClasses } from '~utils/css';

import TokenPriceStatusIcon, {
  TokenPriceStatuses,
} from '../TokenPriceStatusIcon/TokenPriceStatusIcon';

import styles from './RemainingDisplayWidget.css';

export enum DataDisplayType {
  Time = 'Time',
  Tokens = ' Tokens',
}

type Appearance = {
  theme?: 'white' | 'danger';
};

type Props = {
  displayType: DataDisplayType;
  value: string | number | null;
  appearance?: Appearance;
  tokenPriceStatus?: TokenPriceStatuses;
};

const displayName = 'dashboard.RemainingDisplayWidget';

const MSG = defineMessages({
  timeRemainingTitle: {
    id: 'dashboard.CoinMachine.timeRemainingTitle',
    defaultMessage: 'Time remaining',
  },
  timeRemainingTooltip: {
    id: 'dashboard.CoinMachine.timeRemainingTooltip',
    defaultMessage: `This is the amount of time remaining in the sale. Whatever the time says, that’s how much time remains. When it reaches zero, there will be no more time remaining. That’s how time works. When no more time remains, the next sale will start, and the amount of time remaining for that sale will appear in this box.`,
  },
  tokensRemainingTitle: {
    id: 'dashboard.CoinMachine.tokensRemainingTitle',
    defaultMessage: 'Tokens remaining',
  },
  tokensRemainingTooltip: {
    id: 'dashboard.CoinMachine.tokensRemainingTooltip',
    defaultMessage: `This is the number of tokens remaining in the current batch.`,
  },
  tokensTypePlaceholder: {
    id: 'dashboard.CoinMachine.tokensRemainingTitle',
    defaultMessage: '0',
  },
  timeTypePlaceholder: {
    id: 'dashboard.CoinMachine.timeTypePlaceholder',
    defaultMessage: `N/A`,
  },
  tokensTypeFooterText: {
    id: 'dashboard.CoinMachine.tokensTypeFooterText',
    defaultMessage: 'Price next sale',
  },
});

const RemainingDisplayWidget = ({
  displayType,
  appearance = { theme: 'white' },
  value,
  tokenPriceStatus,
}: Props) => {
  const widgetText = useMemo(() => {
    if (displayType === DataDisplayType.Time) {
      return {
        title: MSG.timeRemainingTitle,
        placeholder: MSG.timeTypePlaceholder,
        tooltipText: MSG.timeRemainingTooltip,
      };
    }

    return {
      title: MSG.tokensRemainingTitle,
      placeholder: MSG.tokensTypePlaceholder,
      tooltipText: MSG.tokensRemainingTooltip,
      footerText: MSG.tokensTypeFooterText,
    };
  }, [displayType]);

  return (
    <div className={getMainClasses(appearance, styles)}>
      <div className={styles.header}>
        <Heading
          text={widgetText.title}
          appearance={{
            size: 'small',
            theme: appearance.theme === 'danger' ? 'invert' : 'dark',
          }}
        />
        <QuestionMarkTooltip
          className={styles.tooltipIcon}
          tooltipText={widgetText.tooltipText}
          invertedIcon={appearance.theme === 'danger'}
          tooltipClassName={styles.tooltip}
        />
      </div>
      <p
        className={classnames(styles.value, {
          [styles.valueWarning]: false, // @TODO:  Add logic to determine if we show the value on red
        })}
      >
        {value || <FormattedMessage {...widgetText.placeholder} />}
      </p>
      {widgetText.footerText && value && (
        <div className={styles.footer}>
          <p className={styles.footerText}>
            <FormattedMessage {...widgetText.footerText} />
          </p>
          {tokenPriceStatus && (
            <TokenPriceStatusIcon status={tokenPriceStatus} />
          )}
        </div>
      )}
    </div>
  );
};

RemainingDisplayWidget.displayName = displayName;

export default RemainingDisplayWidget;