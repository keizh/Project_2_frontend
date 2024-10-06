import { jwtDecode } from "jwt-decode";

export default function ProvideData() {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }

  const decoded = jwtDecode(token);
  return {
    userName: decoded.userName,
    userId: decoded.userId,
    name: decoded.name,
  };
}
