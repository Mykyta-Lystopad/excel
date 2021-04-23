import {DomListener} from "@core/DomListener";
import {applyStyle} from "@/redux/types";

export class ExcelComponent extends DomListener {
    constructor($root, options = {}, rowCount) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.emitter = options.emitter
        this.subscribe = options.subscribe || []
        this.unsubscribers = []
        this.store = options.store
        this.storeSub = options.storeSub
        this.rowCount = rowCount

        this.prepare()
    }

    //Настраиваем наш компонент до init
    prepare(){}

    // Возвращает шаблон компонента
    toHtml() {
        return ''
    }

    // Уведомляем слушателя про событие event
    $emit(event, ...args){
        // event = applyStyle
        // ...args = {fontWeight: "bold"}
        // this.emitter  =
        // Emitter {listeners: {…}}
        //     listeners:
        //     formula:enter: [ƒ]
        //     formula:input: [ƒ]
        //     table:select: [ƒ]
        //     toolbar:applyStyle: [ƒ]
        this.emitter.emit(event, ...args)
    }

    // подписываемся на событие event
    $on(event, fn){
        const unsub = this.emitter.subscribe(event, fn)
        this.unsubscribers.push(unsub)
    }

    $dispatch(action){
        this.store.dispatch(action)
    }

    // $subscribe(fn){
    //     const storeSub = this.store.subscribe(fn)
    //
    // }

    // Вместо $subscribe (только те изменения на которые мы подписались)
    storeChanged(){}

    isWatching(key){
        return this.subscribe.includes(key)
    }

    // Инициализируем компонент
    // Добавляем DOM слушателей
    init(){
        this.initDomListeners()
    }

    // Удаляем компонент
    // Чистим слушателей
    destroy() {
        this.removeDomListeners()
        this.unsubscribers.forEach(unsub => unsub())
    }
}
