const initialState = {
    openModalLogin: false,
    openSnackbar: false,
    alertString:"",
    alertSeverity:"error",
    openOrderModal: false,
}

const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case "OPEN_LOGIN_MODAL":
            return {
                ...state,
                openModalLogin: action.payload.openModalLogin,
            };

        case "OPEN_SNACKBAR":
            return {
                ...state,
                openSnackbar: action.payload.openSnackbar,
                alertString: action.payload.alertString
            };
            
        case "ALERT_SEVERITY":
            return {
                ...state,
                alertSeverity: action.payload.alertSeverity
            };
        case "ORDER_MODAL":
            return{
                ...state,
                openOrderModal: action.payload.openOrderModal
            }
        default:
            return state;
    }
}

export default modalReducer;
