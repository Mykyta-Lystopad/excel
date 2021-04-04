import {DomListener} from "@core/DomListener";

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.emitter = options.emitter
        this.unsubscribers = []

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
        this.emitter.emit(event, ...args)
    }

    // подписываемся на событие event
    $on(event, fn){
        const unsub = this.emitter.subscribe(event, fn)
        this.unsubscribers.push(unsub)
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
