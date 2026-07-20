import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../lib/types/screen";

const initialState: HomePageState = {
  popularDishes: [],
  newDishes: [],
  topUsers: [],
  events: "",
};

const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setPopularDishes:(state , action ) => {
      state.popularDishes = action.payload;
    },
    setNewDishes:(state , action ) => {
      state.newDishes = action.payload;
    },
    setTopUsers:(state , action ) => {
      state.topUsers = action.payload;
    },
      setevets:(state , action ) => {
      state.events = action.payload;
    },
  },
});

export const {setPopularDishes,setNewDishes,setTopUsers} =
 homePageSlice.actions;

 const HomePageReducer = homePageSlice.reducer;
 export default HomePageReducer;
