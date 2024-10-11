import { configureStore } from "@reduxjs/toolkit";
import PostSlice from "../features/Post/PostSlice";
import bookMarkSlice from "../features/BookMark/BookMark";
import UserSlice from "../features/User/UserSlice";
import AlertSlice from "../features/Alert/AlertSlice";

const Store = configureStore({
  reducer: {
    Post: PostSlice.reducer,
    Bookmark: bookMarkSlice.reducer,
    User: UserSlice.reducer,
    Alert: AlertSlice.reducer,
  },
});

export default Store;
