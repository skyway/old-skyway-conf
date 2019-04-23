import { createContext } from "react";
import RootStore from "./stores";
import RootAction from "./actions";

const rootStore = new RootStore();
const rootAction = new RootAction(rootStore);
export const StoreContext = createContext(rootStore);
export const ActionContext = createContext(rootAction);
