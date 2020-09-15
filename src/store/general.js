export default { // работает с общими данными
    state: {
        proccesing: false, // когда что-то обрабатываем
        error: null // глобальный error, который приходит из различных модулей
    },
    mutations: {
        set_Proccesing(state, payload){
            state.proccesing = payload
        },
        set_Error(state, payload){
            state.error = payload
        },
        clean_Error(state){
            state.error = null
        }
    },
    getters: {
        get_Proccesing: (state) => state.proccesing, //возращает функцию
        get_Error: (state) => state.error
    },
}