import * as actions from '../actions/types';

const initialState = {
    isFileUploading: false
};

const graphReducer = (state = initialState, action) => {
    switch(action.type) {
        
        case actions.UPLOAD_CSV: 
            return {
                isFileUploading: true
            }

        case actions.UPLOAD_CSV_SUCCESS: 
            return {
                isFileUploading:false,
                csvData: action.data
            }
        
        
        case actions.UPLOAD_CSV_FAILURE :
            return {
                isFileUploading : false,
                error: action.error
            }

        case actions.FETCH_ALL_DATA: 
        return {
            isFileUploading: true
        }
        case actions.FETCH_ALL_DATA_SUCCESS:
            return {
                isFileUploading: false,
                csvData: action.data
            }
        case actions.FETCH_ALL_DATA_FAILURE : 
        return {
            isFileUploading : false, 
            eror : action.error
        }
        
        default: 
        return state;
        
    }
}

export default graphReducer;