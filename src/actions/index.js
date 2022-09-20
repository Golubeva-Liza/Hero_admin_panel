import {heroesFetched, heroesFetchingError, heroesFetching} from '../components/heroesList/heroesSlice';
import {filtersFetching, filtersFetchingError, setFilters} from '../components/heroesFilters/filtersSlice';
//функция nanoid содержится в toolkit, служит для генерации id

export const fetchHeroes = (request) => (dispatch) => {
   dispatch(heroesFetching());
   request("http://localhost:3001/heroes")
      .then((data) => dispatch(heroesFetched(data)))
      .catch(() => dispatch(heroesFetchingError()));
}

export const fetchFilters = (request) => (dispatch) => {
   dispatch(filtersFetching());
   request("http://localhost:3001/filters")
      .then((data) =>dispatch(setFilters(data)))
      .catch(() => dispatch(filtersFetchingError()));
}