import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserPotentialFollowList from "../components/UserPotentialFollowList";
import { Avatar, Typography, Button } from "@material-tailwind/react";
import {
  fetchUserDetails,
  fetchPosts,
  fetchBookMarks,
} from "../features/User/UserSlice";
import PostCard from "../components/PostCard.jsx";
import { useParams } from "react-router-dom";
import ProvideData from "../utils/ProvideData";
import EdittingModal from "../components/EdittingModel";
import FramerMotionComp from "../components/FramerMotionComp.jsx";

function Profile() {
  const {
    otherUser,
    user,
    userPosts,
    otherUserPosts,
    otherUserBookmarks,
    userBookmarks,
  } = useSelector((state) => state.User);
  const dispatch = useDispatch();
  const [choose, setChoose] = useState("Posts");
  const { id } = useParams();
  const { userId } = ProvideData();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchUserDetails({ id }));
      await dispatch(fetchPosts({ id }));
      await dispatch(fetchBookMarks({ id }));
    };
    fetchData();
  }, [id, userId, dispatch]);
  return (
    <div className="pt-[100px] max-w-screen-2xl mx-auto flex gap-5 min-h-screen">
      <div className="lg:w-[50%] xl:w-[20%] h-[100px] hidden lg:block">
        <div className="h-[50vh] bg-red-100"></div>
        <div className="xl:hidden ">
          <UserPotentialFollowList />
        </div>
      </div>
      <div className="sm:w-[95%] md:w-[80%] mx-auto rounded-md xl:w-[50%] min-h-screen ">
        <section>
          <div className="flex flex-col gap-3 items-center ">
            <Avatar
              src={id !== userId ? otherUser?.profileImage : user?.profileImage}
              alt="avatar"
              size="xxl"
            />

            <Typography variant="h4">
              {id !== userId ? otherUser?.userName : user?.userName}
            </Typography>

            <Typography variant="h6" className="mb-4">
              @{id !== userId ? otherUser?.name : user?.name}
            </Typography>

            <Typography
              variant="lead"
              className="text-center w-[300px] bg-white p-2 rounded-md"
            >
              @{id !== userId ? otherUser?.bio : user?.bio}
            </Typography>
            {id === userId && (
              <Button onClick={() => setOpen(true)}>EDIT</Button>
            )}
            {open && <EdittingModal open={open} setOpen={setOpen} />}
          </div>
        </section>
        <section className="flex items-center justify-center">
          <FramerMotionComp setChoose={setChoose} />
        </section>
        <section className="grid grid-cols-2 lg:grid-cols-4 my-5 justify-between flex-wrap px-2 gap-4 ">
          <div className="flex flex-col items-center">
            <Typography variant="h6">POST's</Typography>
            <p className="text-center">{userPosts?.length}</p>
          </div>
          <div className="flex flex-col items-center">
            <Typography variant="h6">BOOKMARK's</Typography>
            <p className="text-center">{userBookmarks?.length}</p>
          </div>
          <div className="flex flex-col items-center">
            <Typography variant="h6">FOLLOWER's</Typography>
            <p className="text-center">{user?.followers?.length}</p>
          </div>
          <div className="flex flex-col items-center">
            <Typography variant="h6">Following</Typography>
            <p className="text-center">{user?.following?.length}</p>
          </div>
        </section>

        {choose === "Following" && (
          <>
            {id != userId ? (
              otherUser?.following.length == 0 ? (
                <p className="text-center">You are not Following anyone</p>
              ) : (
                <div className="flex flex-col gap-2">
                  {otherUser?.following.map((person, index) => (
                    <div
                      className="rounded-xl flex items-center gap-4 p-2 bg-white"
                      key={index}
                    >
                      <Avatar src={`${person.profileImage}`} alt="avatar" />
                      <div>
                        <Typography variant="h6">{person.userName}</Typography>
                        <Typography
                          variant="small"
                          color="gray"
                          className="font-normal"
                        >
                          {person.name}
                        </Typography>
                      </div>
                      {person.userId == userId ? (
                        <Button className="ml-auto">SELF</Button>
                      ) : person.userIsFollowing ? (
                        <Button color="red" className="ml-auto">
                          UNFOLLOW
                        </Button>
                      ) : (
                        <Button color="green" className="ml-auto">
                          FOLLOW
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              )
            ) : user?.following.length == 0 ? (
              <p className="text-center">You are not Following anyone</p>
            ) : (
              <div className="flex flex-col gap-2">
                {user?.following.map((person, index) => (
                  <div
                    className="rounded-xl flex items-center gap-4 p-2 bg-white"
                    key={index}
                  >
                    <Avatar src={`${person.profileImage}`} alt="avatar" />
                    <div>
                      <Typography variant="h6">{person.userName}</Typography>
                      <Typography
                        variant="small"
                        color="gray"
                        className="font-normal"
                      >
                        {person.name}
                      </Typography>
                    </div>
                    <Button color="red" className="ml-auto">
                      UNFOLLOW
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
        {choose === "Followers" && (
          <>
            {id != userId ? (
              otherUser?.followers.length == 0 ? (
                <p className="text-center">No One Is Following You</p>
              ) : (
                <div className="flex flex-col gap-2">
                  {otherUser?.followers.map((person, index) => (
                    <div
                      className="rounded-xl flex items-center gap-4 p-2 bg-white"
                      key={index}
                    >
                      <Avatar src={`${person.profileImage}`} alt="avatar" />
                      <div>
                        <Typography variant="h6">{person.userName}</Typography>
                        <Typography
                          variant="small"
                          color="gray"
                          className="font-normal"
                        >
                          {person.name}
                        </Typography>
                      </div>
                      {person.userId == userId ? (
                        <Button className="ml-auto">SELF</Button>
                      ) : person.userIsFollowing ? (
                        <Button color="red" className="ml-auto">
                          UNFOLLOW
                        </Button>
                      ) : (
                        <Button color="green" className="ml-auto">
                          FOLLOW
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              )
            ) : user?.followers.length == 0 ? (
              <p className="text-center">No One is Following You</p>
            ) : (
              <div className="flex flex-col gap-2">
                {user?.followers.map((person, index) => (
                  <div
                    className="rounded-xl flex items-center gap-4 p-2 bg-white"
                    key={index}
                  >
                    <Avatar src={`${person.profileImage}`} alt="avatar" />
                    <div>
                      <Typography variant="h6">{person.userName}</Typography>
                      <Typography
                        variant="small"
                        color="gray"
                        className="font-normal"
                      >
                        {person.name}
                      </Typography>
                    </div>
                    <Button color="red" className="ml-auto">
                      REMOVE
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {choose == "Bookmarks" && (
          <>
            {userId == id ? (
              userBookmarks?.length == 0 ? (
                <p className="text-center">You Dont Have Bookmarks</p>
              ) : (
                <div className="flex flex-col gap-4">
                  {userBookmarks.map((ele, index) => (
                    <PostCard key={index} ele={ele} />
                  ))}
                </div>
              )
            ) : otherUserBookmarks?.length == 0 ? (
              <p className="text-center">You Dont Have Bookmarks</p>
            ) : (
              <div className="flex flex-col gap-4">
                {otherUserBookmarks.map((ele, index) => (
                  <PostCard key={index} ele={ele} />
                ))}
              </div>
            )}
          </>
        )}
        {choose == "Posts" && (
          <>
            {userId == id ? (
              userPosts?.length == 0 ? (
                <p className="text-center">No Posts</p>
              ) : (
                <div className="flex flex-col gap-4">
                  {userPosts.map((ele, index) => (
                    <PostCard key={index} ele={ele} />
                  ))}
                </div>
              )
            ) : otherUserPosts?.length == 0 ? (
              <p className="text-center">No Posts</p>
            ) : (
              <div className="flex flex-col gap-4">
                {otherUserPosts.map((ele, index) => (
                  <PostCard key={index} ele={ele} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
      <div className="hidden xl:block xl:w-[30%] h-[100px]">
        <UserPotentialFollowList />
      </div>
    </div>
  );
}

export default Profile;
