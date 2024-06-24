import initialState from "./initiaState"
import { SET_DATA_TABLE_HEADERS, SET_EXTRACTED_DATA, SET_PDF_FILES, SWITCH_LOADER_STATE} from "./actionTypes";


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PDF_FILES:
            return {
                ...state, pdfFiles: action.payload 
            }
        case SET_EXTRACTED_DATA:
                return {
                    ...state, extractedData: [...state.extractedData, action.payload ]
                }
        case SET_DATA_TABLE_HEADERS:
            return {
                ...state, headers: action.payload
            }
        
        case SWITCH_LOADER_STATE:
            return {
                ...state, loaderState: action.payload
            }


        default:
            return state;
    }

}


export default reducer