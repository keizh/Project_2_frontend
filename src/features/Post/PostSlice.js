import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchPosts, fetchBookMarks } from "../User/UserSlice";
import ProvideData from "../../utils/ProvideData";
import { showAlert } from "../Alert/AlertSlice";
export const AddPostThunk = createAsyncThunk("post/AddPost", async (data) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND}/api/v1/post/addPost`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem(`token`),
      },
    }
  );
  const dataRes = await response.json();
  return dataRes;
});

export const fetchPostsThunk = createAsyncThunk("fetch/fetchPost", async () => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND}/api/v1/post/posts`,
    {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem(`token`),
      },
    }
  );
  const dataRes = await response.json();
  console.log(`posts have been `, dataRes);
  return dataRes.updatedPostsArray;
});

export const removeCommentThunk = createAsyncThunk(
  "delete/removeComment",
  async (data, { dispatch }) => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND}/api/v1/post/removeCommentCommentOwner`,
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
    if (data.areWeOnProfilePage == true) {
      dispatch(fetchBookMarks({ id: data.id }));
      dispatch(fetchPosts({ id: data.id }));
    } else {
      dispatch(fetchPostsThunk());
    }
    console.log(`completed`);
    return dataRes;
  }
);

export const addCommentThunk = createAsyncThunk(
  "post/AddComment",
  async (data, { dispatch }) => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND}/api/v1/post/addComment`,
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
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND}/api/v1/post/like`,
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
  return dataRes;
});

export const removeLikeThunk = createAsyncThunk(
  "post/removeLike",
  async (data) => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND}/api/v1/post/unlike`,
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
    return dataRes;
  }
);

// addBookMarkThunk,

export const removeBookMarkThunk = createAsyncThunk(
  "post/removeBookmark",
  async (data) => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND}/api/v1/post/unlike`,
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
    return dataRes;
  }
);

export const deletePostThunk = createAsyncThunk(
  "delete/post",
  async (data, { dispatch }) => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND}/api/v1/post/removePost/${data.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem(`token`),
        },
      }
    );
    const dataRes = await response.json();
    const { userId } = ProvideData();
    dispatch(fetchPosts({ id: userId }));
    dispatch(
      showAlert({ message: "Post successfully deleted", color: "orange" })
    );
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
            ele.userLiked = true;
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
            ele.userLiked = false;
          }
          return ele;
        }),
      ];
    },
    filterPostSYNC: (state, action) => {
      console.log(`filtering`, action.payload);
      if (action.payload == "Rated") {
        state.posts = state.posts.sort(
          (a, b) => b.likes.length - a.likes.length
        );
      } else {
        state.posts = state.posts.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      }
    },
    UpdateBookMarkStateInPostsToFalse: (state, action) => {
      state.posts = [
        ...state.posts.map((ele) => {
          if (ele._id == action.payload.postId) {
            ele.userBookmark = false;
          }
          return ele;
        }),
      ];
    },
    UpdateBookMarkStateInPostsToTrue: (state, action) => {
      state.posts = [
        ...state.posts.map((ele) => {
          if (ele._id == action.payload.postId) {
            ele.userBookmark = true;
          }
          return ele;
        }),
      ];
      // state.otherUserPosts = [
      //   ...state.otherUserPosts.map((ele) => {
      //     if (ele._id == action.payload.postId) {
      //       ele.userBookmark = true;
      //     }
      //     return ele;
      //   }),
      // ];
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
export const {
  AddLikes,
  RemoveLikes,
  filterPostSYNC,
  UpdateBookMarkStateInPostsToFalse,
  UpdateBookMarkStateInPostsToTrue,
} = PostSlice.actions;
