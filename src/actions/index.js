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

export const setFilters = (filters) => {
   return {
      type: "FILTERS_SETTING",
      payload: filters,
   };
};

export const setActiveFilter = (filter) => {
   return {
      type: "ACTIVE_FILTER",
      payload: filter,
   };
};

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