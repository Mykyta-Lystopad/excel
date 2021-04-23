export function createStore(rootReducer, initialState = {}) {
    console.log(initialState)
    // initialState = {title: "Моя первая таблица", rowState: {…}, colState: {…}, dataState: {…}, stylesState: {…}, currentText: "",…}
    let state = rootReducer({...initialState}, {type: '__INIT__'})
    let listeners = []

    return {
        subscribe(fn){
            // console.log('createStore: subscribe')
            listeners.push(fn)
            return {
                unsubscribe() {
                    listeners = listeners.filter(l => {
                        return l !== fn
                    })
                }
            }
        },
        dispatch(action){ // action = { type: "table-resize", data: {value: 196, id: "1"} }
            // console.log('createStore: dispatch')
            // action = {type: "applyStyle", data: {…}}
            //              data:
            //              ids: ["0:0"]
            //              value: {fontWeight: "bold"}
            //              __proto__: Object
            //              type: "applyStyle"
            state = rootReducer(state, action) // { colState: { 1: 196 } }

            listeners.forEach(listener => {
                return listener(state)
            })
        },
        getState(){
            // console.log('createStore: getState')
            // if (storage('excel-state')){
            //     state = storage('excel-state')
            //     // state = colState: {0: 155, 1: 148, 2: 406, 3: 187, 4: 55, null: 84}
            //     return state
            // }
            return JSON.parse(JSON.stringify(state))
        }
    }
}