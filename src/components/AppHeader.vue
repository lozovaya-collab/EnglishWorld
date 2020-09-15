<template>
    <div>
        <v-navigation-drawer   color="red darken-2" dark absolute temporary v-model="drawer" class="hidden-md-and-up">
            <v-list>
                <v-list-item v-for="(item, i) in menuItems" :key="`navDrawer${i}`" :to="item.route">
                    <v-list-item-action>
                        <v-icon v-html="item.icon"></v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.title"></v-list-item-title>
                    </v-list-item-content>
                    <v-list-item v-for="(item, i) in menuItems" :key="`navDrawer${i}`" :to="item.route">
                    <v-list-item-action>
                        <v-icon v-html="item.icon"></v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.title"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar flat  app  class="ownTheme">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>
            <router-link to="/" tag="span" style="cursor:pointer">
             <v-toolbar-title v-text="'EnglishWorld'"></v-toolbar-title>
            </router-link>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn depressed class="ownTheme" v-for="(item, i) in menuItems"  :key="`menuitem${i}`" :to="item.route">
                    <v-icon  v-html="item.icon" left>  </v-icon>
                    {{item.title}}
                </v-btn>
                <v-btn  depressed class="ownTheme" @click.prevent="LogOut" v-if="isUserAuth">
                    <v-icon  left> exit_to_app  </v-icon>
                    Выйти
                </v-btn>
            </v-toolbar-items>
        </v-app-bar>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                drawer: false
            }
        },
        computed:{
            isUserAuth(){
                return this.$store.getters.isUserAuth
            },
            menuItems(){
                return this.isUserAuth
                    ? [
                    {
                        icon: 'book',
                        title: 'Книги',
                        route: '/Books',
                    },
                    {
                        icon: 'visibility',
                        title: 'Фильмы',
                        route: '/movies',
                    },
                    {
                        icon: 'extension',
                        title: 'Словарь',
                        route: '/words',
                    },
                    
                    {
                        icon: 'account_circle',
                        title: 'Личный кабинет',
                        route: '/profile',
                    },


                ] :
                [
                     {
                        icon: 'book',
                        title: 'Книги',
                        route: '/Books',
                     },
                     {
                        icon: 'input',
                        title: 'Войти',
                        route: '/LogIn',
                     },
                     {
                        icon: 'lock_open',
                        title: 'Зарегистрироваться',
                        route: '/registered',
                     }

                ]
            }
        },
        methods:{
            LogOut(){
                this.$confirm('Вы устали. Хотите продолжить в следующий раз?').then(res => {
                    if(res) this.$store.dispatch('LogOut')
                })

            }
        }
    }
</script>

<style scoped>

</style>