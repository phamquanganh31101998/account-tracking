<template>
    <v-app-bar app>
        <v-toolbar-title class="headline text-uppercase">
            <span></span>
            <span class="font-weight-light"></span>
        </v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items>
            <v-menu offset-y>
                <template v-slot:activator="{on}">
                    <v-btn text v-on="on">
                        <v-avatar>
                            <img
                            :src="currentUser.imageUrl"
                            :alt="currentUser.userId"
                            >
                        </v-avatar>
                    </v-btn>
                </template>
                <v-card width="100%">
                    <v-card-title>
                        <v-row row>
                            <v-col xs="1" sm="1" md="1" lg="1">
                            <v-avatar>
                                <img
                                :src="currentUser.imageUrl"
                                :alt="currentUser.userId"
                                >
                            </v-avatar>
                            </v-col>
                            <v-col offset-xs="2" offset-sm="2" offset-md="2" offset-lg="2">
                            <div>
                                <div class="body-1">
                                    <p class="font-weight-bold">{{currentUser.displayName}}</p>
                                    <br>
                                    <p class="font-weight-regular body-2">{{currentUser.username}}</p>
                                </div>
                            </div>
                            </v-col>
                        </v-row>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-list>
                            <v-list-item>
                            <v-list-item-icon>
                                <v-icon>account_circle</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>Profile</v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                            <v-list-item-icon>
                                <v-icon>settings</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>Setting</v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-container>
                            <v-row>
                            <v-col xs="6" lg="6" offset-md="2">
                                <v-btn outlined rounded color="red" large @click="logout()" block>
                                    <span>
                                        Logout
                                        <i class="material-icons" style="outlined" outlined>send</i>
                                    </span>
                                </v-btn>
                            </v-col>
                            </v-row>
                        </v-container>
                    </v-card-actions>
                </v-card>
            </v-menu>
        </v-toolbar-items>
    </v-app-bar>
</template>
<script>
import config from '../config'
import axios from 'axios'
export default {
    data(){
        return{
            currentUser: null
        }
    },
    methods: {
        logout(){
			this.$store.dispatch('logout');
		},
        getCurrentUser(){
			const user = JSON.parse(localStorage.getItem("user"));
			const userId = JSON.stringify(user.userId);
			const url = `http://dev.adstech.vn:8084/trackings/v1/admin/${userId}/users`;
			axios.get(url, {
					headers: {
						Accept: "application/json",
						Authorization: "Bearer " + localStorage.getItem("token")
					}
				})
				.then(result => {
					result.data.response.filter(element => {
						if(element.userId == JSON.parse(localStorage.getItem('user')).userId){
              				this.currentUser = element;	
            			}
          			});
        	});
		},
    },
    created(){
        this.getCurrentUser();
    }
}
</script>

<style>

</style>