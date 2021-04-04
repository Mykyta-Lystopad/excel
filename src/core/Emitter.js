export class Emitter {
    constructor() {
        this.listeners = {}
    }

    // dispatch, fire, trigger
    // Уведомляем слушателей, если они есть
    // table.emit('table:select', {a:1})
    emit(event, ...args){
        if (!Array.isArray(this.listeners[event])){
            return false
        }
        this.listeners[event].forEach(listener => {
            console.log(listener(...args))
        })
        return true
    }

    // on, listen
    // Подписываемся на уведомления
    // Добавляем нового слушателя
    // formula.subscribe('table:select', () => {})
    subscribe(event, fn){
        this.listeners[event] = this.listeners[event] || []
        this.listeners[event].push(fn)
        return () => {
            this.listeners[event] = this.listeners[event]
                .filter(listener => listener !== fn)
        }
    }
}

// Example
// const emitter = new Emitter()
//
// emitter.subscribe('nik', data => console.log(data))
// emitter.emit('nik', 7)

