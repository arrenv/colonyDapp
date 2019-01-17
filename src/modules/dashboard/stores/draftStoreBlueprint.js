/* @flow */

import * as yup from 'yup';

import { ValidatedKVStore } from '../../../lib/database/stores';
import { colonyMeta } from './meta';

import type { StoreBlueprint } from '~types';

const draftStoreBlueprint: StoreBlueprint = {
  // TODO add access controller
  name: 'draft',
  schema: yup.object({
    meta: colonyMeta,
    assignee: yup.string(),
    creator: yup.string(),
    domainId: yup.number(),
    dueDate: yup.date(),
    feedItems: yup.string(), // store address
    id: yup.string(),
    specificationHash: yup.string(),
    title: yup.string(),
  }),
  type: ValidatedKVStore,
};

export default draftStoreBlueprint;
