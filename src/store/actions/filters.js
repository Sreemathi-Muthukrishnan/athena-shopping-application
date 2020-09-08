import * as actionTypes from './actionTypes';

export const addRemoveFromFilter =(filter)=>{
    return{
        type:actionTypes.ADD_REMOVE_FROM_FILTER,
        filter:filter
    }
}

export const addRemoveFromPriceFilter =(filter) =>{
    return{
        type:actionTypes.ADD_REMOVE_FROM_PRICE_FILTER,
        filter:filter
    }
}

export const clearAll =()=>{
    return {
        type: actionTypes.CLEAR_ALL,
    }
}