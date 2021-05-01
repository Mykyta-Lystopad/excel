import {ExcelComponent} from "@core/ExcelComponent";
import {createHeader} from "@/components/header/header.template";
import {changeTitleFn} from "@/redux/actions";
import {defaultTitle} from "@/constans";
import {$} from "@core/dom";
import {debounce, storage} from "@core/utils";
import {ActiveRoute} from "@core/routes/ActiveRoute";

export class Header extends ExcelComponent {
    static className = 'excel__header'

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input', 'click'],
            ...options
        });
    }

    prepare() {
        this.onInput = debounce(this.onInput, 300)
    }

    toHtml() {
        const title = this.store.getState().title || defaultTitle
        return createHeader(title)
    }

    onInput(event){
        const $target = $(event.target)
        this.$dispatch(changeTitleFn($target.text()))
    }

    onClick(event){
        const $target = $(event.target)
        if ($target.data.button === 'remove'){
            const decision = confirm('Вы уверены, что хотите удалить таблицу?')
            if (decision){
                localStorage.removeItem('excel:' + ActiveRoute.param)
                ActiveRoute.navigate('')
            }
        }
    }
}