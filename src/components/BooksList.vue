<template>
    <v-container grid-list-md>
        <v-layout row wrap>
            <v-flex md8 offset-sm-1 sm10 xs12 offset-md-2>
                <v-container fluid>
                    <v-layout row>
                        <v-flex xs7 md8>
                            <v-text-field label="Поиск" v-model="search"></v-text-field>
                        </v-flex>
                        <v-flex xs5 md3>
                            <v-select label="Уровень" :items="levels" v-model="level" multiple></v-select>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-flex>
            <v-flex v-for="book in filtered_books"  :key="book.id" md8 offset-sm1 sm10 xs12 offset-md2>
                <v-card    color="ownText" class="ownTheme--text">
                    <v-container fluid>
                        <v-layout row class="hidden-sm-and-down">
                            <v-flex xs4 md3>
                                <v-img :src="book.imageLink" >
                                </v-img>
                            </v-flex>
                            <v-flex xs8 md9>
                                <v-card-title>
                                    <div>
                                        <div  class="headline">
                                            {{book.title}}
                                        </div>
                                        <blockquote class="blockquote">
                                            {{book.description}}
                                        </blockquote>
<!--                                        <v-divider class="ownTheme"></v-divider>-->
                                        <div> Уровень: {{get_BookLevel(book.level)}}</div>
                                    </div>
                                </v-card-title>
                                <v-card-actions>
                                    <!-- <v-rating  v-model="book.rating" color="yellow lighten-2"  readonly half-increments></v-rating>
                                    <div class="ml-1">
                                        <span>{{book.rating}}</span>
                                        <span>/5</span>
                                    </div> -->
                                    
                            
                                    <v-spacer></v-spacer>
                                    <v-btn   color="ownTheme" large outlined class="ownTheme--text"   :href="book.linkForDownload">Купить</v-btn>
                                </v-card-actions>
                            </v-flex>
                        </v-layout>
                        <div class="hidden-md-and-up">

                            <v-layout row class="hidden-md-and-up">
                                <v-flex xs4 md3>
                                    <v-img :src="book.imageLink" >
                                    </v-img>
                                </v-flex>
                                <v-flex xs8 md9>
                                    <v-card-title>
                                        <div>
                                            <div  class="headline">
                                                {{book.title}}
                                            </div>
                                        </div>
                                    </v-card-title>
                                </v-flex>
                                <v-layout row>
                                    <v-flex xs12>
                                        <blockquote class="blockquote">
                                            {{book.description}}
                                        </blockquote>
                                    </v-flex>
                                </v-layout>
                                <v-flex x12>
                                    <div> Уровень: {{get_BookLevel(book.level)}}</div>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs12>
                                    <v-card-actions>
                                        <!-- <v-rating  v-model="book.rating" color="yellow lighten-2"  readonly half-increments></v-rating>
                                        <div class="ml-1">
                                            <span>{{book.rating}}</span>
                                            <span>/5</span>
                                        </div> -->
                                      
                                        <v-spacer></v-spacer>
                                        <v-btn   color="ownTheme" large outlined class="ownTheme--text"   :href="book.linkForDownload">Купить</v-btn>
                                    </v-card-actions>
                                </v-flex>
                            </v-layout>
                        </div>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    
    export default {
        data(){
            return {
                search: null,
                level: [],
                levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
            }
        },
        computed:{
            books(){
                return this.$store.getters.get_Books
            },
            filtered_books(){
                let books = this.books
                if(this.search){
                    books = books.filter(b => b.title.toLowerCase().indexOf(this.search.toLowerCase()) >=0 || b.description.toLowerCase().indexOf(this.search.toLowerCase()) >=0 )
                }
                if(this.level.length){
                    books = books.filter( b => this.level.filter(val => b.level.indexOf(val) !== -1).length > 0)
                }
                return books
            }
        },
        methods:{
            get_BookLevel(level){
                return level.join('/')
            }
        }


    }
</script>

<style scoped>

</style>