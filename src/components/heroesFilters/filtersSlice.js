import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   filters: [],
   filtersLoadingStatus: "idle",
   activeFilter: "all"
};

const filterSlice = createSlice({
   name: 'filters',
   initialState,
   reducers: {
      filtersFetching: (state) => {state.filtersLoadingStatus = "loading"},
      filtersFetchingError: (state) => {state.filtersLoadingStatus = "error"},
      setFilters: (state, action) => {
         state.filtersLoadingStatus = "idle";
         state.filters = action.payload;
      },
      setActiveFilter: (state, action) => {state.activeFilter = action.payload}
   }
});

const {actions, reducer} = filterSlice;

export default reducer;
export const {
   filtersFetching,
   filtersFetchingError,
   setFilters,
   setActiveFilter
} = actions;