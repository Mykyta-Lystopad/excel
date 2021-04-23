import {createToolbar} from "@/components/toolbar/toolbar.template";
import {$} from "@core/dom";
import {ExcelStateComponent} from "@core/ExcelStateComponent";
import {defaultStyles} from "@/constans";

export class Toolbar extends ExcelStateComponent{
    static className = 'excel__toolbar'

    constructor($root, options) {
        super($root, {
            name: 'Toolbar',
            listeners: ['click'],
            subscriber: ['currentStyles'],
            ...options
        });
    }

    prepare() {
        this.initState(defaultStyles)
    }

    get template(){
        return createToolbar(this.state)
    }

    toHtml() {
        return this.template
    }

    storeChanged(changes) {
        this.setState(changes.currentStyle)
    }

    onClick(event) {
        const $target = $(event.target)
        // $target.data.type = button
        if ($target.data.type === 'button') {
            const value = JSON.parse($target.data.value)
            // value = {fontWeight: "bold"}
            this.$emit('toolbar:applyStyle', value)

        }
    }
}