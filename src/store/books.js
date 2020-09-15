import Vue from 'vue'

export default {  // функционал для книг
    state: {
        books: []
    },
    mutations: {
        set_Books(state, payload){
            state.books = payload
        }
    },
    actions: {
        load_Books({commit}){
            Vue.$db.collection("books").get().then(querySnapshot => {
                let books = []
                querySnapshot.forEach(s => {
                    const data = s.data()
                    let book = {
                        id: s.id,
                        title: data.title,
                        description: data.description,
                        imageLink: data.imageLink,
                        linkForDownload: data.linkForDownload,
                        level: data.level.slice()
                    }

                    books.push(book)
                })

                commit('set_Books', books)
            })
            .catch(error => console.log(error))
        }
    },
    getters:{
        get_Books: (state) => state.books,
    }
}