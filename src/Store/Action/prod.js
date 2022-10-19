import * as ActionType from "../../ActionTypes";

export const getAllProds = (prods) => {
    return (dispach) => {

dispach(getProd(prods));
    }}
    export const getProd = (prods) => {
        return {
            type: ActionType.GET_PROD,
            paylod: prods
        }
    }