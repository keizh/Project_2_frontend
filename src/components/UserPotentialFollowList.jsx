import React, { useEffect, useState } from "react";
import { Avatar, Input, Typography, Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPotentialPeopleToFollow,
  fetchPotentialPeopleToFollowSearch,
} from "../features/User/UserSlice";
import AvatarComp from "../components/AvatarComp";
import { useNavigate } from "react-router-dom";
function UserPotentialFollowList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [friends, setFriends] = useState([]);
  const [search, setSearch] = useState("");

  const { PeopleYouMightKnow, status, error } = useSelector(
    (state) => state.User
  );

  useEffect(() => {
    const fetch = async () => {
      await dispatch(fetchPotentialPeopleToFollow());
      console.log(`output`, PeopleYouMightKnow);
    };
    fetch();
    setFriends(PeopleYouMightKnow);
  }, []);

  useEffect(() => {
    const timer =
      search == ""
        ? setTimeout(
            async () => await dispatch(fetchPotentialPeopleToFollow()),
            500
          )
        : setTimeout(
            async () =>
              await dispatch(fetchPotentialPeopleToFollowSearch({ search })),
            500
          );
    () => clearTimeout(timer);
  }, [search, dispatch]);

  return (
    <div className="w-full h-[fit] overflow-x-hidden  block">
      <Typography variant="h4" className="mb-4 text-center">
        You Might Know
      </Typography>
      <div></div>
      <Input
        className=""
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        label="Username / Name"
      />
      <div className="mt-4 overflow-y-auto h-[50vh] scroller">
        {status == "loading" && PeopleYouMightKnow?.length == 0 && (
          <p>Loading</p>
        )}
        {PeopleYouMightKnow?.length == 0 && (
          <Typography variant="leading" className="mb-4 text-center">
            No Mutual Users
          </Typography>
        )}
        {PeopleYouMightKnow?.length > 0 && (
          <div className="flex flex-col gap-4">
            {PeopleYouMightKnow.map((person, index) => (
              <AvatarComp key={index} person={person} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserPotentialFollowList;
