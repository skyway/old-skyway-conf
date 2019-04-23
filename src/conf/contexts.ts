import { createContext } from "react";
import RootStore from "./stores";

const rootStore = new RootStore();
// @ts-ignore: for debug
window.store = rootStore;

export const StoreContext = createContext(rootStore);
