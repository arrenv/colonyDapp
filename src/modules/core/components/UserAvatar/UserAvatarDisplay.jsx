/* @flow */

import React from 'react';

import getIcon from '../../../../lib/identicon';

import Avatar from '~core/Avatar';
import UserInfo from '~core/UserInfo';

export type Props = {|
  /** Avatar image URL (can be a base64 encoded string) */
  avatar?: ?string,
  /** Is passed through to Avatar */
  className?: string,
  /** Avatars that are not set have a different placeholder */
  notSet?: boolean,
  /** Avatar size (default is between `s` and `m`) */
  size?: 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl',
  /*
   * The user's name (aka Display Name)
   */
  displayName?: string,
  /** For the title */
  username?: string,
  /** Address of the current user for identicon fallback */
  address: string,
  /* Whether to show or not show the UserInfo tooltip over the avatar */
  hasUserInfo?: boolean,
|};

/*
 * `displayName` is a prop name, so we'll use `componentDisplayName` here
 */
const componentDisplayName = 'UserAvatarDisplay';

const UserAvatarDisplay = ({
  address,
  avatar,
  className,
  displayName,
  hasUserInfo,
  notSet,
  size,
  username,
}: Props) => (
  <UserInfo
    address={address}
    displayName={displayName}
    trigger={hasUserInfo ? 'hover' : 'disabled'}
    username={username}
  >
    <Avatar
      avatarURL={avatar || (!notSet ? getIcon(address) : null)}
      className={className}
      notSet={notSet}
      placeholderIcon="circle-person"
      size={size}
      title={username || address}
    />
  </UserInfo>
);

UserAvatarDisplay.displayName = componentDisplayName;

export default UserAvatarDisplay;
