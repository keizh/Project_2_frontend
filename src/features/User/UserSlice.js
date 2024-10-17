import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProvideData from "../../utils/ProvideData";
import { showAlert } from "../Alert/AlertSlice";

export const fetchPotentialPeopleToFollowSearch = createAsyncThunk(
  "fetch/potentialPeopleToFollowSearch",
  async (data) => {
    const response = await fetch(
      `http://localhost:5500/api/v1/user/YetToFollow/${data.search}`,
      {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem(`token`),
        },
      }
    );
    const dataRes = await response.json();
    return dataRes.potentialUsers;
  }
);

export const fetchPotentialPeopleToFollow = createAsyncThunk(
  "fetch/potentialPeopleToFollow",
  async () => {
    const response = await fetch(
      `http://localhost:5500/api/v1/user/YetToFollow`,
      {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem(`token`),
        },
      }
    );
    const dataRes = await response.json();

    return dataRes.potentialUsers;
  }
);

export const postFollowRequest = createAsyncThunk(
  "post/followRequest",
  async (data, { dispatch }) => {
    const response = await fetch(
      `http://localhost:5500/api/v1/user/followRequest`,
      {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem(`token`),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const dataRes = await response.json();
    // const { userId } = ProvideData();
    // dispatch(fetchUserDetails({ id: data.UserProfilePageId }));
    dispatch(followRequestSYNC({ userIdOfReciever: data.userId }));
    // dispatch(FollowReqSendOtherUserSYNC({ userId: data.userId }));
    return dataRes.potentialUsers;
  }
);

export const removeFollowRequest = createAsyncThunk(
  "post/removefollowRquest",
  async (data, { dispatch }) => {
    const response = await fetch(
      `http://localhost:5500/api/v1/user/removefollowRequest`,
      {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem(`token`),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const dataRes = await response.json();
    // dispatch(fetchPotentialPeopleToFollow());
    dispatch(removeFollowRequestSYNC({ userIdOfReciever: data.userId }));
    return dataRes.potentialUsers;
  }
);

export const fetchUserDetails = createAsyncThunk(
  "fetch/userDetails",
  async (data) => {
    console.log(data);
    console.log(`fetching User Detials`);
    const response = await fetch(
      `http://localhost:5500/api/v1/user/${data.id}`,
      {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem(`token`),
        },
      }
    );
    const dataRes = await response.json();
    console.log(`USER ==>`, dataRes.userFetched);
    return dataRes.userFetched;
  }
);

export const acceptFollowRequest = createAsyncThunk(
  "Post/addFollower",
  async (data, { dispatch }) => {
    const response = await fetch(
      `http://localhost:5500/api/v1/user/addFollower`,
      {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem(`token`),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const dataRes = await response.json();
    dispatch(fetchUserDetails());
    return dataRes;
  }
);

export const editUserDetail = createAsyncThunk(
  "post/updatingUserDetails",
  async (data, { dispatch }) => {
    const response = await fetch(`http://localhost:5500/api/v1/user/update`, {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem(`token`),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const dataRes = await response.json();
    dispatch(
      showAlert({
        message: "User data was successfully updated",
        color: "green",
      })
    );
    return dataRes.data;
  }
);

export const fetchPosts = createAsyncThunk("fetch/Posts", async (data) => {
  const response = await fetch(
    `http://localhost:5500/api/v1/post/fetchPosts/${data.id}`,
    {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem(`token`),
      },
    }
  );
  const dataRes = await response.json();
  return dataRes;
});

export const fetchBookMarks = createAsyncThunk(
  "fetch/BookMarks",
  async (data) => {
    const response = await fetch(
      `http://localhost:5500/api/v1/bookmark/BookMarks/${data.id}`,
      {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem(`token`),
        },
      }
    );
    const dataRes = await response.json();
    return dataRes;
  }
);

export const unFollowUserWHomIAmFollowing = createAsyncThunk(
  "update/unfollow",
  async (data, { dispatch }) => {
    const response = await fetch("http://localhost:5500/api/v1/user/unfollow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem(`token`),
      },
      body: JSON.stringify(data),
    });
    const dataRes = await response.json();
    const { userId } = ProvideData();
    dispatch(fetchUserDetails({ id: userId }));
    dispatch(showAlert({ message: "Successfully unfollowed", color: "green" }));
    return dataRes;
  }
);

export const removeFollowerThunk = createAsyncThunk(
  "post/removeFollower",
  async (data, { dispatch }) => {
    const response = await fetch(
      "http://localhost:5500/api/v1/user/removeFollower",
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
    const { userName, name } = ProvideData();
    dispatch(fetchUserDetails({ id: userId }));
    dispatch(
      showAlert({ message: "Successfully removed Follower", color: "green" })
    );
    return dataRes;
  }
);

const UserSlice = createSlice({
  name: "UserSlice",
  initialState: {
    user: null,
    userPosts: [],
    otherUserPosts: [],
    userBookmarks: [],
    otherUserBookmarks: [],
    otherUser: null,
    followers: [],
    following: [],
    status: "idle", // success, loading , error
    error: null,
    PeopleYouMightKnow: [],
  },
  reducers: {
    followRequestSYNC: (state, action) => {
      const { userName, userId } = ProvideData();
      state.PeopleYouMightKnow.forEach((person) => {
        if (person._id == action.payload.userIdOfReciever) {
          person.requestUpdates = [
            ...person.requestUpdates,
            {
              type: "recieved",
              content: `${userName} has sent you a follow request`,
              userIdOfSender: userId,
              userIdtoWhomIsWasSent: action.payload.userIdOfReciever,
            },
          ];
        }
      });
    },
    removeFollowRequestSYNC: (state, action) => {
      const { userId } = ProvideData();
      state.PeopleYouMightKnow.forEach((person) => {
        if (person._id == action.payload.userIdOfReciever) {
          person.requestUpdates = person.requestUpdates.filter(
            (req) => req.userIdOfSender != userId
          );
        }
      });
    },
    editUserDetailSYNC: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    removeBookMarkSYNC: (state, action) => {
      console.log(`removeBookMarkSYNC`);
      state.userBookmarks = state.userBookmarks.filter(
        (ele) => ele._id != action.payload.postId
      );
      console.log(`postId:`, action.payload.postId);
      console.log(`ele:`, state.userBookmarks);
    },
    // this function will syncronously deal with the it
    // while backend is being taken care of asycnhrously
    // so after you click follow
    // step 1: let async job complete , till then show loaders if successfull , we will sync change it too else dont
    // use this method we will not have to perform one more userDetail fetch request
    FollowReqSendOtherUserSYNC: (state, action) => {
      console.log(`running`);
      state.otherUser.following = state.otherUser?.following?.map((ele) => {
        if (action.payload.userId == ele.userId) {
          ele.userIsFollowing = "REQ_SENT";
        }
        return ele;
      });
      state.otherUser.followers = state.otherUser?.followers?.map((ele) => {
        if (action.payload.userId == ele.userId) {
          ele.userIsFollowing = "REQ_SENT";
        }
        return ele;
      });
    },
    // for the right top frineds list component
    postFollowRequestSYNCFollowStatus: (state, action) => {
      state.PeopleYouMightKnow = state?.PeopleYouMightKnow?.map((ele) => {
        if (ele._id == action.payload.userId) {
          ele.isUSERfollowingStatus = "REQ_SENT";
        }
        return ele;
      });
    },
    RemoveFollowReqSendOtherUserSYNC: (state, action) => {
      console.log(`running`);
      state.otherUser.following = state.otherUser?.following?.map((ele) => {
        if (action.payload.userId == ele.userId) {
          ele.userIsFollowing = "NOT_FOLLOWING";
        }
        return ele;
      });
      state.otherUser.followers = state.otherUser?.followers?.map((ele) => {
        if (action.payload.userId == ele.userId) {
          ele.userIsFollowing = "NOT_FOLLOWING";
        }
        return ele;
      });
    },
    removeFollowRequestSYNCFollowStatus: (state, action) => {
      state.PeopleYouMightKnow = state.PeopleYouMightKnow?.map((ele) => {
        if (ele._id == action.payload.userId) {
          ele.isUSERfollowingStatus = "NOT_FOLLOWING";
        }
        return ele;
      });
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPotentialPeopleToFollow.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPotentialPeopleToFollow.fulfilled, (state, action) => {
        state.status = "success";
        state.PeopleYouMightKnow = action.payload;
      })
      .addCase(fetchPotentialPeopleToFollow.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      });

    builder
      .addCase(postFollowRequest.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postFollowRequest.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(postFollowRequest.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      });

    builder
      .addCase(removeFollowRequest.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFollowRequest.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(removeFollowRequest.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      });

    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        const { userId } = ProvideData();
        state.status = "success";
        if (userId == action.payload?._id) {
          state.user = action.payload;
        } else {
          state.otherUser = action.payload;
          state.otherUser.following = state.otherUser.following.map(
            (userOtherUserIsFollowing) => {
              const find = state.PeopleYouMightKnow.find(
                (user) => user._id == userOtherUserIsFollowing.userId
              );
              if (find) {
                userOtherUserIsFollowing.userIsFollowing =
                  find.isUSERfollowingStatus;
              }
              return userOtherUserIsFollowing;
            }
          );
          // state.otherUser.followers=
          state.otherUser.followers = state.otherUser.followers.map(
            (userOtherUserFollower) => {
              const find = state.PeopleYouMightKnow.find(
                (user) => user._id == userOtherUserFollower.userId
              );
              if (find) {
                userOtherUserFollower.userIsFollowing =
                  find.isUSERfollowingStatus;
              }
              return userOtherUserFollower;
            }
          );
        }
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      });

    builder
      .addCase(acceptFollowRequest.pending, (state) => {
        state.status = "loading";
      })
      .addCase(acceptFollowRequest.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(acceptFollowRequest.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      });

    builder
      .addCase(fetchPotentialPeopleToFollowSearch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchPotentialPeopleToFollowSearch.fulfilled,
        (state, action) => {
          state.status = "success";
          state.PeopleYouMightKnow = action.payload;
        }
      )
      .addCase(fetchPotentialPeopleToFollowSearch.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      });

    builder
      .addCase(editUserDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editUserDetail.fulfilled, (state, action) => {
        state.status = "success";
        state.user = { ...state.user, ...action.payload };
      })
      .addCase(editUserDetail.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      });

    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "success";
        const { userId } = ProvideData();
        if (action.payload.userId == userId) {
          state.userPosts = [...action.payload.posts];
        } else {
          state.otherUserPosts = [...action.payload.posts];
        }
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      });

    builder
      .addCase(fetchBookMarks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBookMarks.fulfilled, (state, action) => {
        state.status = "success";
        const { userId } = ProvideData();
        if (action.payload.userId == userId) {
          state.userBookmarks = [...action.payload.posts];
        } else {
          state.otherUserBookmarks = [...action.payload.posts];
        }
      })
      .addCase(fetchBookMarks.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      });

    builder
      .addCase(unFollowUserWHomIAmFollowing.pending, (state) => {
        state.status = "loading";
      })
      .addCase(unFollowUserWHomIAmFollowing.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(unFollowUserWHomIAmFollowing.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      });

    builder
      .addCase(removeFollowerThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFollowerThunk.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(removeFollowerThunk.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      });
  },
});

export default UserSlice;

export const {
  followRequestSYNC,
  removeFollowRequestSYNC,
  editUserDetailSYNC,
  removeBookMarkSYNC,
  FollowReqSendOtherUserSYNC,
  RemoveFollowReqSendOtherUserSYNC,
  removeFollowRequestSYNCFollowStatus,
  postFollowRequestSYNCFollowStatus,
} = UserSlice.actions;
