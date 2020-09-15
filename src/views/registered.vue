<template>
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="6">
                <v-card class="elevation-12">
                    <v-app-bar class="font-weight-medium" color="light" src="../assets/title.jpg" >
                        <v-spacer class="d-flex justify-space-around">
                            <v-toolbar-title  class="ownTheme--text" >Регистрация </v-toolbar-title>
                        </v-spacer>
                    </v-app-bar>
                    <v-card-text>
                        <v-alert  class="font-weight-light" :value="error" type="warning">
                            {{error}}
                        </v-alert>
                        <v-form v-model="valid">
                            <v-text-field class="font-weight-light" label="Имя" name="name" prepend-icon="mdi-account" type="text" required v-model="name" :rules="nameRules"></v-text-field>
                            <v-text-field  class="font-weight-light" label="электронная почта" name="login" prepend-icon="email" type="text" required v-model="email" :rules="emailRules"></v-text-field>
                            <v-text-field  class="font-weight-light" id="password" label="пароль" name="password" prepend-icon="mdi-lock" type="password" required v-model="password" :rules="passwordRules"></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions class="my-2">
                        <v-spacer></v-spacer>
                        <v-btn  outlined large color="ownText" class="ownText--text" @click.prevent="registered" :disabled="proccesing || !valid">Зарегистрироваться</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        data(){
            return{
                email: null,
                password: null,
                valid: false,
                name: null,
                nameRules: [
                    (v) => !!v || "Пожалуйста, введите ваше имя"
                ],
                emailRules: [
                    (v) => !!v || "Пожалуйста, введите электронную почту", // если значение поля нет
                    (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || "Неправильная электронная почта" // проверка на корректроность почты
                ],
                passwordRules: [
                    (v) => !!v || "Пожалуйста, введите пароль", // если значения поля нет
                    (v) => (v && v.length >= 6) || "Пароль слишком короткий - минимум 6 символов" // проверка на корректность пароля
                ]
            }
        },
        computed:{
            error() {
                return this.$store.getters.get_Error
            },
            proccesing(){
                return this.$store.getters.get_Proccesing
            },
            isUserAuth(){
                return this.$store.getters.isUserAuth
            }
        },
        watch:{
            isUserAuth(val){ // если пользователь существует и авторизован перебрасываем его на главную страницу
                if(val === true)
                    this.$router.push("/")
            }
        },
        methods:{
            registered() {
                this.$store.dispatch('registered', {email: this.email, password: this.password, name: this.name})
            }
        },

    }
</script>

<style scoped>

</style>