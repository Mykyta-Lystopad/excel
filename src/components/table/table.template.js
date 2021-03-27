const CODES = {
    A: 65,
    Z: 90
}

function toCell(el, num){
    return `
        <div class="cell" contenteditable>${el + num}</div>
    `
}

function toColumn(col){
    return `
        <div class="column">
            ${col}
        </div>
    `
}

function createRow(num, content){
    return `
        <div class="row">
            <div class="row-info">
                ${num}
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

    rows.push(createRow(0, cols))

    for (let i = 1; i < rowsCount; i++){
        const cells = new Array(colsCount)
            .fill('')
            .map(toChar)
            .map((el) => {
                return toCell(el, i)
            })
            .join('')

        rows.push(createRow(i, cells))
    }
    return rows.join('')

}