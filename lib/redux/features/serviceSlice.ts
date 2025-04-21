import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  services: [],
};

const serviceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    setServices: (state, action) => {
      state.services = action.payload;
    },  
  },
});

export default serviceSlice.reducer;    