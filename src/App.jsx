/* eslint-disable no-unused-vars */
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import AddPost from "./pages/AddPost";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import { useEffect, useState, useMemo } from "react";
import auth from "./utils/auth";
import { useNavigate } from "react-router-dom";
import AlertSystem from "./components/AlertSystem";
import FriendSearch from "./pages/FriendSearch";
import Profile from "./pages/Profile";
import { useDispatch } from "react-redux";
import fetchUserDetails from "./features/User/UserSlice";

function PageDefault() {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!auth()) {
      Navigate(`/signin`);
    }
  }, [Navigate]);

  useEffect(() => {}, []);

  return (
    <>
      <NavBar />
      <Outlet />
      <AlertSystem />
    </>
  );
}

function SSDefault({ children }) {
  return (
    <>
      {children}
      <AlertSystem />
    </>
  );
}

export default function App() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#eceff1]">
      <Routes>
        <Route
          path="/signup"
          element={
            <SSDefault>
              <SignUp />
            </SSDefault>
          }
        />
        <Route
          path="/signin"
          element={
            <SSDefault>
              <SignIn />
            </SSDefault>
          }
        />
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/" element={<PageDefault />}>
          <Route path="home" element={<Home />} />
          <Route path="addpost" element={<AddPost />} />
          <Route path="friends" element={<FriendSearch />} />
          <Route path="profile/:id" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}
