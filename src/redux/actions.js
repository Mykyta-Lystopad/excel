import {applyStyle, changeStyles, changeText, changeTitle, tableResize} from "@/redux/types";

// Action Creator
export function tableResizeFn(data){
    return {
        type: tableResize,
        data
    }
}

export function changeTextFn(data) {
    return {
        type: changeText,
        data
    }
}

export function changeStylesFn(data){
    return {
        type: changeStyles,
        data
    }
}

// value, ids
export function applyStyleFn(data){
    return {
        type: applyStyle,
        data
    }
}

export function changeTitleFn(data){
    return {
        type: changeTitle,
        data
    }
}
