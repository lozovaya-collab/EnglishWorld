<template>
    <div>
        <v-card>
        <v-img src="https://i.pinimg.com/564x/02/59/65/02596589af0e54292495d35f37d9626f.jpg"></v-img >
            <v-card-title primary-title>
                <div>
                    <h3 class="headline mb-0"><v-icon>person</v-icon> {{userName}}</h3>
                    <h3 class="headline mb-0"><v-icon>email</v-icon> {{userEmail}}</h3>
                </div>
            </v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" persistent max-width="500">
                    <template v-slot:activator={on}>
                        <v-btn   v-on="on" outlined large color="ownText" class="ownText--text"> Изменить </v-btn>
                    </template>
                    <v-card>
                        <v-card-title class="headline">Изменить ваши данные?</v-card-title>
                        <v-card-text>
                            <v-alert  class="font-weight-light" :value="get_Error" type="warning">
                                {{get_Error}}
                            </v-alert>
                                <v-form v-model="valid">
                                    <v-text-field class="font-weight-light" label="электронная почта" name="login" prepend-icon="mdi-account" type="text" required v-model="email" :rules="emailRules"></v-text-field>
                                    <v-text-field class="font-weight-light" id="password" label="пароль" name="password" prepend-icon="mdi-lock" type="password" required v-model="password" :rules="passwordRules"></v-text-field>
                                
                                <h3>Я хочу изменить</h3>
                                <v-radio-group v-model="changeType">
                                    <v-radio  label="Имя" :value="'name'"></v-radio>
                                    <v-text-field v-if="changeType =='name'" class="font-weight-light" label="Ваше новое имя" name="newName" prepend-icon="mdi-account" type="text" required v-model="newName" :rules="nameRules"></v-text-field>
                                    
                                    <v-radio  label="электронная почта" :value="'login'"></v-radio>
                                    <v-text-field v-if="changeType == 'login'" label="Ваша новая электронная почта" class="font-weight-light"  name="newLogin" prepend-icon="email" type="text" required v-model="newEmail" :rules="emailRules"></v-text-field>
                                    
                                    <v-radio  label="пароль" :value="'password'"></v-radio>
                                    <v-text-field v-if="changeType == 'password'" label="Ваш новый пароль " class="font-weight-light" id="password"  name="newPassword" prepend-icon="mdi-lock" type="password" required v-model="newPassword" :rules="passwordRules"></v-text-field>
                                </v-radio-group> 
                                </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="red darken-1" text @click="dialog = false">Отмена</v-btn>
                            <v-btn color="red darken-1" text @click.prevent="changeUserData" :disabled="get_Proccesing || !valid">Изменить</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog> 
            </v-card-actions>
        </v-card>    
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    
    export default {
        data(){
            return {
                dialog: false,
                email: null,
                changeType: 'name',
                password: null,
                newEmail: null,
                newPassword: null,
                newName: null,
                valid: false,
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
            ...mapGetters(['userName', 'userEmail', 'get_Proccesing', 'get_Error'])
        },
        methods:{
            changeUserData(){
                this.$store.dispatch('changeUserProfileData',{
                    email: this.email,
                    password: this.password,
                    newName: this.newName,
                    newEmail: this.newEmail,
                    newPassword: this.newPassword,
                    changeType: this.changeType

                })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>