import { combineReducers, createStore, compose } from 'redux';
import reducer from '../reducers';
import heroes from '../reducers/heroes';
import filters from '../reducers/filters';

const enhancer = (createStore) => (...args) => {
   const store = createStore(...args);

   const oldDispatch = store.dispatch;//сохранили наш оригинальный dispatch, который мог принимать только объект с типом действия

   //перезаписываем его
   store.dispatch = (action) => {
      if (typeof action === 'string'){
         return oldDispatch({
            type: action
         })
      }
      return oldDispatch(action);
   }
   return store;
}

//второй аргумент - функция-усилитель стора, чтобы объединить несколько усилителей есть функция compose. важен порядок передачи в нее функций
const store = createStore( combineReducers({reducer, heroes, filters}), compose(
   enhancer,
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;