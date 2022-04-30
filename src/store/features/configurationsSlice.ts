import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { AppConfiguration } from "../../helpers/types";

export type configuratonState = {
  configuration: AppConfiguration;
  isLoading: boolean;
  error: boolean;
};

// initial value
const initialState: configuratonState = {
  configuration: {
    id: 1,
    logo: "img.innoloft.de/logo.svg",
    mainColor: "#272e71",
    hasUserSection: true,
  },
  isLoading: false,
  error: false,
};

export const configurationsSlice = createSlice({
  name: "configurations",
  initialState,
  reducers: {
    addConfiguration: (state, { payload }) => {
      state.configuration = payload;
      state.isLoading = false;
    },
    //
    updateConfiguration: (state, { payload }) => {
      state.configuration = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addConfiguration, updateConfiguration } =
  configurationsSlice.actions;

export const configurationsSelector = (state: RootState) =>
  state.configurations;

export default configurationsSlice.reducer;
