<template>

   
     <v-simple-table >
      
        <template v-slot:default>
        <thead>
        
            <tr>
            <th class="text-left">Слово</th>
            <th class="text-left">Перевод</th>
            </tr>
        </thead>
        <tbody>
        
            <tr v-for="word in words" :key="word.id">
            <td>{{ word.isWord }}</td>
            <td>{{ word.translation }}</td>
            </tr>
        </tbody>
        
        <v-dialog v-model="dialog" persistent max-width="500">
                    <template v-slot:activator={on}>
                   
                <v-btn   v-on="on"  outlined color="ownText">Добавить слово</v-btn>
                </template>
                    <v-card>
                        <v-card-title class="headline">Хотите добавить слово?</v-card-title>
                        <v-card-text>
                        
                        <v-form v-model="valid">
                                    <v-text-field class="font-weight-light" label="введите слово" name="isWord"  type="text" required v-model="isWord" :rules="wordsRules"></v-text-field>
                                    <v-text-field class="font-weight-light" label="введите перевод" name="translation" prepend-icon="translate" type="text" required v-model="translation" :rules="wordsRules"></v-text-field>
                                
                      </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="red darken-1" text @click="dialog = false">Отмена</v-btn>
                            <v-btn color="red darken-1" text @click.prevent="addWord" :disabled="proccesing || !valid" @click="dialog = false">Добавить</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog> 
        
        </template>
        
  </v-simple-table>

</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        
        data(){
            return {
                dialog: false,
                isWord: null,
                translation: null,
                valid: false,
                wordsRules: [
                    (v) => !!v || "Пожалуйста, введите cлово"
                ]
            }
        },
        computed:{
            proccesing(){
                return this.$store.getters.get_Proccesing
            },
            words(){
                return this.$store.getters.getWords
            },
            ...mapGetters(['get_Proccesing'])
        },
        methods:{
            addWord(){
                this.$store.dispatch('addUserProfileWord',{
                    isWord: this.isWord,
                    translation: this.translation

                })
                
            } 
        }

    }
</script>

<style lang="scss" scoped>

</style>