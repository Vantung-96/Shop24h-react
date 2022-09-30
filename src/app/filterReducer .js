const initialState = {
    nameProduct:"",
    maxPrice:"",
    minPrice:"",
    name:"",
    typeProduct:"",
    isClick: false,
}



const filterReducer = (state = initialState, action) =>{
    switch (action.type) {
        case "MIN_INPUT_CHANGE":
            return{
                ...state, 
                minPrice: action.minInput,
            }
        case "MAX_INPUT_CHANGE":
            return{
                ...state, 
                maxPrice: action.maxInput,
            }
        case "NAME_INPUT_CHANGE":
            return{
                ...state,
                name: action.nameInput,
            }
       

        case "FILTER_CLICK":
            return{    
                ...state, 
                isClick: action.check,
                
            }
        case "CLICK_CHANGE":
            return{     
                ...state, 
                isClick: action.check,
            }
          
        default:
            return state;
           
    }
}
export default filterReducer;
