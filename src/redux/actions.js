/* @flow */
/* eslint-disable prettier/prettier, max-len */

/*
 * Please try to keep this list in alphabetical order :-)
 * (hopefully your editor can do it!)
 */
const ACTIONS = Object.freeze({
  COLONY_ADDRESS_FETCH: 'COLONY_ADDRESS_FETCH',
  COLONY_ADDRESS_FETCH_ERROR: 'COLONY_ADDRESS_FETCH_ERROR',
  COLONY_ADDRESS_FETCH_SUCCESS: 'COLONY_ADDRESS_FETCH_SUCCESS',
  COLONY_ADMIN_ADD: 'COLONY_ADMIN_ADD',
  COLONY_ADMIN_ADD_ERROR: 'COLONY_ADMIN_ADD_ERROR',
  COLONY_ADMIN_ADD_SUCCESS: 'COLONY_ADMIN_ADD_SUCCESS',
  COLONY_ADMIN_REMOVE: 'COLONY_ADMIN_REMOVE',
  COLONY_ADMIN_REMOVE_ERROR: 'COLONY_ADMIN_REMOVE_ERROR',
  COLONY_ADMIN_REMOVE_SUCCESS: 'COLONY_ADMIN_REMOVE_SUCCESS',
  COLONY_AVATAR_REMOVE: 'COLONY_AVATAR_REMOVE',
  COLONY_AVATAR_REMOVE_ERROR: 'COLONY_AVATAR_REMOVE_ERROR',
  COLONY_AVATAR_REMOVE_SUCCESS: 'COLONY_AVATAR_REMOVE_SUCCESS',
  COLONY_AVATAR_UPLOAD: 'COLONY_AVATAR_UPLOAD',
  COLONY_AVATAR_UPLOAD_ERROR: 'COLONY_AVATAR_UPLOAD_ERROR',
  COLONY_AVATAR_UPLOAD_SUCCESS: 'COLONY_AVATAR_UPLOAD_SUCCESS',
  COLONY_CLAIM_TOKEN: 'COLONY_CLAIM_TOKEN',
  COLONY_CLAIM_TOKEN_ERROR: 'COLONY_CLAIM_TOKEN_ERROR',
  COLONY_CLAIM_TOKEN_SUCCESS: 'COLONY_CLAIM_TOKEN_SUCCESS',
  COLONY_CREATE: 'COLONY_CREATE',
  COLONY_CREATE_ERROR: 'COLONY_CREATE_ERROR',
  COLONY_CREATE_LABEL: 'COLONY_CREATE_LABEL',
  COLONY_CREATE_LABEL_ERROR: 'COLONY_CREATE_LABEL_ERROR',
  COLONY_CREATE_LABEL_SUCCESS: 'COLONY_CREATE_LABEL_SUCCESS',
  COLONY_CREATE_SUCCESS: 'COLONY_CREATE_SUCCESS',
  COLONY_DOMAIN_VALIDATE: 'COLONY_DOMAIN_VALIDATE',
  COLONY_DOMAIN_VALIDATE_ERROR: 'COLONY_DOMAIN_VALIDATE_ERROR',
  COLONY_DOMAIN_VALIDATE_SUCCESS: 'COLONY_DOMAIN_VALIDATE_SUCCESS',
  COLONY_DOMAINS_FETCH: 'COLONY_DOMAINS_FETCH',
  COLONY_DOMAINS_FETCH_ERROR: 'COLONY_DOMAINS_FETCH_ERROR',
  COLONY_DOMAINS_FETCH_SUCCESS: 'COLONY_DOMAINS_FETCH_SUCCESS',
  COLONY_FETCH: 'COLONY_FETCH',
  COLONY_FETCH_ERROR: 'COLONY_FETCH_ERROR',
  COLONY_FETCH_SUCCESS: 'COLONY_FETCH_SUCCESS',
  COLONY_FETCH_TRANSACTIONS: 'COLONY_FETCH_TRANSACTIONS',
  COLONY_FETCH_TRANSACTIONS_ERROR: 'COLONY_FETCH_TRANSACTIONS_ERROR',
  COLONY_FETCH_TRANSACTIONS_SUCCESS: 'COLONY_FETCH_TRANSACTIONS_SUCCESS',
  COLONY_FETCH_UNCLAIMED_TRANSACTIONS: 'COLONY_FETCH_UNCLAIMED_TRANSACTIONS',
  COLONY_FETCH_UNCLAIMED_TRANSACTIONS_ERROR: 'COLONY_FETCH_UNCLAIMED_TRANSACTIONS_ERROR',
  COLONY_FETCH_UNCLAIMED_TRANSACTIONS_SUCCESS: 'COLONY_FETCH_UNCLAIMED_TRANSACTIONS_SUCCESS',
  COLONY_MINT_TOKENS: 'COLONY_MINT_TOKENS',
  COLONY_MINT_TOKENS_ERROR: 'COLONY_MINT_TOKENS_ERROR',
  COLONY_MINT_TOKENS_SUCCESS: 'COLONY_MINT_TOKENS_SUCCESS',
  COLONY_MINT_TOKENS_SUBMITTED: 'COLONY_MINT_TOKENS_SUBMITTED',
  COLONY_NAME_FETCH: 'COLONY_NAME_FETCH',
  COLONY_NAME_FETCH_ERROR: 'COLONY_NAME_FETCH_ERROR',
  COLONY_NAME_FETCH_SUCCESS: 'COLONY_NAME_FETCH_SUCCESS',
  COLONY_PROFILE_UPDATE: 'COLONY_PROFILE_UPDATE',
  COLONY_PROFILE_UPDATE_ERROR: 'COLONY_PROFILE_UPDATE_ERROR',
  COLONY_PROFILE_UPDATE_SUCCESS: 'COLONY_PROFILE_UPDATE_SUCCESS',
  COLONY_RECOVERY_MODE_ENTER: 'COLONY_RECOVERY_MODE_ENTER',
  COLONY_RECOVERY_MODE_ENTER_ERROR: 'COLONY_RECOVERY_MODE_ENTER_ERROR',
  COLONY_RECOVERY_MODE_ENTER_SUCCESS: 'COLONY_RECOVERY_MODE_ENTER_SUCCESS',
  COLONY_ROLES_FETCH: 'COLONY_ROLES_FETCH',
  COLONY_ROLES_FETCH_ERROR: 'COLONY_ROLES_FETCH_ERROR',
  COLONY_ROLES_FETCH_SUCCESS: 'COLONY_ROLES_FETCH_SUCCESS',
  COLONY_TASK_METADATA_FETCH: 'COLONY_TASK_METADATA_FETCH',
  COLONY_TASK_METADATA_FETCH_ERROR: 'COLONY_TASK_METADATA_FETCH_ERROR',
  COLONY_TASK_METADATA_FETCH_SUCCESS: 'COLONY_TASK_METADATA_FETCH_SUCCESS',
  COLONY_TOKEN_BALANCE_FETCH: 'COLONY_TOKEN_BALANCE_FETCH',
  COLONY_TOKEN_BALANCE_FETCH_ERROR: 'COLONY_TOKEN_BALANCE_FETCH_ERROR',
  COLONY_TOKEN_BALANCE_FETCH_SUCCESS: 'COLONY_TOKEN_BALANCE_FETCH_SUCCESS',
  COLONY_UPDATE_TOKENS: 'COLONY_UPDATE_TOKENS',
  COLONY_UPDATE_TOKENS_ERROR: 'COLONY_UPDATE_TOKENS_ERROR',
  COLONY_UPDATE_TOKENS_SUCCESS: 'COLONY_UPDATE_TOKENS_SUCCESS',
  COLONY_VERSION_UPGRADE: 'COLONY_VERSION_UPGRADE',
  COLONY_VERSION_UPGRADE_ERROR: 'COLONY_VERSION_UPGRADE_ERROR',
  COLONY_VERSION_UPGRADE_SUCCESS: 'COLONY_VERSION_UPGRADE_SUCCESS',
  CURRENT_USER_CREATE: 'CURRENT_USER_CREATE',
  CURRENT_USER_GET_BALANCE: 'CURRENT_USER_GET_BALANCE',
  CURRENT_USER_GET_BALANCE_ERROR: 'CURRENT_USER_GET_BALANCE_ERROR',
  CURRENT_USER_GET_BALANCE_SUCCESS: 'CURRENT_USER_GET_BALANCE_SUCCESS',
  DOMAIN_CREATE: 'DOMAIN_CREATE',
  DOMAIN_CREATE_ERROR: 'DOMAIN_CREATE_ERROR',
  DOMAIN_CREATE_SUCCESS: 'DOMAIN_CREATE_SUCCESS',
  DOMAIN_CREATE_TX: 'DOMAIN_CREATE_TX',
  DOMAIN_CREATE_TX_ERROR: 'DOMAIN_CREATE_TX_ERROR',
  DOMAIN_CREATE_TX_SUCCESS: 'DOMAIN_CREATE_TX_SUCCESS',
  DOMAIN_FETCH: 'DOMAIN_FETCH',
  DOMAIN_FETCH_ERROR: 'DOMAIN_FETCH_ERROR',
  DOMAIN_FETCH_SUCCESS: 'DOMAIN_FETCH_SUCCESS',
  GAS_PRICES_UPDATE: 'GAS_PRICES_UPDATE',
  IPFS_DATA_FETCH: 'IPFS_DATA_FETCH',
  IPFS_DATA_FETCH_ERROR: 'IPFS_DATA_FETCH_ERROR',
  IPFS_DATA_FETCH_SUCCESS: 'IPFS_DATA_FETCH_SUCCESS',
  IPFS_DATA_UPLOAD: 'IPFS_DATA_UPLOAD',
  IPFS_DATA_UPLOAD_ERROR: 'IPFS_DATA_UPLOAD_ERROR',
  IPFS_DATA_UPLOAD_SUCCESS: 'IPFS_DATA_UPLOAD_SUCCESS',
  MULTISIG_TRANSACTION_CREATED: 'MULTISIG_TRANSACTION_CREATED',
  MULTISIG_TRANSACTION_REFRESHED: 'MULTISIG_TRANSACTION_REFRESHED',
  MULTISIG_TRANSACTION_REJECT: 'MULTISIG_TRANSACTION_REJECT',
  MULTISIG_TRANSACTION_SIGN: 'MULTISIG_TRANSACTION_SIGN',
  MULTISIG_TRANSACTION_SIGNED: 'MULTISIG_TRANSACTION_SIGNED',
  NETWORK_FETCH_VERSION: 'NETWORK_FETCH_VERSION',
  NETWORK_FETCH_VERSION_ERROR: 'NETWORK_FETCH_VERSION_ERROR',
  NETWORK_FETCH_VERSION_SUCCESS: 'NETWORK_FETCH_VERSION_SUCCESS',
  REHYDRATE: '@@persist/REHYDRATE',
  REHYDRATED: '@@persist/REHYDRATED',
  TASK_CANCEL: 'TASK_CANCEL',
  TASK_CANCEL_ERROR: 'TASK_CANCEL_ERROR',
  TASK_CANCEL_SUCCESS: 'TASK_CANCEL_SUCCESS',
  TASK_CLOSE: 'TASK_CLOSE',
  TASK_CLOSE_ERROR: 'TASK_CLOSE_ERROR',
  TASK_CLOSE_SUCCESS: 'TASK_CLOSE_SUCCESS',
  TASK_COMMENT_ADD: 'TASK_COMMENT_ADD',
  TASK_COMMENT_ADD_ERROR: 'TASK_COMMENT_ADD_ERROR',
  TASK_COMMENT_ADD_SUCCESS: 'TASK_COMMENT_ADD_SUCCESS',
  TASK_CREATE: 'TASK_CREATE',
  TASK_CREATE_ERROR: 'TASK_CREATE_ERROR',
  TASK_CREATE_SUCCESS: 'TASK_CREATE_SUCCESS',
  TASK_FETCH: 'TASK_FETCH',
  TASK_FETCH_ALL: 'TASK_FETCH_ALL',
  TASK_FETCH_COMMENTS: 'TASK_FETCH_COMMENTS',
  TASK_FETCH_COMMENTS_ERROR: 'TASK_FETCH_COMMENTS_ERROR',
  TASK_FETCH_COMMENTS_SUCCESS: 'TASK_FETCH_COMMENTS_SUCCESS',
  TASK_FETCH_ERROR: 'TASK_FETCH_ERROR',
  TASK_FETCH_SUCCESS: 'TASK_FETCH_SUCCESS',
  TASK_FINALIZE: 'TASK_FINALIZE',
  TASK_FINALIZE_ERROR: 'TASK_FINALIZE_ERROR',
  TASK_FINALIZE_SUCCESS: 'TASK_FINALIZE_SUCCESS',
  TASK_MANAGER_COMPLETE: 'TASK_MANAGER_COMPLETE',
  TASK_MANAGER_COMPLETE_ERROR: 'TASK_MANAGER_COMPLETE_ERROR',
  TASK_MANAGER_COMPLETE_SUCCESS: 'TASK_MANAGER_COMPLETE_SUCCESS',
  TASK_MANAGER_END: 'TASK_MANAGER_END',
  TASK_MANAGER_END_ERROR: 'TASK_MANAGER_END_ERROR',
  TASK_MANAGER_END_SUCCESS: 'TASK_MANAGER_END_SUCCESS',
  TASK_MANAGER_RATE_WORKER: 'TASK_MANAGER_RATE_WORKER',
  TASK_MANAGER_RATE_WORKER_ERROR: 'TASK_MANAGER_RATE_WORKER_ERROR',
  TASK_MANAGER_RATE_WORKER_SUCCESS: 'TASK_MANAGER_RATE_WORKER_SUCCESS',
  TASK_MANAGER_REVEAL_WORKER_RATING: 'TASK_MANAGER_REVEAL_WORKER_RATING',
  TASK_MANAGER_REVEAL_WORKER_RATING_ERROR: 'TASK_MANAGER_REVEAL_WORKER_RATING_ERROR',
  TASK_MANAGER_REVEAL_WORKER_RATING_SUCCESS: 'TASK_MANAGER_REVEAL_WORKER_RATING_SUCCESS',
  TASK_MODIFY_WORKER_PAYOUT: 'TASK_MODIFY_WORKER_PAYOUT',
  TASK_MODIFY_WORKER_PAYOUT_ERROR: 'TASK_MODIFY_WORKER_PAYOUT_ERROR',
  TASK_MODIFY_WORKER_PAYOUT_SUCCESS: 'TASK_MODIFY_WORKER_PAYOUT_SUCCESS',
  TASK_SEND_WORK_INVITE: 'TASK_SEND_WORK_INVITE',
  TASK_SEND_WORK_INVITE_ERROR: 'TASK_SEND_WORK_INVITE_ERROR',
  TASK_SEND_WORK_INVITE_SUCCESS: 'TASK_SEND_WORK_INVITE_SUCCESS',
  TASK_SEND_WORK_REQUEST: 'TASK_SEND_WORK_REQUEST',
  TASK_SEND_WORK_REQUEST_ERROR: 'TASK_SEND_WORK_REQUEST_ERROR',
  TASK_SEND_WORK_REQUEST_SUCCESS: 'TASK_SEND_WORK_REQUEST_SUCCESS',
  TASK_SET_DESCRIPTION: 'TASK_SET_DESCRIPTION',
  TASK_SET_DESCRIPTION_ERROR: 'TASK_SET_DESCRIPTION_ERROR',
  TASK_SET_DESCRIPTION_SUCCESS: 'TASK_SET_DESCRIPTION_SUCCESS',
  TASK_SET_DOMAIN: 'TASK_SET_DOMAIN',
  TASK_SET_DOMAIN_ERROR: 'TASK_SET_DOMAIN_ERROR',
  TASK_SET_DOMAIN_SUCCESS: 'TASK_SET_DOMAIN_SUCCESS',
  TASK_SET_DUE_DATE: 'TASK_SET_DUE_DATE',
  TASK_SET_DUE_DATE_ERROR: 'TASK_SET_DUE_DATE_ERROR',
  TASK_SET_DUE_DATE_SUCCESS: 'TASK_SET_DUE_DATE_SUCCESS',
  TASK_SET_PAYOUT: 'TASK_SET_PAYOUT',
  TASK_SET_PAYOUT_ERROR: 'TASK_SET_PAYOUT_ERROR',
  TASK_SET_PAYOUT_SUCCESS: 'TASK_SET_PAYOUT_SUCCESS',
  TASK_SET_SKILL: 'TASK_SET_SKILL',
  TASK_SET_SKILL_ERROR: 'TASK_SET_SKILL_ERROR',
  TASK_SET_SKILL_SUCCESS: 'TASK_SET_SKILL_SUCCESS',
  TASK_SET_TITLE: 'TASK_SET_TITLE',
  TASK_SET_TITLE_ERROR: 'TASK_SET_TITLE_ERROR',
  TASK_SET_TITLE_SUCCESS: 'TASK_SET_TITLE_SUCCESS',
  TASK_SUBMIT_DELIVERABLE: 'TASK_SUBMIT_DELIVERABLE',
  TASK_SUBMIT_DELIVERABLE_ERROR: 'TASK_SUBMIT_DELIVERABLE_ERROR',
  TASK_SUBMIT_DELIVERABLE_SUCCESS: 'TASK_SUBMIT_DELIVERABLE_SUCCESS',
  TASK_WORKER_ASSIGN: 'TASK_WORKER_ASSIGN',
  TASK_WORKER_ASSIGN_ERROR: 'TASK_WORKER_ASSIGN_ERROR',
  TASK_WORKER_ASSIGN_SUCCESS: 'TASK_WORKER_ASSIGN_SUCCESS',
  TASK_WORKER_CLAIM_REWARD: 'TASK_WORKER_CLAIM_REWARD',
  TASK_WORKER_CLAIM_REWARD_ERROR: 'TASK_WORKER_CLAIM_REWARD_ERROR',
  TASK_WORKER_CLAIM_REWARD_SUCCESS: 'TASK_WORKER_CLAIM_REWARD_SUCCESS',
  TASK_WORKER_END: 'TASK_WORKER_END',
  TASK_WORKER_END_ERROR: 'TASK_WORKER_END_ERROR',
  TASK_WORKER_END_SUCCESS: 'TASK_WORKER_END_SUCCESS',
  TASK_WORKER_RATE_MANAGER: 'TASK_WORKER_RATE_MANAGER',
  TASK_WORKER_RATE_MANAGER_ERROR: 'TASK_WORKER_RATE_MANAGER_ERROR',
  TASK_WORKER_RATE_MANAGER_SUCCESS: 'TASK_WORKER_RATE_MANAGER_SUCCESS',
  TASK_WORKER_REVEAL_MANAGER_RATING: 'TASK_WORKER_REVEAL_MANAGER_RATING',
  TASK_WORKER_REVEAL_MANAGER_RATING_ERROR: 'TASK_WORKER_REVEAL_MANAGER_RATING_ERROR',
  TASK_WORKER_REVEAL_MANAGER_RATING_SUCCESS: 'TASK_WORKER_REVEAL_MANAGER_RATING_SUCCESS',
  TASK_WORKER_UNASSIGN: 'TASK_WORKER_UNASSIGN',
  TASK_WORKER_UNASSIGN_ERROR: 'TASK_WORKER_UNASSIGN_ERROR',
  TASK_WORKER_UNASSIGN_SUCCESS: 'TASK_WORKER_UNASSIGN_SUCCESS',
  TOKEN_CREATE: 'TOKEN_CREATE',
  TOKEN_CREATE_ERROR: 'TOKEN_CREATE_ERROR',
  TOKEN_CREATE_SUCCESS: 'TOKEN_CREATE_SUCCESS',
  TOKEN_INFO_FETCH: 'TOKEN_INFO_FETCH',
  TOKEN_INFO_FETCH_ERROR: 'TOKEN_INFO_FETCH_ERROR',
  TOKEN_INFO_FETCH_SUCCESS: 'TOKEN_INFO_FETCH_SUCCESS',
  TRANSACTION_ADD_IDENTIFIER: 'TRANSACTION_ADD_IDENTIFIER',
  TRANSACTION_ADD_PARAMS: 'TRANSACTION_ADD_PARAMS',
  TRANSACTION_CANCEL: 'TRANSACTION_CANCEL',
  TRANSACTION_CREATED: 'TRANSACTION_CREATED',
  TRANSACTION_ERROR: 'TRANSACTION_ERROR',
  TRANSACTION_ESTIMATE_GAS: 'TRANSACTION_ESTIMATE_GAS',
  TRANSACTION_GAS_UPDATE: 'TRANSACTION_GAS_UPDATE',
  TRANSACTION_READY: 'TRANSACTION_READY',
  TRANSACTION_RECEIPT_RECEIVED: 'TRANSACTION_RECEIPT_RECEIVED',
  TRANSACTION_SEND: 'TRANSACTION_SEND',
  TRANSACTION_SENT: 'TRANSACTION_SENT',
  TRANSACTION_SUCCEEDED: 'TRANSACTION_SUCCEEDED',
  USER_ACTIVITIES_FETCH: 'USER_ACTIVITIES_FETCH',
  USER_ACTIVITIES_FETCH_ERROR: 'USER_ACTIVITIES_FETCH_ERROR',
  USER_ACTIVITIES_FETCH_SUCCESS: 'USER_ACTIVITIES_FETCH_SUCCESS',
  USER_ACTIVITIES_UPDATE: 'USER_ACTIVITIES_UPDATE',
  USER_ACTIVITIES_UPDATE_ERROR: 'USER_ACTIVITIES_UPDATE_ERROR',
  USER_ACTIVITIES_UPDATE_SUCCESS: 'USER_ACTIVITIES_UPDATE_SUCCESS',
  USER_AVATAR_REMOVE: 'USER_AVATAR_REMOVE',
  USER_AVATAR_REMOVE_ERROR: 'USER_AVATAR_REMOVE_ERRROR',
  USER_AVATAR_REMOVE_SUCCESS: 'USER_AVATAR_REMOVE_SUCCESS',
  USER_AVATAR_UPLOAD: 'USER_AVATAR_UPLOAD',
  USER_AVATAR_UPLOAD_ERROR: 'USER_AVATAR_UPLOAD_ERRROR',
  USER_AVATAR_UPLOAD_SUCCESS: 'USER_AVATAR_UPLOAD_SUCCESS',
  USER_BY_USERNAME_FETCH: 'USER_BY_USERNAME_FETCH',
  USER_COLONY_SUBSCRIBE: 'USER_COLONY_SUBSCRIBE',
  USER_COLONY_SUBSCRIBE_ERROR: 'USER_COLONY_SUBSCRIBE_ERROR',
  USER_COLONY_SUBSCRIBE_SUCCESS: 'USER_COLONY_SUBSCRIBE_SUCCESS',
  USER_FETCH: 'USER_FETCH',
  USER_FETCH_ERROR: 'USER_FETCH_ERROR',
  USER_FETCH_SUCCESS: 'USER_FETCH_SUCCESS',
  USER_METADATA_SET: 'USER_METADATA_SET',
  USER_PERMISSIONS_FETCH: 'USER_PERMISSIONS_FETCH',
  USER_PERMISSIONS_FETCH_ERROR: 'USER_PERMISSIONS_FETCH_ERROR',
  USER_PERMISSIONS_FETCH_SUCCESS: 'USER_PERMISSIONS_FETCH_SUCCESS',
  USER_PROFILE_UPDATE: 'USER_PROFILE_UPDATE',
  USER_PROFILE_UPDATE_ERROR: 'USER_PROFILE_UPDATE_ERROR',
  USER_PROFILE_UPDATE_SUCCESS: 'USER_PROFILE_UPDATE_SUCCESS',
  USER_SUBSCRIBED_COLONIES_FETCH: 'USER_SUBSCRIBED_COLONIES_FETCH',
  USER_SUBSCRIBED_COLONIES_FETCH_ERROR: 'USER_SUBSCRIBED_COLONIES_FETCH_ERROR',
  USER_SUBSCRIBED_COLONIES_FETCH_SUCCESS: 'USER_SUBSCRIBED_COLONIES_FETCH_SUCCESS',
  USER_SUBSCRIBED_TASKS_FETCH: 'USER_SUBSCRIBED_TASKS_FETCH',
  USER_SUBSCRIBED_TASKS_FETCH_ERROR: 'USER_SUBSCRIBED_TASKS_FETCH_ERROR',
  USER_SUBSCRIBED_TASKS_FETCH_SUCCESS: 'USER_SUBSCRIBED_TASKS_FETCH_SUCCESS',
  USER_TASK_SUBSCRIBE: 'USER_TASK_SUBSCRIBE',
  USER_TASK_SUBSCRIBE_ERROR: 'USER_TASK_SUBSCRIBE_ERROR',
  USER_TASK_SUBSCRIBE_SUCCESS: 'USER_TASK_SUBSCRIBE_SUCCESS',
  USER_TOKEN_TRANSFERS_FETCH: 'USER_TOKEN_TRANSFERS_FETCH',
  USER_TOKEN_TRANSFERS_FETCH_ERROR: 'USER_TOKEN_TRANSFERS_FETCH_ERROR',
  USER_TOKEN_TRANSFERS_FETCH_SUCCESS: 'USER_TOKEN_TRANSFERS_FETCH_SUCCESS',
  USER_TOKENS_FETCH: 'USER_TOKENS_FETCH',
  USER_TOKENS_FETCH_ERROR: 'USER_TOKENS_FETCH_ERROR',
  USER_TOKENS_FETCH_SUCCESS: 'USER_TOKENS_FETCH_SUCCESS',
  USER_TOKENS_UPDATE: 'USER_TOKENS_UPDATE',
  USER_TOKENS_UPDATE_ERROR: 'USER_TOKENS_UPDATE_ERROR',
  USER_TOKENS_UPDATE_SUCCESS: 'USER_TOKENS_UPDATE_SUCCESS',
  USERNAME_CHECK_AVAILABILITY: 'USERNAME_CHECK_AVAILABILITY',
  USERNAME_CHECK_AVAILABILITY_ERROR: 'USERNAME_CHECK_AVAILABILITY_ERROR',
  USERNAME_CHECK_AVAILABILITY_SUCCESS: 'USERNAME_CHECK_AVAILABILITY_SUCCESS',
  USERNAME_CREATE: 'USERNAME_CREATE',
  USERNAME_CREATE_ERROR: 'USERNAME_CREATE_ERROR',
  USERNAME_CREATE_SUCCESS: 'USERNAME_CREATE_SUCCESS',
  WALLET_CREATE: 'WALLET_CREATE',
  WALLET_CREATE_ERROR: 'WALLET_CREATE_ERROR',
  WALLET_FETCH_ACCOUNTS: 'WALLET_FETCH_ACCOUNTS',
  WALLET_FETCH_ACCOUNTS_ERROR: 'WALLET_FETCH_ACCOUNTS_ERROR',
  WALLET_FETCH_ACCOUNTS_SUCCESS: 'WALLET_FETCH_ACCOUNTS_SUCCESS',
});

export default ACTIONS;
