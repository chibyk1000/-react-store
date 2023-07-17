import { configureStore } from "@reduxjs/toolkit"

import favoriteReducers from "../../redux/reducers/favoriteReducers"
import productsReducer from "../../redux/reducers/productReducers"
import userReducers from "../../redux/reducers/userReducer"
import cartReducers from "../../redux/reducers/cartReducers"

const store = configureStore({
    reducer: {
        productsReducer,
        userReducers,
        favoriteReducers,
        cartReducers
    }
})    

export default store