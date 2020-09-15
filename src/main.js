import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import vuetify from './plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import firebaseConfig from "./config/firebase"
import firebase from 'firebase'
import "firebase/firestore"
import VuetifyConfirm from 'vuetify-confirm'


Vue.use(Vuetify)

Vue.config.productionTip = false


const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore();


Vue.$db = db

Vue.use(VuetifyConfirm, {
  vuetify,
  buttonTrueText: 'Да',
  buttonFalseText: 'Нет',
  width: 450,
  property: '$confirm'
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created(){
    let vm = this
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        vm.$store.dispatch('state_Changed', user)
        vm.$store.dispatch('load_Words', user);
      }
    });
    
    this.$store.dispatch('load_Books');
    this.$store.dispatch('load_Movies');
    
  }
}).$mount('#app')


