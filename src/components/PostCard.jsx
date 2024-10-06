/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { FaHeart } from "react-icons/fa";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Carousel,
  Avatar,
  Button,
} from "@material-tailwind/react";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import ProvideData from "../utils/ProvideData";
import { useDispatch } from "react-redux";
import {
  addCommentThunk,
  removeCommentThunk,
  removeLikeThunk,
  addLikeThunk,
  AddLikes,
  RemoveLikes,
} from "../features/Post/PostSlice";
import {
  removeBookMarkThunk,
  addBookMarkThunk,
} from "../features/BookMark/BookMark";
import { useEffect } from "react";

function PostCard({ ele }) {
  const dispatch = useDispatch();
  const date = new Date(ele.createdAt);
  const [comment, setComment] = useState(false);
  const [liked, setLiked] = useState(false);
  const [commentData, setCommentData] = useState("");
  const [bookmarked, setBookmark] = useState(false);
  const { userName, userId, name } = ProvideData();

  const handlerCommentData = (e) => {
    const { value } = e.target;
    if (value.length <= 150) {
      setCommentData(value);
    }
  };

  const submitComment = async () => {
    console.log(`clicked`);
    await dispatch(addCommentThunk({ content: commentData, postId: ele._id }));
    setCommentData("");
  };

  // Extract day, month (in alphabet), and year
  const day = date.getDate(); // Day of the month (1-31)
  const month = date.toLocaleString("default", { month: "long" }); // Month name
  const year = date.getFullYear(); // Year

  // Extract the time as before (12-hour format)
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert to 12-hour format

  // Format time and date
  const formattedDate = `${day} ${month} ${year}`;
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} ${ampm}`;

  async function checking() {
    const response = await fetch(
      `http://localhost:5500/api/v1/post/isLikedOrNot`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem(`token`),
        },
        body: JSON.stringify({ postId: ele._id }),
      }
    );
    const dataRes = await response.json();
    if (dataRes.message) {
      setLiked(true);
    }
  }

  async function checkingBookmark() {
    const response = await fetch(
      `http://localhost:5500/api/v1/bookmark/checking`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem(`token`),
        },
        body: JSON.stringify({ postId: ele._id }),
      }
    );
    const dataRes = await response.json();
    if (dataRes.message) {
      setBookmark(true);
    }
  }

  useEffect(() => {
    checking();
    checkingBookmark();
  }, []);

  const handleLikeClick = async () => {
    if (liked) {
      // remove like & set false
      await dispatch(removeLikeThunk({ postId: ele._id }));
      dispatch(RemoveLikes({ postId: ele._id, userId }));
      setLiked(false);
    } else {
      // add like & set true
      await dispatch(addLikeThunk({ postId: ele._id }));
      dispatch(AddLikes({ postId: ele._id, userId }));
      setLiked(true);
    }
  };

  const handleBookmark = async () => {
    if (bookmarked) {
      // remove like & set false
      await dispatch(removeBookMarkThunk({ postId: ele._id }));

      setBookmark(false);
    } else {
      // add like & set true
      await dispatch(addBookMarkThunk({ postId: ele._id }));

      setBookmark(true);
    }
  };

  return (
    <Card className="w-[100%] h-fit relative">
      <CardHeader
        floated={false}
        className="shadow-none"
        style={{ borderRadius: 0 }}
      >
        <section className="mb-5 flex justify-between items-center">
          <div className="flex gap-5 items-center">
            <Avatar
              size="md"
              className=" h-[30px] w-[30px] sm:h-[50px] sm:w-[50px]"
              variant="circular"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
              alt="tania andrew"
            />
            <Typography variant="h5" color="blue-gray">
              {ele.userName}
            </Typography>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="w-[100px] bg-[#ffca28] h-[10px] rounded"></span>
            <span className="w-[75px] bg-[#4fc3f7] h-[10px] rounded"></span>
            <span className="w-[50px] bg-[#9c27b0] h-[10px] rounded hidden sm:block"></span>
          </div>
        </section>
        {ele.images.length > 0 && (
          <Carousel className="rounded-xl h-[60vh] max-h-[500px] bg-[#90a4ae]">
            {ele.images.map((ele, index) => (
              <img
                key={index}
                src={`${ele}`}
                alt="image"
                className="h-full w-full object-cover"
              />
            ))}
          </Carousel>
        )}
      </CardHeader>
      {ele.images.length == 0 && (
        <CardBody className="text-center my-[20px]">
          <Typography variant="leading" color="blue-gray">
            {ele.content}
          </Typography>
        </CardBody>
      )}
      <div
        className={`px-5 pt-2 flex justify-between ${
          ele.images.length == 0 && "mb-5"
        }`}
      >
        <Typography
          color="blue-gray"
          className="font-medium text-left text-[12px]  md:text-[16px]"
          textGradient
        >
          {formattedDate}
        </Typography>
        <Typography
          color="blue-gray"
          className="font-medium text-left text-[12px]  md:text-[16px] "
          textGradient
        >
          {formattedTime}
        </Typography>
      </div>
      {ele.images.length > 0 && (
        <div className="text-center my-3">
          <Typography variant="leading" color="blue-gray" className="">
            {ele.content}
          </Typography>
          {/* <p className="font-bold text-[16px] lg:text-[24px]">{ele.content}</p> */}
        </div>
      )}
      <CardFooter className="pt-[0px]">
        <div className="flex justify-between flex-col gap-4  ">
          <div className="  sm:w-[100%] flex items-center justify-between sm:gap-3">
            <Input
              value={commentData}
              onChange={handlerCommentData}
              variant="static"
              label="comments"
              className=""
            />
            <span>{commentData.length}/150</span>
            <Button
              color="green"
              onClick={submitComment}
              className="scale-[0.7] sm:scale-[1] "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                />
              </svg>
            </Button>
          </div>
          <div className="flex gap-2 sm:gap-4">
            {/* LIKE BUTTON */}
            <Button
              color="white"
              onClick={handleLikeClick}
              className="flex justify-center items-center gap-[10px] "
            >
              <span className="text-[19px]npm">{ele.likes.length}</span>
              <FaHeart
                color={liked ? "red" : "black"}
                className="text-[20px]"
              />
            </Button>
            {/* COMMMENT BUTTON */}
            <Button
              color="yellow"
              onClick={() => setComment((comment) => !comment)}
              className="flex-grow flex flex-row items-center justify-center  text-center  gap-[10px] "
            >
              <span className=" text-red-700 text-[14px]">
                {ele.comments.length}
              </span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                />
              </svg>

              <span className=" text-red-700 text-[14px]">Comments</span>
            </Button>
            {/* BookMark Button */}
            <Button
              color="white"
              className="flex justify-center items-center gap-[10px] "
              onClick={handleBookmark}
            >
              {bookmarked ? (
                <FaBookmark className="text-[20px]" />
              ) : (
                <FaRegBookmark className="text-[20px]" />
              )}
            </Button>
          </div>
        </div>
      </CardFooter>
      <AnimatePresence>
        {comment && (
          <motion.div
            variants={{
              close: {
                scale: 0,
                x: "-50%",
                opacity: 0,
                y: 100,
              },
              open: {
                scale: 1,
                x: "-50%",
                opacity: 1,
                y: 0,
              },
            }}
            animate="open"
            initial="close"
            exit="close"
            className={` border-4 p-2  h-[200px] w-[90%] backdrop-blur-xl  absolute  ${
              ele.images.length > 0 ? "bottom-[20%]" : "bottom-[40%]"
            }  z-[1000] left-[50%] translate-x-[-50%] rounded overflow-y-scroll scroller`}
          >
            {ele.comments.length > 0 &&
              ele.comments.map((commData, index) => (
                <div
                  key={index}
                  className="p-1 bg-white mb-2 rounded flex justify-between"
                >
                  <span>{commData.content}</span>
                  <div className="flex gap-1 items-center ">
                    {userId == commData.userId && (
                      <Button
                        color="green"
                        className=" p-2 hover:scale-[1.1] self-start rounded"
                        onClick={async () => {
                          var comm = commData.content;
                          await dispatch(
                            removeCommentThunk({
                              postId: ele._id,
                              commentId: commData.commentId,
                            })
                          );
                          setCommentData(comm);
                        }}
                        whileHover={{ scale: 1.1 }}
                      >
                        {" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                          />
                        </svg>
                      </Button>
                    )}
                    {(ele.userId == userId || userId == commData.userId) && (
                      <motion.button
                        className="bg-red-500 p-2 self-start rounded"
                        onClick={() =>
                          dispatch(
                            removeCommentThunk({
                              postId: ele._id,
                              commentId: commData.commentId,
                            })
                          )
                        }
                        whileHover={{ scale: 1.1 }}
                      >
                        {" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="black"
                          class="size-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </motion.button>
                    )}
                  </div>
                </div>
              ))}
            {ele.comments.length == 0 && (
              <span className="p-2 bg-white mb-2 rounded inline-block">
                No Comments Yet !
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

export default PostCard;
