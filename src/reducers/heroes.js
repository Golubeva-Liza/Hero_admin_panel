import { createReducer } from "@reduxjs/toolkit";

import {
   heroesFetching,
   heroesFetched,
   heroesFetchingError,
   addHero,
   deleteHero
} from '../actions';

const initialState = {
   heroes: [],
   heroesLoadingStatus: "idle"
};

//builder позволяет конструировать reducer с помощью 3-ех встроенных методов
//addCase - принимает action.creator и фукнцию по изменению state
//когда мы используем createReducer то toolkit автоматически активирует библиотеку (immer/inner), она упрощает работу с иммутабельностью, значит мы можем писать прямое изменение state визуально, а под капотом она сделает это правильно
// const heroes = createReducer(initialState, builder => {
//    builder
//       .addCase(heroesFetching, (state) => {
//          state.heroesLoadingStatus = "loading";//визуально пишем неиммутабельный код
//       })
//       //но при использовании return библиотека работать не будет, поэтому при return писать то же, что и писали до этого
//       .addCase(heroesFetched, (state, action) => {
//          state.heroesLoadingStatus = "idle";
//          state.heroes = action.payload;
//       })
//       .addCase(heroesFetchingError, (state) => {
//          state.heroesLoadingStatus = "error";
//       })
//       .addCase(addHero, (state, action) => {
//          state.heroes.push(action.payload);
//       })
//       .addCase(deleteHero, (state, action) => {
//          state.heroes = state.heroes.filter(item => item.id !== action.payload);
//       })
//       .addDefaultCase(() => {});
// })

//вариант, работающий без typescript
const heroes = createReducer(initialState, {
   [heroesFetching]: (state) => {state.heroesLoadingStatus = "loading"},
   [heroesFetched]: (state, action) => {
      state.heroesLoadingStatus = "idle";
      state.heroes = action.payload;
   },
   [heroesFetchingError]: (state) => {state.heroesLoadingStatus = "error"},
   [addHero]: (state, action) => {
      state.heroes.push(action.payload)
   },
   [deleteHero]: (state, action) => {
      state.heroes = state.heroes.filter(item => item.id !== action.payload)
   },
}, [], state => state)
//массив функций сравнения, и функция для действий по умолчанию

// const heroes = (state = initialState, action) => {
//    switch (action.type) {
//       case "HEROES_FETCHING":
//          return {
//             ...state,
//             heroesLoadingStatus: "loading",
//          };
//       case "HEROES_FETCHED":
//          return {
//             ...state,
//             heroes: action.payload,
//             heroesLoadingStatus: "idle",
//          };
//       case "HEROES_FETCHING_ERROR":
//          return {
//             ...state,
//             heroesLoadingStatus: "error",
//          };
//       case "HERO_DELETING":
//          const arrId = state.heroes.findIndex(el => el.id == action.payload);
//          return {
//             ...state,
//             heroes: [...state.heroes.slice(0, arrId), ...state.heroes.slice(arrId + 1)],
//          };

//__________________другой вариант!!!___________________
//       case "HERO_DELETING":
//          return {
//             ...state,
//             heroes: state.heroes.filter(item => item.id !== action.payload),
//          };
//__________________другой вариант!!!___________________

//       case "HERO_ADDING":
//          return {
//             ...state,
//             heroes: [...state.heroes, action.payload],
//          };
//       default:
//          return state;
//    }
// };

export default heroes;