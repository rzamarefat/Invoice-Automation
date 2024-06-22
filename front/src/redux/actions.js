import {SET_PDF_FILES} from './actionTypes'


export const setPDFFiles = (files) => {
    return {
        type: SET_PDF_FILES,
        payload: files
    }
}
