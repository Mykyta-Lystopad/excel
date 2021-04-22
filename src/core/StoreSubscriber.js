import {isEqual} from "@core/utils";

export class StoreSubscriber {
    constructor(store) {
        this.store = store
        this.sub = null
        this.prevState = {}
    }

    subscribeComponents(components) {
        this.prevState = this.store.getState()

        this.sub = this.store.subscribe(state => {
            Object.keys(state).forEach(key => {
                // key = rowState colState dataState currentText
                if (!isEqual(this.prevState[key], state[key])){
                    components.forEach(component => {
// component = Table{$root: Dom, listeners: Array(3), name: "table", emitter: Emitter, subscribe: Array(0),…}
                        if (component.isWatching(key)){
                            const changes = {[key]: state[key]}
                            component.storeChanged(changes)
                        }
                    })
                }
            })
            this.prevState = this.store.getState()
        })
    }

    unsubscribeFromStore(){
        this.sub.unsubscribe()
    }
}