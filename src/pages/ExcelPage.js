import {Page} from "@core/Page";
import {createStore} from "@core/createStore";
import {rootReducer} from "@/redux/rootReduser";
import {normalizeInitialState} from "@/redux/initialState";
import {debounce, storage} from "@core/utils";
import {Header} from "@/components/header/Header";
import {Toolbar} from "@/components/toolbar/Toolbar";
import {Excel} from "@/components/excel/Excel";
import {Formula} from "@/components/formula/Formula";
import {Table} from "@/components/table/Table";

function storageName(param){
    return 'excel:' + param
}

export class ExcelPage extends Page {
    getRoot() {
        const params = this.params ? this.params : Date.now().toString()

        const state = storage(storageName(params))
        const store = createStore(rootReducer, normalizeInitialState(state))
        // store = {subscribe: ƒ, dispatch: ƒ, getState: ƒ}

        const stateListener = debounce(state => {
            // console.log('App ', state)
            // state = App  {title: "Моя первая таблица", rowState: {…}, colState: {…}, dataState: {…},} stylesState: {…},
            storage(storageName(params), state) // записываем в localStorage ( utils.js )
        }, 500)

        store.subscribe(stateListener)

        this.excel = new Excel( {
            components: [Header, Toolbar, Formula, Table],
            store
        })

        return this.excel.getRoot()
    }

    afterRender() {
        this.excel.init()
    }

    destroy() {
        this.excel.destroy()
    }

}