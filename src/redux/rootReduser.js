import {applyStyle, changeStyles, changeText, tableResize, changeTitle} from "./types";


export function rootReducer(state, action){
    let field

    switch (action.type) { // col || row
        case tableResize:
            field = action.data.type === 'col' ? 'colState' : 'rowState'
            return {...state, [field]: value(state, field, action)}
        case changeText:
            field = 'dataState'
            return {...state, currentText: action.data.value, [field]: value(state, field, action)}
        case changeStyles:
            return {...state, currentStyle: action.data}
        case applyStyle:
            field = 'stylesState'
            const val = state[field] || {}
            action.data.ids.forEach(id => {
                val[id] = {...val[id], ...action.data.value}
            })
            return {
                ...state,
                [field]: val,
                currentStyles: {...state.currentStyle, ...action.data.value}
            }
        case changeTitle:
            return {...state, title: action.data}
        default: return state
    }
}

function value(state, field, action){
    const val = state[field] || {}
    val[action.data.id] = action.data.value
    return val
}