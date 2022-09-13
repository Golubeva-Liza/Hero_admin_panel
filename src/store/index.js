import { configureStore } from '@reduxjs/toolkit';
import reducer from '../reducers';
import heroes from '../reducers/heroes';
import filters from '../reducers/filters';

//middleware - это функции по добавлению функционала и изменений в dispatch. позволяют принимать в action не только объекты, но и строки с функциями.

//(store) == ({dispatch, getState}), dispatch также именуют next, а вместе возвращаемого dispatch будет запускаться следующий middleware
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
   reducer: {reducer, heroes, filters},
   middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
   devTools: process.env.NODE_ENV !== 'production', //в зависимости от сборки делаем true или false
})

export default store;