import {SET_EXTRACTED_DATA, SET_PDF_FILES, SET_DATA_TABLE_HEADERS, SWITCH_LOADER_STATE} from './actionTypes'





export const switchLoaderState = (state) => {
    return {
        type: SWITCH_LOADER_STATE,
        payload: state
    }
}


export const setDataTableHeaders = (headers) => {
    return {
        type: SET_DATA_TABLE_HEADERS,
        payload: headers
    }
}

export const setPDFFiles = (files) => {
    return {
        type: SET_PDF_FILES,
        payload: files
    }
}


export const setExtractedData = (data) => {
    return {
        type: SET_EXTRACTED_DATA,
        payload: data
    }
}