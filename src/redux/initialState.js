import {clone, storage} from "@core/utils";
import {defaultStyles, defaultTitle} from "@/constans";

const defaultState = {
    title: defaultTitle,
    rowState: {},
    colState: {},
    dataState: {}, // {'0:1': 'some text'}
    stylesState: {},
    currentText: '',
    currentStyles: defaultStyles

}

const normalize = state => ({
    ...state,
    currentStyles: defaultStyles,
    currentText: ''
})

export function normalizeInitialState (state) {
    return state ? normalize(state) : clone(defaultState)
}