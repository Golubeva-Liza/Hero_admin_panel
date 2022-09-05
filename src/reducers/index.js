const initialState = {
   heroes: [],
   heroesLoadingStatus: "idle",
   filters: [],
   activeFilter: "all",
   heroName: '',
   heroDescr: '',
   heroElem: 'default'
};

const reducer = (state = initialState, action) => {
   switch (action.type) {
      case "HEROES_FETCHING":
         return {
            ...state,
            heroesLoadingStatus: "loading",
         };
      case "HEROES_FETCHED":
         return {
            ...state,
            heroes: action.payload,
            heroesLoadingStatus: "idle",
         };
      case "HEROES_FETCHING_ERROR":
         return {
            ...state,
            heroesLoadingStatus: "error",
         };
      case "HERO_DELETING":
         const arrId = state.heroes.findIndex(el => el.id == action.payload);
         return {
            ...state,
            heroes: [...state.heroes.slice(0, arrId), ...state.heroes.slice(arrId + 1)],
         };

      case "HERO_ADDING":
         return {
            ...state,
            heroes: [...state.heroes, action.payload],
         };

      case "FILTERS_SETTING":
         return {
            ...state,
            filters: action.payload,
         };
      case "ACTIVE_FILTER":
         return {
            ...state,
            activeFilter: action.payload,
         };

      case "SET_FORM_VALUE":
         return {
            ...state,
            [action.payload.state]: action.payload.value,
         };
      default:
         return state;
   }
};

export default reducer;
