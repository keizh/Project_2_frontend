/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { Alert, Button } from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import { hideAlert } from "../features/Alert/AlertSlice";
function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function AlertSystem({ message, color }) {
  // const [open, setOpen] = React.useState(true);
  const state = useSelector((state) => state.Alert);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   setTimeout(() => {
  //     if (open) {
  //       setOpen(false);
  //     }
  //   }, 10000);
  // }, []);
  useEffect(() => {
    state.forEach((ele) => {
      const timer = setTimeout(() => {
        dispatch(hideAlert({ id: ele.id }));
      }, 3500);
      console.log(ele.message);
      return () => clearTimeout(timer);
    });
  }, [state, dispatch]);
  return (
    <>
      {state.map((alert, index) => (
        <Alert
          key={alert.id}
          color={alert.color}
          className={`fixed w-fit left-[10px] z-[3000]`}
          style={{ top: `${10 + index * 60}px` }}
          variant="gradient"
          open={true}
          icon={<Icon />}
          action={
            <Button
              variant="text"
              color="white"
              size="sm"
              className="!absolute top-3 right-1"
              onClick={() => dispatch(hideAlert({ id: alert.id }))}
            >
              close
            </Button>
          }
        >
          <span className="px-[20px]">{alert.message}</span>
        </Alert>
      ))}
    </>
  );
}
