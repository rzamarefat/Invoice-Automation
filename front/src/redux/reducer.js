import initialState from "./initiaState"
import { SET_PDF_FILES} from "./actionTypes";


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PDF_FILES:
            return {
                ...state, pdfFiles: action.payload 
            }

        default:
            return state;
    }

}


export default reducer