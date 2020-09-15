import firebase from 'firebase'

export default {  // для пользователей
    state: {
        user: {
            isAuth: false, // авторизация
            uid: null, // из бд, индентификатор пользователя
            name: null,
            email: null
        }
    },
    mutations: {
        set_User(state, payload){
            state.user.isAuth = true
            state.user.uid = payload.uid
            state.user.email = payload.email
        },
        unset_User(state){
            state.user = {
                isAuth: false, // авторизация
                uid: null // из бд, индентификатор пользователя
            }
        },
        setUserName(state, payload){
            state.user.name = payload
        },
        setUserEmail(state, payload){
            state.user.email = payload
        },
        setUserPassword(state, payload){
            state.user.password = payload
        }
    },
    actions: {
        registered({commit}, payload){ // обрабатываем действие при нажатие на кнопку зарегистрироваться
            commit('set_Proccesing', true) //начинаем процесс, как пользователь начинает регистрацию
            commit('clean_Error')
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(() => {
                    // commit('set_User', user.uid)
                    firebase.auth().currentUser.updateProfile({displayName: payload.name})
                    .then(() =>commit('setUserName', payload.displayName))
                    commit('set_Proccesing', false)
                })
                .catch(function(error) {
                    commit('set_Proccesing', false)
                    commit('set_Error', error.message)
                });
        },
        LogIn({commit}, payload){ //обрабатываем действие при нажатие на кнопку войти
            commit('set_Proccesing', true) //начинаем процесс, как пользователь начинает вход
            commit('clean_Error')
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(() => {
                    // commit('set_User', user.uid)
                    commit('set_Proccesing', false)
                    commit('load_Words', payload.uid)
                })
                .catch(function(error) {
                    commit('set_Proccesing', false)
                    commit('set_Error', error.message)
                });
        },
        LogOut(){
            firebase.auth().signOut()
        },
        state_Changed({commit}, payload){
            if(payload){
                commit('set_User', {uid: payload.uid, email: payload.email})
                
                
                commit('setUserName', payload.displayName)
                
            } else{
                commit('unset_User')
            }
        },
        changeUserProfileData({commit}, payload){
            let user = firebase.auth().currentUser
            let credential = firebase.auth.EmailAuthProvider.credential(
                payload.email,
                payload.password
            )

            commit('set_Proccesing', true) 
            commit('clean_Error')

            user.reauthenticateWithCredential(credential).then(function() {
                let currentUser = firebase.auth().currentUser
                if(payload.changeType == 'name'){
                    currentUser.updateProfile({displayName: payload.newName})
                        .then(() => {
                            commit('setUserName', payload.newName)
                            commit('set_Proccesing', false) 

                        })
                        .catch(error => {
                            commit('set_Proccesing', false)
                            commit('set_Error', error.message) 
                        })
                }
                if(payload.changeType == 'login'){
                    currentUser.updateEmail(payload.newEmail)
                    .then(() => {
                        commit('setUserEmail', payload.newEmail)
                        commit('set_Proccesing', false) 
                    })
                    .catch(error => {
                        commit('set_Proccesing', false)
                        commit('set_Error', error.message) 
                    })
               
                }
               if(payload.changeType == 'password'){
                currentUser.updatePassword(payload.newPassword)
                    .then(() => {
                        
                        commit('set_Proccesing', false) 

                    })
                    .catch(error => {
                        commit('set_Proccesing', false)
                        commit('set_Error', error.message) 
                    })
                }
            }).catch(function(error) {
                    commit('set_Proccesing', false)
                    commit('set_Error', error.message) 
            });
        }
    },
    getters:{
        userId: (state) => state.user.uid,
        isUserAuth: (state) => state.user.isAuth,
        userName: (state) => state.user.name,
        userEmail: (state) => state.user.email
    }
}