const initialState = {
    cartSize: ""
}
const cartReducer = ( state =initialState , action ) => {
   switch (action.type) {
    case "ADD_TO_CART":
        return {
            cartSize: action.size
        }
        
   
    default:
        return state;
   }
}
export default cartReducer;