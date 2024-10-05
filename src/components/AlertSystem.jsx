/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { Alert, Button } from "@material-tailwind/react";

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
  const [open, setOpen] = React.useState(true);
  useEffect(() => {
    setTimeout(() => {
      if (open) {
        setOpen(false);
      }
    }, 5000);
  }, []);
  return (
    <>
      <Alert
        color={color}
        className="fixed w-fit top-[10px] left-[10px]"
        variant="gradient"
        open={open}
        icon={<Icon />}
        action={
          <Button
            variant="text"
            color="white"
            size="sm"
            className="!absolute top-3 right-1"
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        }
      >
        <span className="pr-[20px]">{message}</span>
      </Alert>
    </>
  );
}
