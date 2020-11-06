export const MOCK_ACTIONS = [
  {
    id: 1,
    title: 'Create new Domain #BDSM',
    createdAt: 1604399689594,
    userAddress: '0xb77D57F4959eAfA0339424b83FcFaf9c15407461',
    domain: {
      name: 'First domain',
      id: 2,
    },
    commentCount: 0,
    status: 'needsAction',
  },
  {
    id: 2,
    title: 'Transfer 250000 xDai from #Dev to #Design by @storm',
    createdAt: 1604399844229,
    userAddress: '0x9df24e73f40b2a911eb254a8825103723e13209c',
    commentCount: 5,
  },
  {
    id: 3,
    title: 'Punish @a 500 #R&D Reputation',
    createdAt: 1604399689594,
    userAddress: '0x27ff0c145e191c22c75cd123c679c3e1f58a4469',
    domain: {
      name: 'Third',
      id: 4,
    },
    commentCount: 4,
    status: 'needsAttention',
  },
  {
    id: 4,
    title:
      // eslint-disable-next-line max-len
      'A very very very long title, a very very very long title, a very very very long title, a very very very long title, a very very very long title, a very very very long title, a very very very long title, a very very very long title, a very very very long title',
    createdAt: 1604399689594,
    userAddress: '0x27ff0c145e191c22c75cd123c679c3e1f58a4469',
    domain: {
      name: 'Third',
      id: 4,
    },
    commentCount: 40,
  },
];
