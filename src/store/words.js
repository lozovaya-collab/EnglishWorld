import Vue from 'vue'

export default {  // функционал для словаря
    state: {
        words: []
    },
    mutations: {
        setWords(state, payload){
            state.words = payload
        }
    },
    actions: {
        load_Words({commit}, payload){
            
            const uid = payload.uid
            console.log(uid)
            Vue.$db.collection("words").doc(uid).collection("userWords").get().then(querySnapshot => {
                let words = []
                querySnapshot.forEach(s => {
                    const data = s.data()
                    let word = {
                        id: s.id,
                        isWord: data.isWord,
                        translation: data.translation,
                    }
                    
                    console.log(word);
                    words.push(word)
                })

                commit('setWords', words)

            })
            .catch(error => console.log(error))
        },
        addUserProfileWord({commit, getters}, payload){
            
            const uid = getters.userId
            console.log(uid)
            commit('set_Proccesing', true) 
            commit('clean_Error')
            
            console.log(payload.isWord);
            Vue.$db.collection("words").doc(uid).collection("userWords").add({
                isWord: payload.isWord, 
                translation: payload.translation,
            })
            .then(function() {
                
                commit('load_Words', payload.user.uid)
                commit('set_Proccesing', false)
            })
            .catch(function(error) {
                    commit('set_Proccesing', false)
                    commit('set_Error', error.message) 
            });
        }
    },
    
    getters:{
        getWords: (state) => state.words
    }
}