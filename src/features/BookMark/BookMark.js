import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showAlert } from "../Alert/AlertSlice";
export const addBookMarkThunk = createAsyncThunk(
  "post/AddBookmark",
  async (data, { dispatch }) => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND}/api/v1/bookmark/addBookmark`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem(`token`),
        },
        body: JSON.stringify(data),
      }
    );
    const dataRes = await response.json();
    console.log(`completed adding Bookmark`);
    dispatch(
      showAlert({ message: "Post has been BookMarked", color: "green" })
    );
    return dataRes;
  }
);

export const removeBookMarkThunk = createAsyncThunk(
  "post/RemoveBookmark",
  async (data, { dispatch }) => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND}/api/v1/bookmark/removeBookMark/${
        data.postId
      }`,
      {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem(`token`),
        },
      }
    );
    const dataRes = await response.json();
    dispatch(showAlert({ message: "Bookmark is removed", color: "red" }));
    console.log(`completed REMOVING Bookmark`);
    return dataRes;
  }
);

export const bookMarkSlice = createSlice({
  name: "bookMarkSlice",
  initialState: {
    bookmarks: [],
    status: "idle", // loading, error , success
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addBookMarkThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addBookMarkThunk.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(addBookMarkThunk.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      });

    builder
      .addCase(removeBookMarkThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeBookMarkThunk.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(removeBookMarkThunk.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      });
  },
});

export default bookMarkSlice;
