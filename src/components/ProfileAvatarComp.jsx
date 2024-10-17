/* eslint-disable react/prop-types */
import { Avatar, Typography, Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import ProvideData from "../utils/ProvideData";
import {
  postFollowRequest,
  removeFollowRequest,
  unFollowUserWHomIAmFollowing,
  removeFollowerThunk,
  FollowReqSendOtherUserSYNC,
  RemoveFollowReqSendOtherUserSYNC,
  postFollowRequestSYNCFollowStatus,
  removeFollowRequestSYNCFollowStatus,
} from "../features/User/UserSlice";
import { useParams } from "react-router-dom";
// ArrayType : following , followers
const ProfileAvatarComp = ({ person, self, ArrayType }) => {
  const { userId } = ProvideData();
  const { status } = useSelector((state) => state.User);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [isUserFollowing, setIsUserFollowing] = useState(
    person?.userIsFollowing
  );
  const { id } = useParams();

  const unfollow_UserPerspective = async (userId) => {
    await dispatch(unFollowUserWHomIAmFollowing({ userId }));
  };

  const Remove_follower_UserPerspective = async (userId) => {
    await dispatch(removeFollowerThunk({ userId }));
  };

  const follow_UserPerspective = async (userId) => {
    console.log(`pressed follow button`);
    setLoader(true);
    console.log(id);
    await dispatch(postFollowRequest({ userId, UserProfilePageId: id }));
    if (status == "success") {
      setIsUserFollowing("REQ_SENT");
      dispatch(FollowReqSendOtherUserSYNC({ userId: userId }));
      dispatch(postFollowRequestSYNCFollowStatus({ userId: userId }));
    }
    setLoader(false);
  };

  const Cancel_Follow_Req_UserPerspective = async (userIdOfReciever) => {
    setLoader(true);
    await dispatch(
      removeFollowRequest({ userId1: userId, userId2: userIdOfReciever })
    );
    if (status == "success") {
      setIsUserFollowing("NOT_FOLLOWING");
      dispatch(RemoveFollowReqSendOtherUserSYNC({ userId: userIdOfReciever }));
      dispatch(
        removeFollowRequestSYNCFollowStatus({ userId: userIdOfReciever })
      );
    }
    setLoader(false);
  };

  //  FOR the user who has logined at the moment , self is true
  //  self is false for all other user's

  return !self ? (
    <div className="rounded-xl flex items-center gap-4 p-2 bg-white">
      <Avatar src={`${person?.profileImage}`} alt="avatar" />
      <div>
        <Typography variant="h6">{person?.userName}</Typography>
        <Typography variant="small" color="gray" className="font-normal">
          {person?.name}
        </Typography>
      </div>
      {person?.userId == userId ? (
        <Button className="ml-auto">SELF</Button>
      ) : isUserFollowing == "FOLLOWING" ? (
        <Button
          loading={loader}
          onClick={() => unfollow_UserPerspective(person.userId)}
          color="red"
          className="ml-auto"
        >
          UNFOLLOW
        </Button>
      ) : isUserFollowing == "REQ_SENT" ? (
        <Button
          loading={loader}
          onClick={() => Cancel_Follow_Req_UserPerspective(person.userId)}
          className="ml-auto"
        >
          CANCEL REQUEST
        </Button>
      ) : (
        <Button
          loading={loader}
          onClick={() => follow_UserPerspective(person.userId)}
          color="green"
          className="ml-auto"
        >
          FOLLOW
        </Button>
      )}
    </div>
  ) : (
    <div className="rounded-xl flex items-center gap-4 p-2 bg-white">
      <Avatar src={`${person?.profileImage}`} alt="avatar" />
      <div>
        <Typography variant="h6">{person?.userName}</Typography>
        <Typography variant="small" color="gray" className="font-normal">
          {person?.name}
        </Typography>
      </div>
      {ArrayType == "followers" ? (
        <Button
          loading={loader}
          onClick={() => Remove_follower_UserPerspective(person.userId)}
          color="red"
          className="ml-auto"
        >
          REMOVE
        </Button>
      ) : (
        <Button
          loading={loader}
          onClick={() => unfollow_UserPerspective(person.userId)}
          color="red"
          className="ml-auto"
        >
          UNFOLLOW
        </Button>
      )}
    </div>
  );
};

export default ProfileAvatarComp;
