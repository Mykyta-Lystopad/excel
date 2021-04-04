import {range} from "@core/utils";
import {CODES} from "@/components/table/table.template";

export function shouldResize(event){
    return event.target.dataset.resize
}

export function isCell(event){
    return event.target.dataset.type === 'cell'
}

export function matrix($target, $current){
    const target = $target.id(true)
    const current = $current.id(true)

    const cols = range(current.col, target.col)
    const rows = range(current.row, target.row)

    // reduce - для работы с двумя массивами
    return  cols.reduce((acc, col) => {
        rows.forEach(row => acc.push(`${row}:${col}`))
        return acc
    }, [])
}

export function nextSelector(key, {row, col}, maxColValue){
    const minValue = 0
    const maxRowValue = CODES.Z - CODES.A + 1
    switch (key) {
        case 'Enter':
        case 'ArrowDown':
            col = col + 1 < maxColValue ? col + 1 : maxColValue - 1
            break
        case 'Tab':
        case 'ArrowRight':
            row = row + 1 < maxRowValue ? row + 1 : maxRowValue - 1
            break
        case 'ArrowLeft':
            row = row - 1 < minValue ? minValue : row - 1
            break
        case 'ArrowUp':
            col = col - 1 < minValue ? minValue : col - 1
            break

    }
    return `[data-id="${row}:${col}"]`
}