import {ExcelComponent} from "@core/ExcelComponent";
import {$} from "@core/dom";
import {createTable} from "@/components/table/table.template";
import {resizeHandler} from "@/components/table/table.resize";
import {isCell, matrix, nextSelector, shouldResize} from "@/components/table/table.fn.helpers";
import {TableSelection} from "@/components/table/Table.Selection";
import * as actions from '@/redux/actions'
import {defaultStyles} from "@/constans";

export class Table extends ExcelComponent{
    static className = 'excel__table'


    constructor($root, options, rowCount){
        super($root, {
            name: 'table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        }, rowCount)
        this.rowCount = 15
        this.unsubs = []
    }

    prepare(){
        this.selection = new TableSelection()
    }

    toHtml(){
        return createTable(this.rowCount, this.store.getState())
    }

    init(){
        super.init()

        this.selectCell(this.$root.find(`[data-id="0:0"]`))

        this.$on('formula:input', text => {
            // this.selection.current
            //     .attr('data-value', value)
            //     .text(parse(value))
            this.selection.current.text(text)
            this.updateTextInStore(text)
        })

        this.$on('formula:enter', () => {
            this.selection.current.focus()
        })

        this.$on('toolbar:applyStyle', value => {
            // style = toolbar:applyStyle {fontStyle: "italic"}
            this.selection.applyStyle(value)
            this.$dispatch(actions.applyStyleFn({
                value,
                ids: this.selection.selectedIds
            }))
        })
    }

    selectCell($cell){
        this.selection.select($cell)
        this.$emit('table:input', $cell)
        const styles = $cell.getStyles(Object.keys(defaultStyles))
        this.$dispatch(actions.changeStylesFn(styles))

    }

    async resizeTable(event){

        try {
            const data = await resizeHandler(event, this.$root)
            // data = {value: 130, type: "col", id: "0"}
            this.$dispatch(actions.tableResizeFn(data))
        } catch (e) {
            console.warn('Resize error', e.message)
        }

    }

    onMousedown(event){
        // event = MouseEvent {isTrusted: true, screenX: 30, screenY: 245, clientX: 30, clientY: 142,…}
        if (shouldResize(event)) {
            // shouldResize(event) = col || row
            this.resizeTable(event)
        } else if (isCell(event)) {
            const $target = $(event.target)
            if (event.shiftKey) {

                const $cells =  matrix($target, this.selection.current)
                    .map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup($cells)

            } else {
                this.selectCell($target)
            }
        }
    }

    onKeydown(event){
        const keys = [
            'Enter',
            'Tab',
            'ArrowUp',
            'ArrowLeft',
            'ArrowDown',
            'ArrowRight'
        ]

        const {key} = event

        if (keys.includes(key) && !event.shiftKey){
            event.preventDefault()
            const id = this.selection.current.id(true)
            const $next = this.$root.find(nextSelector(key, id, this.rowCount))
            this.selectCell($next)
        }
    }

    updateTextInStore(value){
        this.$dispatch(actions.changeTextFn({
            id: this.selection.current.id(),
            value
        }))
    }

    onInput(event){
        // this.$emit('table:input', $(event.target))
        this.updateTextInStore($(event.target).text())
    }

}



