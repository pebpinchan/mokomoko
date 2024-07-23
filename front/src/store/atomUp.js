import { atom, atomFamily, selector } from 'recoil';

export const idsAtom = atom({
  key: 'idsAtom',
  default: []
});

export const todoAtom = atomFamily({
  key: 'todoAtom',
  default: null
});

export const todoListSelector = selector({
  key: 'todoListSelector',
  get: ({ get }) => {
    const ids = get(idsAtom);
    return ids.map(id => get(todoAtom(id)));
  },
  set: ({ set, reset }, { type, id, newItem }) => {
    switch (type) {
      case 'add' :
       set(todoAtom(newItem.id), newItem);
       set(idsAtom, ids => [...ids, newItem.id]);
       break;
      case 'done' :
        set(todoAtom(id), todo => ({ ...todo, isDone: true }));
        break;
      case 'remove' :
        reset(todoAtom(id));
        set(idsAtom, ids => ids.filter(e => e !== id));
        break;
      default :
        throw new Error('Type is invalid.');
    }
  }
});