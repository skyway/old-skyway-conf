import { createContext } from "react";
import RootStore from "./stores";

const rootStore = new RootStore();
export const StoreContext = createContext(rootStore);
