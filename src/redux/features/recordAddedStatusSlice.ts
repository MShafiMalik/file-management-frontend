import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type TRecordAddedStatusState = {
  recordAddedStatus: boolean;
};

const initialState: TRecordAddedStatusState = { recordAddedStatus: false };

export const recordAddedStatusSlice = createSlice({
  name: "recordAddedStatus",
  initialState,
  reducers: {
    toggleRecordAddedStatus: (state, action: PayloadAction<boolean>) => {
      state.recordAddedStatus = action.payload;
    },
  },
});

export const { toggleRecordAddedStatus } = recordAddedStatusSlice.actions;

export const getRecordAddedStatus = (state: RootState) =>
  state.recordAddedStatus;

export default recordAddedStatusSlice.reducer;
