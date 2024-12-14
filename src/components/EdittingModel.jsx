import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import { editUserDetail } from "../features/User/UserSlice";
export default function DialogDefault({ open, setOpen }) {
  const handleOpen = () => setOpen(!open);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.User);
  const [data, setData] = React.useState(null);
  useEffect(() => {
    setData({
      name: user?.name,
      userName: user?.userName,
      bio: user?.bio,
      profileImage: user?.profileImage,
    });
  }, [user]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((data) => ({ ...data, [name]: value }));
    console.log(value);
  };

  const onSubmit = async () => {
    await dispatch(editUserDetail(data));
    setOpen(!open);
  };

  return (
    <>
      <Dialog open={open} handler={handleOpen} className="!w-[300px]">
        <DialogHeader>Editting Information</DialogHeader>
        <DialogBody className="flex flex-col gap-4">
          <Input
            label="Name"
            value={data?.name}
            name="name"
            onChange={onChangeHandler}
          />
          <Input
            label="UserName"
            name="userName"
            value={data?.userName}
            onChange={onChangeHandler}
          />
          <Input
            label="ProfileImage"
            name="profileImage"
            value={data?.profileImage}
            onChange={onChangeHandler}
          />
          <Textarea
            label="Message"
            name="bio"
            value={data?.bio}
            onChange={onChangeHandler}
          />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={onSubmit}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
