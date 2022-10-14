import { createStore, combineReducers } from "redux";
import filterReducer from "./filterReducer ";
import cartReducer from "./cartReducer";
import modalReducer from "./modalReducer";

const appReducer =combineReducers({
    filter: filterReducer,
    cart: cartReducer,
    modal: modalReducer
});

const store = createStore(
    appReducer,undefined,undefined
);

export default store;