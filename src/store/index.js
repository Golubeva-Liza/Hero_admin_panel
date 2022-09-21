import { configureStore } from '@reduxjs/toolkit';
import heroes from '../components/heroesList/heroesSlice';
import filters from '../components/heroesFilters/filtersSlice';
// import reducer from '../reducers';
// import heroes from '../reducers/heroes';
// import filters from '../reducers/filters';
import { apiSlice } from '../api/apiSlice';

//middleware - это функции по добавлению функционала и изменений в dispatch. позволяют принимать в action не только объекты, но и строки с функциями.

const stringMiddleware = (store) => (dispatch) => (action) => {
   if (typeof action === 'string'){
      return dispatch({
         type: action
      })
   }
   return dispatch(action);
};

//в redux toolkit уже включено 3 middleware - получаем с помощью getDefaultMiddleware
const store = configureStore({
   reducer: {heroes, filters},
   middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),

   // reducer: {reducer, heroes, filters, [apiSlice.reducerPath]: apiSlice.reducer}, //api: reducer
   // middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware, apiSlice.middleware),

   devTools: process.env.NODE_ENV !== 'production', //в зависимости от сборки делаем true или false
})

export default store;