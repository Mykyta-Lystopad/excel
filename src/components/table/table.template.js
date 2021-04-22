import {defaultStyles} from "@/constans";
import {toInlineStyles} from "@core/utils";

export const CODES = {
    A: 65,
    Z: 90
}

const DEFAULT_WIDTH = 120 // дефолтная ширина ячейки
const DEFAULT_HEIGHT = 24

function getWidth(state, index){
    return (state[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state, index){
    return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function withWidthFrom(state){
    // state = {colState: {…}, rowState: {…}}
    // state.rowState = {1: 54, 2: 41}
    return function(col, index){
        // col = A, B, C, D...
        // index = 1, 2, 3, 4...
        return {
            col, index, width: getWidth(state.colState, index)
        }
    }
}

function toCell(col, row, width, state){
    const id = `${col}:${row}`
    const text = state.dataState[id] || ''
    const data = state.dataState[id]
    const styles = toInlineStyles( {
        ...defaultStyles,
        ...state.stylesState[id]
    })

    return `
            <div 
                class="cell js-${col}" 
                contenteditable 
                data-id="${id}"
                data-type="cell"
                data-value="${data}"
                style="${styles}; width: ${width};"
            >
                ${text || ''}
            </div>
            `
}

function toColumn({col, index, width}){
    return `
        <div 
        class="column" 
        data-type="resizable" 
        data-col="${index}"
        style="width: ${width}"
        >
            ${col}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

function createRow(num, content, state){
    const resize = num ? `<div class="row-resize" data-resize="row"></div>` : ''
    const height = getHeight(state, num)
    return `
                <div class="row" 
                data-type="resizable" 
                data-row="${num}"
                style="height: ${height}"
                >
                    <div class="row-info" >
                        ${num ? num : ''}
                        ${resize}
                    </div>
                    <div class="row-data">
                        ${content}
                    </div>
                </div>
            `

}

function toChar(_, index){
    return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15, state = {}){
    // state = {rowState: {…}, colState: {…}, dataState: {…}, stylesState: {…}, currentText: "",…}
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(withWidthFrom(state))
        .map(toColumn)
        .join('')

    rows.push(createRow(null, cols, {}))

    for (let i = 0; i < rowsCount; i++){
        const cells = new Array(colsCount)
            .fill('')
            .map(toChar)
            .map( (_, col) => {
                const width = getWidth(state.colState, col)
                return toCell(col, i, width, state)
            })
            .join('')

        rows.push(createRow(i+1, cells, state.rowState))
    }
    return rows.join('')

}
