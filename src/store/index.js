import { configureStore } from '@reduxjs/toolkit';
import heroes from '../components/heroesList/heroesSlice';
import filters from '../components/heroesFilters/filtersSlice';

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
   devTools: process.env.NODE_ENV !== 'production', //в зависимости от сборки делаем true или false
})

export default store;