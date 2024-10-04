import { jwtDecode } from "jwt-decode";

const auth = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  try {
    const decoded = jwtDecode(token);
    if (decoded.exp < Date.now() / 1000) {
      return false;
    } else {
      return true;
    }
  } catch (err) {
    console.log(err.message);
    return false;
  }
};

export default auth;
