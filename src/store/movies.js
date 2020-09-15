import Vue from 'vue'
export default {  // функционал для фильмов
    state: {
        movies: []
    },
    mutations: {
        set_Movies(state, payload){
            state.movies = payload
        }
    },
    actions: {
        load_Movies({commit}){
            Vue.$db.collection("movies").get().then(querySnapshot => {
                let movies = []
                querySnapshot.forEach(s => {
                    const data = s.data()
                    let movie = {
                        id: s.id,
                        title: data.title,
                        description: data.description,
                        linkImage: data.linkImage,
                        linkForWatched: data.linkForWatched,
                        level: data.level.slice()
                    }

                    movies.push(movie)
                })

                commit('set_Movies', movies)
            })
            .catch(error => console.log(error))
        }
    },
    getters:{
        get_Movies: (state) => state.movies,
    }
}