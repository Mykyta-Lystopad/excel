const CODES = {
    A: 65,
    Z: 90
}

function toCell(item, index){
    const resize = `<div class="row-resize" data-resize="row"></div>`
    return `
        <div class="cell js-${item}" contenteditable>
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

function toColumn(col){
    return `
        <div class="column" data-type="resizable">
            ${col}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

function createRow(num, content){
    const resize = num ? `<div class="row-resize" data-resize="row" ></div>` : ''
    return `
        <div class="row" data-type="resizable">
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

export function createTable(rowsCount = 15){
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(toColumn)
        .join('')

    rows.push(createRow(null, cols))

    for (let i = 1; i < rowsCount; i++){
        const cells = new Array(colsCount)
            .fill('')
            .map(toChar)
            .map(item => {
                return toCell(item, i)
            })
            .join('')

        rows.push(createRow(i, cells))
    }
    return rows.join('')

}