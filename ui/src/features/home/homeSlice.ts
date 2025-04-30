import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import type { AppThunk } from "../../app/store"
import { Credentials } from "../../types/credentials"
import { login } from "./homeAPI"

export interface HomeSliceState {
  userName: string
}

const initialState: HomeSliceState = {
  userName: ""
}

// If you are not using async thunks you can use the standalone `createSlice`.
export const homeSlice = createAppSlice({
  name: "home",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: create => ({
    submit: create.reducer(
      (state, action: PayloadAction<Credentials>) => {
        state.userName = action.payload.userName
      },
    ),
    /*
    //i think, below kind of pending/fullfilled/rejected will be needed 
    //if the logic happens within the same page, and hence the submit button 
    //needs to be disabled until the async action is completed
    submitAsync: create.asyncThunk(
          async (credentials: Credentials) => {
            const response = await login(credentials)
            // The value we return becomes the `fulfilled` action payload
            return response.data
          },
          {
            pending: state => {
              state.status = "loading"
            },
            fulfilled: (state, action) => {
              state.status = "idle"
              state.credentials.value += action.payload
            },
            rejected: state => {
              state.status = "failed"
            },
          },
          
        ),
    */
    
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectUserName: home => home.userName,
  },
})

// Action creators are generated for each case reducer function.
export const { submit } = homeSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectUserName } = homeSlice.selectors

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const loginSubmit = (credentials: Credentials): AppThunk => async (dispatch, getState) => {
  const loginResponse = await login(credentials)
    if(loginResponse.status === "success") {
      dispatch(submit(credentials));
    }
}

  