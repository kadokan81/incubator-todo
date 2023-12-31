import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  status: "idle" as RequestStatusType,
  error: null as string | null,
  isInitialized: false,
};

export type AppInitialStateType = typeof initialState;
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error;
    },
    // setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
    //   state.status = action.payload.status;
    // },
    setAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized;
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        // 1 параметр - функция предикат
        (action) => {
          return action.type.endsWith('/pending')
        },
        // 2 параметр - reducer
        (state, action) => {
          state.status = 'loading'
         
        }
      )
      .addMatcher(
        (action) => {
          return action.type.endsWith('/rejected')
        },
        (state, action) => {
          state.status = 'idle'
     
        }
      )
      .addMatcher(
        (action) => {
          return action.type.endsWith('/fulfilled')
        },
        (state, action) => {
          state.status = 'succeeded'
        
        }
      )
  }
});



export const appReducer = slice.reducer;
export const appActions = slice.actions;
