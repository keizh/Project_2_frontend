import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import { useEffect } from "react";
import auth from "../utils/auth";
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
      <NavBar>{children}</NavBar>
    </>
  );
}

export default function App() {
  return (
    <div>
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
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </div>
  );
}
