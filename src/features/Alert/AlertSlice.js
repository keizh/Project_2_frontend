import { createSlice } from "@reduxjs/toolkit";
import uniqid from "uniqid";
const AlertSlice = createSlice({
  name: "UserSlice",
  initialState: [],
  reducers: {
    showAlert: (state, action) => {
      return [
        ...state,
        {
          message: action.payload.message,
          color: action.payload.color,
          id: uniqid(),
        },
      ];
    },
    hideAlert: (state, action) => {
      const { id } = action.payload;
      return state.filter((ele) => ele.id != id);
    },
  },
});

export default AlertSlice;
export const { showAlert, hideAlert } = AlertSlice.actions;
