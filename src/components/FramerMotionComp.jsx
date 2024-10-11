import { useState } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
export const App = ({ setChoose }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="grid place-items-center my-5">
      <ul className="bg-black text-white rounded-xl flex gap-3 px-3 py-2">
        <li
          className="relative px-2 py-1"
          onClick={() => {
            setActiveIndex(0);
            setChoose("Posts");
          }}
        >
          {activeIndex === 0 && (
            <motion.span
              layoutId="indicator"
              className="bg-red-400 block absolute inset-0 rounded-full"
            />
          )}
          <NavLink className="relative z-10">Posts</NavLink>
        </li>
        <li
          className="relative px-2 py-1"
          onClick={() => {
            setActiveIndex(1);
            setChoose("Bookmarks");
          }}
        >
          {activeIndex === 1 && (
            <motion.span
              layoutId="indicator"
              className="bg-red-400 block absolute inset-0 rounded-full"
            />
          )}
          <NavLink className="relative z-10">Bookmarks</NavLink>
        </li>
        <li
          className="relative px-2 py-1"
          onClick={() => {
            setActiveIndex(2);
            setChoose("Followers");
          }}
        >
          {activeIndex === 2 && (
            <motion.span
              layoutId="indicator"
              className="bg-red-400 block absolute inset-0 rounded-full"
            />
          )}
          <NavLink className="relative z-10">Followers</NavLink>
        </li>
        <li
          className="relative px-2 py-1"
          onClick={() => {
            setActiveIndex(3);
            setChoose("Following");
          }}
        >
          {activeIndex === 3 && (
            <motion.span
              layoutId="indicator"
              className="bg-red-400 block absolute inset-0 rounded-full"
            />
          )}
          <NavLink className={`relative  z-10`}>Following</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default App;
