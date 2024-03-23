import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducers";

const userAccountString = localStorage.getItem("account");
const userAccount = userAccountString ? JSON.parse(userAccountString) : null;





const initialState = {
    user: { userInfo: userAccount }
};



const store = configureStore({
    reducer: {
        user: userReducer
    },
    preloadedState: initialState
})

export default store;