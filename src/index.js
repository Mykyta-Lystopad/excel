import './module'
import './scss/index.scss'
import {Excel} from "@/components/excel/Excel";
import {Header} from "@/components/header/Header";
import {Toolbar} from "@/components/toolbar/Toolbar";
import {Formula} from "@/components/formula/Formula";
import {Table} from "@/components/table/Table";
import {createStore} from "@core/createStore";
import {rootReducer} from "@/redux/rootReduser";
import {debounce, storage} from "@core/utils";
import {initialState} from "@/redux/initialState";

const store = createStore(rootReducer, initialState)
// store = {subscribe: ƒ, dispatch: ƒ, getState: ƒ}
//
// const stateListener = debounce(state => {
//     // console.log('App ', state)
//     // state = App  {title: "Моя первая таблица", rowState: {…}, colState: {…}, dataState: {…},} stylesState: {…},
//     storage('excel-state', state) // записываем в localStorage ( utils.js )
// }, 300)
//
// store.subscribe(stateListener)

store.subscribe(state => {
    console.log('App ', state)
    // state = App  {title: "Моя первая таблица", rowState: {…}, colState: {…}, dataState: {…},} stylesState: {…},
    storage('excel-state', state) // записываем в localStorage ( utils.js )
})

const excel = new Excel('#app', {
    components: [Header, Toolbar, Formula, Table],
    store
})

excel.render()














