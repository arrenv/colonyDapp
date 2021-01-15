import React, { useRef, useEffect } from 'react';

import MaskedAddress from '~core/MaskedAddress';

import { AnyUser, Colony } from '~data/index';

import { removeValueUnits } from '~utils/css';

import styles from './FriendlyName.css';

const displayName = 'FriendlyName';

interface Props {
  /*
   * The user object to display
   */
  user: AnyUser;
  /*
   * Whether to show a masked address or a full one
   */
  maskedAddress?: boolean;
  /*
   * Whether to apply the "shrink tech font by 1px" logic
   */
  autoShrinkAddress?: boolean;
  /*
   * Colony object to display in case of wallet address is equal to colony address
   */
  colony?: Colony;
}

const FriendlyName = ({
  user: {
    profile: { displayName: userDisplayName, username, walletAddress },
  },
  maskedAddress = true,
  autoShrinkAddress = false,
  colony,
}: Props) => {
  const addressRef = useRef<HTMLElement>(null);

  const isColonyAddress = colony && walletAddress === colony.colonyAddress;
  const colonyName =
    isColonyAddress &&
    isColonyAddress &&
    (colony?.displayName || colony?.colonyName);
  /*
   * @NOTE On touching element styles manually
   * The "tech" font we user renders a bit larger than our display font while
   * using the same font size.
   *
   * Since we don't really know the size this element is going to be styled with
   * we can't determine the correct font size from the css styles directly.
   *
   * To solve this, we are fetching the computed styles of the address element,
   * getting the font size, subtracting one (it's usually enough to make it look
   * the same size as the other fonts), then applying it.
   *
   * So as, an overview, we always make (for this component only), the address
   * size to be 1px smaller than the rest of the text
   */
  useEffect(() => {
    if (autoShrinkAddress && addressRef?.current) {
      const computedStyles = getComputedStyle(addressRef.current);
      const inheritedFontSize = removeValueUnits(computedStyles.fontSize);
      addressRef.current.style.fontSize = `${inheritedFontSize - 1}px`;
    }
  }, [addressRef, autoShrinkAddress]);
  return (
    <div className={styles.main}>
      {userDisplayName || (username && `@${username}`) || colonyName || (
        <MaskedAddress
          address={walletAddress}
          full={!maskedAddress}
          ref={addressRef}
        />
      )}
    </div>
  );
};

FriendlyName.displayName = displayName;

export default FriendlyName;