import { configureStore } from "@reduxjs/toolkit";
import PostSlice from "../features/Post/PostSlice";
import bookMarkSlice from "../features/BookMark/BookMark";

const Store = configureStore({
  reducer: {
    Post: PostSlice.reducer,
    Bookmark: bookMarkSlice.reducer,
  },
});

export default Store;
