import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const AddPostThunk = createAsyncThunk("post/AddPost", async (data) => {
  const response = await fetch(`http://localhost:5500/api/v1/post/addPost`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem(`token`),
    },
  });
  const dataRes = await response.json();
  return dataRes;
});

export const fetchPostsThunk = createAsyncThunk("fetch/fetchPost", async () => {
  const response = await fetch(`http://localhost:5500/api/v1/post/posts`, {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem(`token`),
    },
  });
  const dataRes = await response.json();
  console.log(`posts have been `, dataRes);
  return dataRes.posts;
});

export const removeCommentThunk = createAsyncThunk(
  "delete/removeComment",
  async (data, { dispatch }) => {
    const response = await fetch(
      `http://localhost:5500/api/v1/post/removeCommentCommentOwner`,
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
    dispatch(fetchPostsThunk());
    console.log(`completed`);
    return dataRes;
  }
);

export const addCommentThunk = createAsyncThunk(
  "post/AddComment",
  async (data, { dispatch }) => {
    const response = await fetch(
      `http://localhost:5500/api/v1/post/addComment`,
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
    dispatch(fetchPostsThunk());
    return dataRes;
  }
);

export const addLikeThunk = createAsyncThunk("post/AddLike", async (data) => {
  const response = await fetch(`http://localhost:5500/api/v1/post/like`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem(`token`),
    },
    body: JSON.stringify(data),
  });
  const dataRes = await response.json();
  return dataRes;
});

export const removeLikeThunk = createAsyncThunk(
  "post/removeLike",
  async (data) => {
    const response = await fetch(`http://localhost:5500/api/v1/post/unlike`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem(`token`),
      },
      body: JSON.stringify(data),
    });
    const dataRes = await response.json();
    return dataRes;
  }
);

// addBookMarkThunk,

export const removeBookMarkThunk = createAsyncThunk(
  "post/removeBookmark",
  async (data) => {
    const response = await fetch(`http://localhost:5500/api/v1/post/unlike`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem(`token`),
      },
      body: JSON.stringify(data),
    });
    const dataRes = await response.json();
    return dataRes;
  }
);

const PostSlice = createSlice({
  name: "PostSlice",
  initialState: {
    posts: [],
    status: "idle", //'success' , 'loading' , 'error'
    error: null,
  },
  reducers: {
    AddLikes: (state, action) => {
      console.log(`hello addlike`);
      state.posts = [
        ...state.posts.map((ele) => {
          if (ele._id == action.payload.postId) {
            ele.likes = [...ele.likes, action.payload.userId];
          }
          return ele;
        }),
      ];
    },
    RemoveLikes: (state, action) => {
      console.log(`hello removing like`);
      state.posts = [
        ...state.posts.map((ele) => {
          if (ele._id == action.payload.postId) {
            ele.likes = [
              ...ele.likes.filter((userID) => userID != action.payload.userId),
            ];
          }
          return ele;
        }),
      ];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddPostThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(AddPostThunk.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(AddPostThunk.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      });

    builder
      .addCase(fetchPostsThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPostsThunk.fulfilled, (state, action) => {
        state.status = "success";
        state.posts = action.payload ? [...action.payload] : [];
      })
      .addCase(fetchPostsThunk.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      });

    builder
      .addCase(addCommentThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addCommentThunk.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(addCommentThunk.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      });

    builder
      .addCase(removeCommentThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeCommentThunk.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(removeCommentThunk.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      });

    builder
      .addCase(addLikeThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addLikeThunk.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(addLikeThunk.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      });

    builder
      .addCase(removeLikeThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeLikeThunk.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(removeLikeThunk.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      });
  },
});

export default PostSlice;
export const { AddLikes, RemoveLikes } = PostSlice.actions;
