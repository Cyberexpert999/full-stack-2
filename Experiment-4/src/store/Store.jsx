import { createStore } from "redux";
import { CounterReducer } from "./CounterReducer";

export const store = createStore(CounterReducer);
