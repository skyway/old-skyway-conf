import { createContext } from 'react';
import Action from './action';
import User from './stores/user';

export interface Store {
  user: User;
}
const store = {
  user: new User(),
};
const action = new Action(store);

export const StoreContext = createContext(store);
export const ActionContext = createContext(action);
