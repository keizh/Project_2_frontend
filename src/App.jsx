import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import AddPost from "./pages/AddPost";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import { useEffect } from "react";
import auth from "./utils/auth";
import { useNavigate } from "react-router-dom";

function PageDefault({ children }) {
  const Navigate = useNavigate();
  useEffect(() => {
    if (auth() == true) {
      Navigate(`/`);
    } else {
      Navigate(`/signin`);
    }
  }, [Navigate]);
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}

export default function App() {
  return (
    <div className="bg-[#eceff1]">
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/"
          element={
            <PageDefault>
              <Home />
            </PageDefault>
          }
        />
        <Route
          path="/addPost"
          element={
            <PageDefault>
              <AddPost />
            </PageDefault>
          }
        />
        {/* <Route
          path="/profile/:id"
          element={
            <PageDefault>
              <Profile />
            </PageDefault>
          }
        /> */}
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </div>
  );
}
