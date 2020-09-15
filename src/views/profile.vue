<template>
    <v-container grid-list-md>
        <v-layout row wrap>
            <v-flex xs12 sm10 offset-sm1>
                <v-tabs v-model="tabMode" color="ownText" dark fixed-tabs slider-color="success">
                    <v-tab :key="'data'" ripple>
                        Мои данные
                    </v-tab>
                    <v-tab-item :key="'data'">
                        <user-profile-data></user-profile-data>
                    </v-tab-item>
                    
                </v-tabs>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import userProfileData from '../components/UserProfileData'
    export default {
        data(){
            return {
                tabMode: 'data'
            }
        },
        components:{
            userProfileData
        }
        
    }

</script>
<style scoped>

</style>