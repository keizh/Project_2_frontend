/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Avatar, Input, Typography, Button } from "@material-tailwind/react";
import AlertSystem from "../components/AlertSystem";
import { showAlert, hideAlert } from "../features/Alert/AlertSlice";
import {
  postFollowRequest,
  removeFollowRequest,
  postFollowRequestSYNCFollowStatus,
  FollowReqSendOtherUserSYNC,
  removeFollowRequestSYNCFollowStatus,
  RemoveFollowReqSendOtherUserSYNC,
} from "../features/User/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import ProvideData from "../utils/ProvideData";
function AvatarComp({ person }) {
  const { userId } = ProvideData();
  const dispatch = useDispatch();
  const [followRequest, setFollowRequest] = useState(
    person.isUSERfollowingStatus
  );
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.User);

  const handlerRequestSent = async () => {
    setLoading(true);
    await dispatch(
      postFollowRequest({
        userId: person._id,
        profileImageOfSender: user.profileImage,
        profileImageOfReciever: person.profileImage,
      })
    );
    setFollowRequest("REQ_SENT");
    setLoading(false);
    dispatch(postFollowRequestSYNCFollowStatus({ userId: person._id }));
    dispatch(FollowReqSendOtherUserSYNC({ userId: person._id }));
    dispatch(showAlert({ message: "Follow Request Sent", color: "green" }));
  };
  const handlerCancelRequest = async () => {
    setLoading(true);
    await dispatch(
      removeFollowRequest({ userId2: person._id, userId1: userId })
    );
    setFollowRequest("NOT_FOLLOWING");
    setLoading(false);
    dispatch(removeFollowRequestSYNCFollowStatus({ userId: person._id }));
    dispatch(RemoveFollowReqSendOtherUserSYNC({ userId: person._id }));
    dispatch(showAlert({ message: "Cancelled Follow Request", color: "red" }));
  };

  return (
    <>
      <div className="rounded-xl flex items-center gap-4 p-2 bg-white">
        <Avatar src={`${person.profileImage}`} alt="avatar" />
        <div>
          <Typography variant="h6">{person.userName}</Typography>
          <Typography variant="small" color="gray" className="font-normal">
            {person.name}
          </Typography>
        </div>
        {loading == true ? (
          <Button loading={loading} className="ml-auto"></Button>
        ) : followRequest == "REQ_SENT" ? (
          <Button onClick={handlerCancelRequest} className="ml-auto">
            Cancel Request
          </Button>
        ) : (
          <Button onClick={handlerRequestSent} className="ml-auto" color="red">
            follow
          </Button>
        )}
      </div>
    </>
  );
}

export default AvatarComp;
