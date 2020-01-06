import {
    REQUEST_PROJECTS,
    RESPONSE_PROJECTS,
    RESPONSE_FAIL_PROJECTS
} from "../actions/projects";

const initialState = {
    isRequest: false,
    limit: 1000,
    offset: 0,
    items: [],
    tsUpdate: null,

    total: 0
};

export default function projects(state = initialState, action) {
    switch (action.type) {
        case REQUEST_PROJECTS:
            return {
                ...state,
                items: [],
                isRequest: true
            }
        case RESPONSE_PROJECTS:
            return {
                ...state,
                tsUpdate: window.date.getNowTs(),
                items: action.data,
                isRequest: false
            }
        case RESPONSE_FAIL_PROJECTS:
            return {
                ...state,
                tsUpdate: window.date.getNowTs(),
                items: [],
                isRequest: false
            }
        default:
            return state;
    }
}