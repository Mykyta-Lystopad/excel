import {ExcelComponent} from "@core/ExcelComponent";
import {createHeader} from "@/components/header/header.template";
import {changeTitleFn} from "@/redux/actions";
import {defaultTitle} from "@/constans";
import {$} from "@core/dom";
import {debounce} from "@core/utils";

export class Header extends ExcelComponent {
    static className = 'excel__header'

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input'],
            ...options
        });
    }

    // prepare() {
    //     this.onInput = debounce(this.onInput, 300)
    // }

    toHtml() {
        const title = this.store.getState().title || defaultTitle
        return createHeader(title)
    }

    onInput(event){
        const $target = $(event.target)
        this.$dispatch(changeTitleFn($target.text()))
    }
}