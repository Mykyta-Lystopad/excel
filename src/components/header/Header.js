import {ExcelComponent} from "@core/ExcelComponent";

export class Header extends ExcelComponent {
    static className = 'excel__header'

    constructor($root, options) {
        super($root, {
            name: 'Header',
            ...options
        });
    }

    toHtml() {
        return `
            <input type="text" class="input" value="Новая таблица">

            <div>
                <button class="button">
                    <span class="material-icons">
                        exit_to_app
                    </span>
                </button>
                <button class="button">
                    <span class="material-icons">
                        delete
                    </span>
                </button>

            </div>
        `
    }
}