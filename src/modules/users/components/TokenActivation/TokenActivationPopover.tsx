import React, { ReactElement, useMemo, useState } from 'react';

import Popover, { PopoverChildFn } from '~core/Popover';

import { removeValueUnits } from '~utils/css';

import TokenActivationContent, {
  TokensTabProps,
} from './TokenActivationContent/index';
import { verticalOffset } from './TokenActivationPopover.css';

interface Props extends TokensTabProps {
  children: ReactElement | PopoverChildFn;
}

const TokenActivationPopover = ({ children, ...otherProps }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  /*
   * @NOTE Offset Calculations
   * See: https://popper.js.org/docs/v2/modifiers/offset/
   *
   * Skidding:
   * Half the width of the reference element (width) plus the horizontal offset
   * Note that all skidding, for bottom aligned elements, needs to be negative.
   *
   * Distace:
   * This is just the required offset in pixels. Since we are aligned at
   * the bottom of the screen, this will be added to the bottom of the
   * reference element.
   */
  const popoverOffset = useMemo(() => {
    return [0, removeValueUnits(verticalOffset)];
  }, []);

  return (
    <Popover
      appearance={{ theme: 'grey' }}
      showArrow={false}
      placement="bottom"
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      content={() => <TokenActivationContent {...otherProps} />}
      popperProps={{
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: popoverOffset,
            },
          },
        ],
      }}
    >
      {children}
    </Popover>
  );
};

export default TokenActivationPopover;
