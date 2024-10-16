import {
  Typography,
  Textarea,
  Button,
  Input,
  Checkbox,
  Avatar,
} from "@material-tailwind/react";
import LeftNavigationComp from "../components/LeftNavigationComp.jsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "../features/Alert/AlertSlice";
import UserPotentialFollowList from "../components/UserPotentialFollowList";
import { AddPostThunk } from "../features/Post/PostSlice";
function AddPost() {
  const dispatch = useDispatch();
  const { posts, status, error } = useSelector((state) => state.Post);
  const [images, setImages] = useState(4);
  const [alertSystem, setAlert] = useState(null);
  const [yesImages, setYesImages] = useState(true);
  const { user } = useSelector((state) => state.User);
  const initialData = {
    content: "",
    images: Array.from({ length: images }),
  };
  const [data, setData] = useState(initialData);
  const [length, setLength] = useState(initialData.content.length);

  useEffect(() => {
    setData((data) => ({
      ...data,
      images: Array.from({ length: images }).map(
        (ele, index) => data.images[index]
      ),
    }));
  }, [images]);

  const onSubmitHandler = async (e) => {
    const dataToSend = yesImages ? data : { content: data.content };
    e.preventDefault();
    setAlert(null);
    try {
      await dispatch(AddPostThunk(dataToSend));
      if (status == "success") {
        setData(initialData);
        dispatch(showAlert({ message: "Post Has been Made", color: "green" }));
        setLength(0);
      } else {
        setAlert("fail");
      }
    } catch (error) {
      setAlert("fail");
      console.log(error);
    }
  };

  return (
    <>
      <div className="pt-[100px] max-w-screen-2xl mx-auto flex gap-5 min-h-screen px-4">
        <div className="lg:w-[50%] xl:w-[20%]  h-[100px] hidden lg:block">
          <LeftNavigationComp />
          <div className="flex pl-[20%] items-center gap-4 my-[50px]  py-3 rounded-lg">
            <Avatar
              variant="rounded"
              withBorder={true}
              color="green"
              src={user.profileImage}
              className="p-0.5"
              size="lg"
              alt="avatar"
            />
            <div>
              <Typography variant="h4">{user.userName}</Typography>
              <Typography
                variant="large"
                color="gray"
                className="p-0.5 font-normal"
              >
                {user.name}
              </Typography>
            </div>
          </div>
          <div className="xl:hidden ">
            <UserPotentialFollowList />
          </div>
        </div>
        <div className="sm:w-[95%] text-center md:w-[80%]  mx-auto rounded-md  xl:w-[50%]  min-h-screen ">
          <Typography variant="h1" color="blue">
            Add Post
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Nice to meet you! Enter Post details.
          </Typography>
          <form
            onSubmit={onSubmitHandler}
            className="w-96 mt-8 mx-auto flex flex-col gap-5 mb-[100px]"
          >
            <div className="text-center">
              <Checkbox
                defaultChecked
                onClick={() => setYesImages((yesImages) => !yesImages)}
                label="Want Images"
              />
            </div>
            {yesImages && (
              <>
                <div className="flex justify-between items-center">
                  <Typography color="gray" className="mt-1 font-normal">
                    Maximum 5 Cherished Pictures
                  </Typography>
                  <Button
                    className="flex items-center gap-3"
                    color="green"
                    onClick={() =>
                      setImages((images) => (images < 5 ? images + 1 : images))
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                    Url
                  </Button>
                </div>
                <div className="flex flex-col gap-3">
                  {Array.from({ length: images }, (_, index) => index).map(
                    (val) => (
                      <div key={val} className="flex gap-4">
                        <Input
                          names="images"
                          label={`Enter ${val + 1} Image URL`}
                          className="items-stretch"
                          type="url"
                          required
                          value={
                            data.images[val] == undefined
                              ? ""
                              : data.images[val]
                          }
                          onChange={(e) =>
                            setData((data) => ({
                              ...data,
                              images: data.images.map((ele, index) =>
                                index == val ? e.target.value : ele
                              ),
                            }))
                          }
                        />
                        <Button
                          color="red"
                          onClick={() => {
                            setData((data) => ({
                              ...data,
                              images:
                                images > 1
                                  ? data.images.filter(
                                      (ele, index) => val != index
                                    )
                                  : data.images,
                            }));
                            setImages((images) =>
                              images > 1 ? images - 1 : images
                            );
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            // eslint-disable-next-line react/no-unknown-property
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="size-4"
                          >
                            <path
                              // eslint-disable-next-line react/no-unknown-property
                              stroke-linecap="round"
                              // eslint-disable-next-line react/no-unknown-property
                              stroke-linejoin="round"
                              d="M6 18 18 6M6 6l12 12"
                            />
                          </svg>
                        </Button>
                      </div>
                    )
                  )}
                </div>
              </>
            )}
            <Textarea
              onChange={(e) => {
                const trimmedInput = e.target.value.trimStart(); // Trim start only once
                const limited =
                  trimmedInput.length > 1000
                    ? trimmedInput.slice(0, 1000)
                    : trimmedInput;

                setData((prevData) => ({
                  ...prevData,
                  [e.target.name]: limited,
                }));

                setLength(limited.length);
              }}
              required
              name="content"
              label="Post Content"
              value={data.content}
              rows="10"
            />
            <p className="text-center">
              <span>{length}/1000</span>
            </p>
            <Button type="submit">Post</Button>
          </form>
        </div>
        <div className="hidden xl:block xl:w-[30%]  h-[100px] ">
          <UserPotentialFollowList />
        </div>
      </div>
    </>
  );
}

export default AddPost;
