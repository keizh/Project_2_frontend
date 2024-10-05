import { useEffect } from "react";
import auth from "../utils/auth";
import { useNavigate } from "react-router-dom";

function Home() {
  const Navigate = useNavigate();
  useEffect(() => {
    if (auth() == true) {
      Navigate(`/`);
    } else {
      Navigate(`/signin`);
    }
  }, [Navigate]);
  return <div>hello</div>;
}

export default Home;
