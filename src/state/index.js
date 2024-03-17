import { atom } from 'recoil';

export const blockForDeleteState = atom({
  key: 'BlocksForDelete',
  default: [],
});
