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

export const heroesFetching = () => {
   return {
      type: "HEROES_FETCHING",
   };
};

export const heroesFetched = (heroes) => {
   return {
      type: "HEROES_FETCHED",
      payload: heroes,
   };
};

export const heroesFetchingError = () => {
   return {
      type: "HEROES_FETCHING_ERROR",
   };
};

export const filtersFetching = () => {
   return {
      type: 'FILTERS_FETCHING'
   }
}

export const filtersFetchingError = () => {
   return {
      type: 'FILTERS_FETCHING_ERROR'
   }
}

export const setFilters = (filters) => {
   return {
      type: "FILTERS_FETCHED",
      payload: filters,
   };
};

export const setActiveFilter = (filter) => {
   return {
      type: "ACTIVE_FILTER",
      payload: filter,
   };
};

//благодаря ReduxThunk мы можем в качестве действий указывать функцию
// export const setActiveFilter = (filter) => (dispatch) =>{
//    setTimeout(() => {
//       dispatch({
//          type: "ACTIVE_FILTER",
//          payload: filter,
//       })
//    }, 1000)
// };

export const deleteHero = (id) => {
   return {
      type: "HERO_DELETING",
      payload: id,
   };
};

export const addHero = (hero) => {
   return {
      type: "HERO_ADDING",
      payload: hero,
   };
};

export const setFormValue = (state, value) => {
   return {
      type: "SET_FORM_VALUE",
      payload: {
         state,
         value 
      }
   };
};