import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types/Products";
import { toast } from "react-toastify";
const initialState: Product[] = [];
const favoriteSlice = createSlice({
  name: "save",
  initialState,
  reducers: {
    saveItem: (state, action) => {
      const itemExists = state.find((item) => item?.id === action.payload.id);
      if (itemExists) {
       const index = state.findIndex((item) => item.id === action.payload.id);
       state.splice(index, 1);
       toast.success("item removed");
      } else {
        toast.success("item saved");
        state.push({ ...action.payload });
      }
    },

    removeItem: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload.id);
        state.splice(index, 1);
        toast.success('item removed');
    },

    emptyFavorites: (state) => { 
      state = []
    }
  },
});

export const {
  saveItem,

  removeItem,

} = favoriteSlice.actions;

export const {emptyFavorites} = favoriteSlice.actions;
export default favoriteSlice.reducer;
