import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import AddPost from "./pages/AddPost";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import { useEffect, useState } from "react";
import auth from "./utils/auth";
import { useNavigate } from "react-router-dom";
import AlertSystem from "./components/AlertSystem";
import FriendSearch from "./pages/FriendSearch";
import Profile from "./pages/Profile";
import { useDispatch } from "react-redux";
import fetchUserDetails from "./features/User/UserSlice";

function PageDefault({ children }) {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!auth()) {
      Navigate(`/signin`);
    }
  }, [Navigate]);

  if (!auth()) {
    Navigate("/signin");
  }

  return (
    <>
      <NavBar />
      {children}
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
          path="/"
          element={
            <PageDefault>
              <Home />
              {/* <AddPost /> */}
            </PageDefault>
          }
        />
        <Route
          path="/addpost"
          element={
            <PageDefault>
              <AddPost />
            </PageDefault>
          }
        />
        <Route
          path="/friends"
          element={
            <PageDefault>
              <FriendSearch />
            </PageDefault>
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
        <Route
          path="/profile/:id"
          element={
            <PageDefault>
              <Profile />
            </PageDefault>
          }
        />
      </Routes>
    </div>
  );
}
