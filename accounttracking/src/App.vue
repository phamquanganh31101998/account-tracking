<template>
  <v-app>
    <!-- <v-app-bar app>
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
                      <span>{{currentUser.displayName}}</span>
                      <br>
                      <span>{{currentUser.username}}</span>
                    </div>
                  </div>
                </v-col>
              </v-row>
              <br>
              
            </v-card-title>
            <v-card-text>
              
            </v-card-text>
            <v-card-actions>
              <v-container>
                <v-row>
                  <v-col xs="3" lg="3" offset-md="2">
                    <v-btn outlined rounded color="purple" large @click="logout()"><span>Logout</span></v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-toolbar-items>
    </v-app-bar>
    <br>
    <br> -->
    
    <v-row>
      <!-- <v-navigation-drawer v-model='drawer' :mini-variant.sync="mini" mini-variant-width="90" app dark class="">
        <v-list>
          <v-list-item-group>
            <v-list-item>
              <v-list-item-title class="title"><p class="font-weight-light">Adsplus</p></v-list-item-title>
              <v-btn icon @click.stop="mini = !mini">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-item>
            <v-divider />
            <v-list-item mobile-break-point="991">
              <v-list-item-icon>
                <i class="material-icons">dashboard</i>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="white--text font-weight-light">Dashboard</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer> -->
      <navBar v-if="showNavBar"></navBar>
        <v-col>
          <v-content>
            <router-view></router-view>
          </v-content>
        </v-col>
    </v-row>

    
  </v-app>
</template>

<script>
import { setInterval } from 'timers';
import axios from 'axios';
import navBar from './components/NavBar'
export default {
  name: 'App',
  components: {
    navBar
  },

  data: () => ({
    //
    name: '',
    email: '',
    // drawer: true,
    items: [
      { title: 'Home', icon: 'mdi-home-city' },
      { title: 'My Account', icon: 'mdi-account' },
      { title: 'Users', icon: 'mdi-account-group-outline' },
    ],
    // mini: true,
    currentUser: null,
    showNavBar: true
  }),
  watch: {
    // 'localStorage.getItem("user")'(){
    //   if(localStorage.getItem("user")){
    //     this.getAllUsers();
    //   }
    // }
    // 'this.$router.currentRoute'(){
    //   console.log(this.$router.currentRoute);
    //   if (this.$router.currentRoute == 'http://localhost:8080/login'){
    //     this.showNavBar = false;
    //   }
    //   else {
    //     this.showNavBar = true;
    //   }
    // }
  },
  mounted(){
    // const user = JSON.parse(localStorage.getItem('user')) ;
    // const displayName = user.displayName ;
    // const username = user.username ;
    // this.name = displayName ;
    // this.email = username ;
  },
  created(){
    // this.getCurrentUser();
    // this.getAllUsers();
  },
  methods: {
    logout(){
      this.$store.dispatch('logout');
    },
    getCurrentUser(){
      let currentUser = JSON.parse(localStorage.getItem('user'));
			console.log(currentUser);
    },
    getAllUsers(){
      // let users = [];
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
          // console.log(result.data.response);
					result.data.response.filter(element => {
						if(element.userId == JSON.parse(localStorage.getItem('user')).userId){
              this.currentUser = element;
            }
            // console.log(this.currentUser);
            // console.log(element.userId);
            // console.log(JSON.parse(localStorage.getItem('user')).userId);
          });
          console.log(this.currentUser);
        });
        
    }
  },
	computed: {
		hasToken(){
			if(localStorage.getItem('token')){
				return true;
			}
			else {
				return false;
			}
		}
  },
  created(){
    console.log();
  }
};
</script>
