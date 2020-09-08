import * as actionTypes from '../actions/actionTypes';

const initialState={
    filterList:[
        {
          id:1,
          name:"Lips",
          value:"lips"
        },
        {
          id:2,
          name:"Face",
          value:"face"
        },
        {
          id:3,
          name:"Eyes",
          value:"eyes"
        },
        {
          id:4,
          name:"Nails",
          value:"nails"
        },
        {
          id:5,
          name:"Makeup Kit",
          value:"kit"
        }
      ],
      priceList:[
        {
          id:1,
          name:"INR 0 to 500",
          value:[0,500]
        },
        {
          id:2,
          name:"INR 501 to 1500 ",
          value:[501,1500]
        },
        {
          id:3,
          name:"INR 1501 to 2500",
          value:[1501,2500]
        },
        {
          id:4,
          name:"INR 2501 TO 3500",
          value:[2501,3500]
        },
        {
          id:5,
          name:"INR 3500+",
          value:[3501,1500000]
        },
        
      ],
      activeFilter: [],
      activePriceFilter:[],
}
const addRemoveFromFilter =(state,action) =>{
    if (state.activeFilter.includes(action.filter)) {
        const filterIndex = state.activeFilter.indexOf(action.filter);
        const newFilter = [...state.activeFilter];
        newFilter.splice(filterIndex, 1);
        return{
            ...state,
            activeFilter: newFilter
        }
      } else {
          return{
              ...state,
              activeFilter: [...state.activeFilter, action.filter]
          }
      }
}
const addRemoveFromPriceFilter =(state,action) =>{
    if (state.activePriceFilter.includes(action.filter)) {
        const filterIndex = state.activePriceFilter.indexOf(action.filter);
        const newFilter = [...state.activePriceFilter];
        newFilter.splice(filterIndex, 1);
        return{
            ...state,
            activePriceFilter: newFilter
        }
      } else {
          return{
              ...state,
              activePriceFilter: [...state.activePriceFilter, action.filter]
          }
      }
}

const clearAll =(state,action) =>{
    return{
        ...state,
        activeFilter:[],
        activePriceFilter:[]
    }
}

const reducer =(state=initialState,action) =>{
    switch(action.type){
        case actionTypes.ADD_REMOVE_FROM_FILTER: return addRemoveFromFilter(state,action);

        case actionTypes.ADD_REMOVE_FROM_PRICE_FILTER: return addRemoveFromPriceFilter(state,action);

        case actionTypes.CLEAR_ALL: return clearAll(state,action);
                    
        default:
            return state;
    }
  
}

export default reducer;