import { createStore, combineReducers } from "redux";
import filterReducer from "./filterReducer ";
import cartReducer from "./cartReducer";

const appReducer =combineReducers({
    filter: filterReducer,
    cart: cartReducer
});

const store = createStore(
    appReducer,undefined,undefined
);

export default store;