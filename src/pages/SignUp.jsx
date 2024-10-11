import { useEffect, useState } from "react";
import { z } from "zod";
import { Typography, Input, Button, Alert } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { NavLink, useNavigate } from "react-router-dom";
import AlertSystem from "../components/AlertSystem";
import { showAlert, hideAlert } from "../features/Alert/AlertSlice";
import { useDispatch } from "react-redux";
function IconOutlined() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="h-4 w-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
      />
    </svg>
  );
}
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
const signUpData = z.object({
  name: z.string().trim(),
  userName: z.string().trim(),
  email: z.string().trim().email({ message: "Invalid email address" }),
  password: z
    .string()
    .trim()
    .min(5, { message: "Must be 5 or more characters long password" })
    .max(20, { message: "Must be 20 or fewer characters long password" })
    .refine((val) => /[a-z]/.test(val), {
      message: "Must include at least one lowercase letter",
    })
    .refine((val) => /[A-Z]/.test(val), {
      message: "Must include at least one uppercase letter",
    })
    .refine((val) => /[0-9]/.test(val), {
      message: "Must include at least one number",
    })
    .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
      message: "Must include at least one special character",
    }),
});

export function SignUp() {
  //   console.log(`-->`, URL);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const initialData = {
    name: "",
    userName: "",
    email: "",
    password: "",
  };
  const initialDataErr = {
    name: [],
    username: [],
    email: [],
    password: [],
  };
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(initialDataErr);
  const [duplicateErr, setDuplicateErr] = useState(null);
  console.log(error);
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setError(initialDataErr);
    const result = signUpData.safeParse(data);
    if (result.success) {
      try {
        const response = await fetch(
          `http://localhost:5500/api/v1/user/sign-up`,
          {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const dataRes = await response.json();
        if (response.ok) {
          setDuplicateErr(null);
          // setLoading(true);
          dispatch(
            showAlert({ message: "Successfully Signed Up", color: "green" })
          );
          setTimeout(() => {
            setData(initialData);
            setError(initialDataErr);
            Navigate("/signin");
          }, 2000);
        } else {
          console.log(dataRes);
          console.log(`----`);
          setDuplicateErr(dataRes.message);
        }
      } catch (error) {
        console.log(`error durning sign-up`, error.message);
      }
    } else {
      result.error.issues.map((ele) =>
        setError((error) => ({
          ...error,
          [ele.path[0]]: [...error[`${ele.path[0]}`], ele.message],
        }))
      );
    }
  };

  useEffect(() => {
    dispatch(showAlert({ message: "tiger", color: "green" }));
    dispatch(showAlert({ message: "tiger Signed Up", color: "green" }));
    dispatch(showAlert({ message: "tiger Signed Up", color: "green" }));
    dispatch(showAlert({ message: "tiger Signed Up", color: "green" }));
    dispatch(showAlert({ message: "tiger Signed Up", color: "green" }));
  });

  return (
    <section className="grid text-center h-min-screen items-center p-8 relative bg-white">
      <div>
        <Typography className="mb-2" variant="h3" color="blue" textGradient>
          HASHTAG <span className="text-purple-500">#</span>
        </Typography>
        <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
          Create new account
        </Typography>
        <form
          onSubmit={onSubmitHandler}
          className="mx-auto max-w-[24rem] text-left"
        >
          {/* NAME DIV  */}
          <div className="mb-6">
            <label htmlFor="name">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Your Name
              </Typography>
            </label>
            <Input
              required
              onChange={onChangeHandler}
              id="name"
              color="gray"
              size="lg"
              type="text"
              name="name"
              placeholder="Alia"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              labelProps={{
                className: "hidden",
              }}
            />
          </div>
          {/* USERNAME DIV */}
          <div className="mb-6">
            <label htmlFor="username">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Your UserName
              </Typography>
            </label>
            <Input
              required
              onChange={onChangeHandler}
              id="userName"
              color="gray"
              size="lg"
              name="userName"
              placeholder="Angel"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              labelProps={{
                className: "hidden",
              }}
            />
          </div>
          {/* EMAIL DIV */}
          <div className="mb-6">
            <label htmlFor="email">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Your Email
              </Typography>
            </label>
            <Input
              required
              onChange={onChangeHandler}
              id="email"
              color="gray"
              size="lg"
              type="email"
              name="email"
              placeholder="name@mail.com"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              labelProps={{
                className: "hidden",
              }}
            />
          </div>
          {/* PASSWORD DIV */}
          <div className="mb-6">
            <label htmlFor="password">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Password
              </Typography>
            </label>
            <Input
              error={error.password.length > 0}
              required
              onChange={onChangeHandler}
              id="password"
              name="password"
              size="lg"
              placeholder="********"
              labelProps={{
                className: "hidden",
              }}
              className="w-full placeholder:opacity-100 focus:border-primary border-t-blue-gray-200"
              type={passwordShown ? "text" : "password"}
              icon={
                <i onClick={togglePasswordVisiblity}>
                  {passwordShown ? (
                    <EyeIcon className="h-5 w-5" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5" />
                  )}
                </i>
              }
            />
            {error.password.length > 0 && (
              <p className="text-[10px] text-red-500 mt-2">
                Requirements not Met
              </p>
            )}
            <Alert
              className="mt-2 text-[10px]"
              variant="gradient"
              icon={<IconOutlined />}
            >
              <Typography className="text-[10px]">
                Ensure that these requirements are met for secure password:
              </Typography>
              <ul className="mt-2 ml-2 list-inside list-disc">
                <li>At Min 5 character</li>
                <li>At Max 20 character</li>
                <li>At least one digit</li>
                <li>At least one lowercase character</li>
                <li>At least one uppercase character</li>
                <li>
                  Inclusion of at least one special character, e.g., ! @ # ?
                </li>
              </ul>
            </Alert>
          </div>
          {duplicateErr && (
            <p className="text-[14px] text-center font-bold text-red-500">
              {duplicateErr}
            </p>
          )}
          <Button
            type="submit"
            color={loading ? "green" : "gray"}
            size="lg"
            className="mt-6 flex items-center justify-center"
            fullWidth
            loading={loading}
          >
            sign up
          </Button>

          <Typography
            variant="small"
            color="gray"
            className="!mt-4 text-center font-normal"
          >
            Registered ?{" "}
            <NavLink to="/signin" className="font-medium text-gray-900">
              Sign in
            </NavLink>
          </Typography>
        </form>
      </div>
      {/* {true && (
        <AlertSystem message="Account Created Successfully" color="green" />
      )} */}
    </section>
  );
}

export default SignUp;
