import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   heroes: [],
   heroesLoadingStatus: "idle"
};

//создает reducers, генерирует action creators, возвращает имя среза
const heroesSlice = createSlice({
   name: 'heroes',
   initialState,
   reducers: {
      //свойство, значение - функция, принимающая state и action, меняющая store
      heroesFetching: (state) => {state.heroesLoadingStatus = "loading"},
      //action creator           //действие, меняющее state

      heroesFetched: (state, action) => {
         state.heroesLoadingStatus = "idle";
         state.heroes = action.payload;
      },
      heroesFetchingError: (state) => {state.heroesLoadingStatus = "error"},
      addHero: (state, action) => {state.heroes.push(action.payload)},
      deleteHero: (state, action) => {state.heroes = state.heroes.filter(item => item.id !== action.payload)}
   }
});
//вернет name, объект actions и reducer

const {actions, reducer} = heroesSlice;

export default reducer;
export const {
   heroesFetching,
   heroesFetched,
   heroesFetchingError,
   addHero,
   deleteHero
} = actions;