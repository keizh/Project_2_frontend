import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import AlertSystem from "../components/AlertSystem";
import { useEffect } from "react";
import auth from "../utils/auth";

export function SignIn() {
  const Navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);
  const intialdata = {
    email: "",
    password: "",
  };
  const [data, setData] = useState(intialdata);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((data) => ({ ...data, [name]: value.trim() }));
  };
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:5500/api/v1/user/sign-in`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const dataRes = await response.json();
      localStorage.setItem("token", dataRes.token);
      if (response.ok) {
        setLoading(true);
        setTimeout(() => {
          setData(intialdata);
          Navigate("/");
        }, 3000);
      } else {
        setError(dataRes.message);
      }
    } catch (err) {
      console.log(`error at sign-in`, err.message);
    }
  };

  useEffect(() => {
    if (auth() == true) {
      Navigate(`/`);
    }
  });

  return (
    <section className="grid text-center h-screen items-center p-8">
      <div>
        <Typography variant="h3" color="blue-gray" className="mb-2">
          Sign In
        </Typography>
        <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
          Enter your email and password to sign in
        </Typography>
        <form
          onSubmit={onSubmitHandler}
          className="mx-auto max-w-[24rem] text-left"
        >
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
              required
              onChange={onChangeHandler}
              name="password"
              id="password"
              size="lg"
              placeholder="********"
              labelProps={{
                className: "hidden",
              }}
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
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
          </div>
          {error && (
            <p className="text-[14px] text-center font-bold text-red-500">
              {error}
            </p>
          )}
          <Button
            type="submit"
            color={loading ? "green" : "gray"}
            size="lg"
            className="mt-6 flex justify-center"
            fullWidth
            loading={loading}
          >
            sign in
          </Button>
          <Typography
            variant="small"
            color="gray"
            className="!mt-4 text-center font-normal"
          >
            Not registered?{" "}
            <NavLink to="/signup" className="font-medium text-gray-900">
              Create account
            </NavLink>
          </Typography>
        </form>
      </div>
      {loading && <AlertSystem message="Successfull Signed In" color="green" />}
    </section>
  );
}

export default SignIn;
