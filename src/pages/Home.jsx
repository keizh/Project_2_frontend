import { useEffect } from "react";
import { fetchPostsThunk } from "../features/Post/PostSlice";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "../components/PostCard.jsx";

function Home() {
  const dispatch = useDispatch();
  const { posts, status, error } = useSelector((state) => state.Post);
  const fetchPosts = async () => {
    try {
      await dispatch(fetchPostsThunk());
      console.log(`data`, posts);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <div className="pt-[100px] max-w-screen-2xl mx-auto flex gap-5 min-h-screen">
      <div className="lg:w-[25%] bg-red-100 h-[100px] max-lg:block"></div>
      <div className=" w-[90%]  mx-auto rounded-md  lg:w-[50%]  min-h-screen ">
        {posts.length == 0 && status == "loading" && <p>loading</p>}
        {posts.length == 0 && status != "loading" && <p>No Posts to display</p>}
        {posts.length > 0 && (
          <div className="flex flex-col gap-5">
            {posts.map((ele, index) => (
              <PostCard ele={ele} key={index} />
            ))}
          </div>
        )}
      </div>
      <div className="lg:w-[25%] bg-red-100 h-[100px] max-lg:block "></div>
    </div>
  );
}

export default Home;
