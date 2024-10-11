import { useEffect } from "react";
import { fetchPostsThunk } from "../features/Post/PostSlice";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "../components/PostCard.jsx";
import UserPotentialFollowList from "../components/UserPotentialFollowList.jsx";
import { fetchUserDetails } from "../features/User/UserSlice.js";
import ProvideData from "../utils/ProvideData.js";
function Home() {
  const dispatch = useDispatch();
  const { userId } = ProvideData();
  const { posts, status } = useSelector((state) => state.Post);
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
        <div className="h-[50vh] bg-red-100"></div>
        <div className="xl:hidden ">
          <UserPotentialFollowList />
        </div>
      </div>
      <div className="sm:w-[95%] md:w-[80%]  mx-auto rounded-md  xl:w-[50%]  min-h-screen ">
        {posts?.length == 0 && status == "loading" && (
          <p className="text-center">loading</p>
        )}
        {posts?.length == 0 && status != "loading" && (
          <p className="text-center">No Friend of your has posted any Post</p>
        )}
        {posts?.length > 0 && (
          <div className="flex flex-col gap-5">
            {posts.map((ele, index) => (
              <PostCard ele={ele} key={index} />
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
