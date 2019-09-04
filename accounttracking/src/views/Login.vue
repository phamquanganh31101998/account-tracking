<template>
    <div class="home">
        <v-content>
            <v-container>
                <v-row>
                    <v-flex xs12 sm12 md4 lg4 xl4 offset-md4 offset-lg4 offset-xl4 >
                        <v-card flat>
                            <!-- <v-img
                            src="https://www.google.com.vn/search?tbm=isch&q=adsplus#imgrc=5JxHPHMDIdDwcM:"
                            lazy-src="https://www.google.com.vn/search?tbm=isch&q=adsplus#imgrc=5JxHPHMDIdDwcM:"
                            aspect-ratio="1"
                            class="grey lighten-2"
                            max-width="500"
                            max-height="300"
                            ></v-img> -->
                            <v-card-title class="text-center"></v-card-title>
                            <v-card-text class="text-center">
                                <h1>ADSPLUS LOGIN PAGE HERE</h1>
                                <br>
                                <br>
                                <p>Press login to access data</p>
                            </v-card-text>
                            <v-card-actions class="text-center">
                                <v-container>
                                    <v-row>
                                        <v-col>
                                            <v-btn text rounded outlined color="indigo" @click="login()">Login Here</v-btn>
                                        </v-col>
                                    </v-row>
                                </v-container>
                                
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-row>
            </v-container>
        </v-content>
    </div>
</template>

<script>
// @ is an alias to /src
import config from '../config'
export default {
    props: {
        token: {
            type: String,
            default: '',
        }
    },
    name: 'home',
    components: {

    },
    methods: {
        login() {
            window.location.href = this.ssoUrl
        },
        handleSubmit() {
            if (this.token) {
                this.$store.dispatch('login', this.token)
            }
        }
    },
    computed: {
        ssoUrl() {
            return `${config.ssoUrl}login`
        },
    },
    mounted() {
        if (this.token) 
            this.handleSubmit()
        if (this.$store.state.token) {
            this.$router.push('/')
        }
    }
}
</script>
