import { useEffect } from "react";
import { fetchPostsThunk, filterPostSYNC } from "../features/Post/PostSlice";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "../components/PostCard.jsx";
import UserPotentialFollowList from "../components/UserPotentialFollowList.jsx";
import { fetchUserDetails } from "../features/User/UserSlice.js";
import ProvideData from "../utils/ProvideData.js";
import LeftNavigationComp from "../components/LeftNavigationComp.jsx";
import { Avatar, Typography } from "@material-tailwind/react";
import { Select, Option } from "@material-tailwind/react";

function Home() {
  const dispatch = useDispatch();
  const { userId } = ProvideData();
  const { posts, status } = useSelector((state) => state.Post);
  const { user } = useSelector((state) => state.User);
  const { userName, name } = ProvideData();
  const fetchPosts = async () => {
    try {
      await dispatch(fetchPostsThunk());
      await dispatch(fetchUserDetails({ id: userId }));
      console.log(`data`, posts);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchPosts();
    console.log(`posts`, posts);
  }, []);

  return (
    <div className="pt-[100px] max-w-screen-2xl mx-auto flex gap-5 min-h-screen px-4">
      <div className="lg:w-[50%] xl:w-[20%]  h-[100px] hidden lg:block">
        <LeftNavigationComp />
        <div className="flex pl-[20%] items-center gap-4 my-[50px]  py-3 rounded-lg">
          <Avatar
            variant="rounded"
            withBorder={true}
            color="green"
            src={user?.profileImage}
            className="p-0.5"
            size="lg"
            alt="avatar"
          />
          <div>
            <Typography variant="h4">{userName}</Typography>
            <Typography
              variant="large"
              color="gray"
              className="p-0.5 font-normal"
            >
              {name}
            </Typography>
          </div>
        </div>
        <div className="xl:hidden ">
          <UserPotentialFollowList />
        </div>
      </div>
      <div className="sm:w-[95%] md:w-[80%]  mx-auto rounded-md  xl:w-[50%]  min-h-screen ">
        <div className=" ml-auto w-[200px] mb-5">
          <Select
            onChange={(val) => dispatch(filterPostSYNC(val))}
            variant="outlined"
            className="bg-white"
            label="Filtering"
          >
            <Option value="Rated">Top Rated</Option>
            <Option value="Date">Date</Option>
          </Select>
        </div>
        {posts?.length == 0 && status == "loading" && (
          <p className="text-center">loading</p>
        )}
        {posts?.length == 0 && status != "loading" && (
          <p className="text-center">No Friend of your has posted any Post</p>
        )}
        {posts?.length > 0 && (
          <div className="flex flex-col gap-5">
            {posts.map((ele, index) => (
              <PostCard
                ele={ele}
                key={ele._id}
                showBookmarkOptionOnlyInProfilePostsSections={true}
              />
            ))}
          </div>
        )}
      </div>
      <div className="hidden xl:block xl:w-[30%]  h-[100px] ">
        <UserPotentialFollowList />
      </div>
    </div>
  );
}

export default Home;
