import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import reducer from '../reducers';
import heroes from '../reducers/heroes';
import filters from '../reducers/filters';
import ReduxThunk from 'redux-thunk';

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

const store = createStore( combineReducers({reducer, heroes, filters}), 
   compose(
      applyMiddleware(ReduxThunk, stringMiddleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
   )
);

export default store;