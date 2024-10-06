import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addBookMarkThunk = createAsyncThunk(
  "post/AddBookmark",
  async (data) => {
    const response = await fetch(
      `http://localhost:5500/api/v1/bookmark/addBookmark`,
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
    return dataRes;
  }
);

export const removeBookMarkThunk = createAsyncThunk(
  "post/RemoveBookmark",
  async (data) => {
    const response = await fetch(
      `http://localhost:5500/api/v1/bookmark/removeBookMark/${data.postId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem(`token`),
        },
      }
    );
    const dataRes = await response.json();
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
