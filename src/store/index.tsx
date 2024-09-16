import { combineReducers, configureStore } from "@reduxjs/toolkit";
import reducerUser from "../reducers/reducerUser";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import { persistStore } from "redux-persist";


const combineReduce = combineReducers({
    userData: reducerUser
})



const persisConfig = {
    key: "root",
    storage,
}

const persistReduce = persistReducer(persisConfig, combineReduce )

export const store = configureStore({
    reducer: persistReduce
})


export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;