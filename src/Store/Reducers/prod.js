import * as ActionType from "../../ActionTypes";
import { products } from "../../Products";

const initialState={
    productsArr:[]
}
export const prodReducer=(state=initialState,action)=>{
    switch (action.type) {
        case ActionType.GET_PROD:
            console.log(action.paylod);
            return{
                ...state,
                products:[...action.paylod.arr]
            }   
        default:
            return state;
    }
}