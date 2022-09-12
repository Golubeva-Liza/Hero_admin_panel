const initialState = {
   heroName: '',
   heroDescr: '',
   heroElem: 'default'
};

const reducer = (state = initialState, action) => {
   switch (action.type) {
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
