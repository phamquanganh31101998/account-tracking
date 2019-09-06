<template>
    <v-dialog
        persistent
        width="70%" v-model="mainUserDialog" >
        <!-- <template v-slot:activator="{ on }">
            <v-col class="d-flex" sm="4" md="4" xl="4" >
                <v-btn v-on="on" @click="getAllUsers()">Xem các tài khoản</v-btn>
            </v-col>
        </template> -->

        <v-card>
            <v-card-title
            class="headline grey lighten-2"
            primary-title
            >
            Các tài khoản hiện tại
            </v-card-title>

            <v-card-text>
                <v-row v-if="userLoadingProgress">
                    <v-col offset-md="6" offset-lg="6" xs="12" sm="12" md="6" lg="6">
                        <v-progress-circular
                            :size="70"
                            :width="7"
                            color="grey"
                            indeterminate
                        ></v-progress-circular>
                        
                    </v-col>
                </v-row>
                <v-row v-else>
                    <v-col>
                        <v-simple-table dense class="table">
                            <thead>
                            <tr>
                                <th class="text-left">ID</th>
                                <th class="text-left">Tên người dùng</th>
                                <th class="text-left">Email</th>
                                <th class="text-left">Chức vụ</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, key) in this.users" :key="key">
                                    <td>{{item.userId}}</td>
                                    <td>{{item.displayName}}</td>
                                    <td>{{item.email}}</td>
                                    <td>
                                        <!-- <v-dialog width="50%" v-model="item.userManagerDialog" v-if="!checkAdmin(item.role)">
                                            <template v-slot:activator="{ on }">
                                                <a @click.prevent="getAccountById(item.userId)" v-on="on">{{item.role}}</a>
                                            </template>
                                            <userManagerSettingDialog 
                                                @closeUserManagerSettingDialog="item.userManagerDialog = false" 
                                                :user="item" 
                                                :userManagerRelationships="userManagerRelationships"
                                                :users="users">
                                            </userManagerSettingDialog>
                                        </v-dialog> -->
                                        <userManagerSettingDialog v-if="!checkAdmin(item.role)"
                                            @closeUserManagerSettingDialog="closeUserManagerSettingDialog(item.userManagerDialog)" 
                                            :user="item" 
                                            :userManagerRelationships="userManagerRelationships"
                                            :users="users">
                                        </userManagerSettingDialog>
                                        <v-tooltip bottom v-else>
                                            <template v-slot:activator="{ on }">
                                                <a v-on="on">{{item.role}}</a>
                                            </template>
                                            <span>Admin có thể quản lý mọi tài khoản</span>
                                        </v-tooltip>
                                    </td>
                                </tr>
                            </tbody>
                        </v-simple-table>
                    </v-col>
                </v-row>
            </v-card-text>

            <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn
                    color="red"
                    text
                    @click="turnOffMainUserDialog()"
                >
                    Cancel
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import userManagerSettingDialog from './UserManagerSettingDialog'
export default {
    components: {
        userManagerSettingDialog,
    },
    data(){
        return{
            users: [],
            userManagerRelationships: [],
            userLoadingProgress: false,
        }
    },
    computed: {
        ...mapGetters({
            mainUserDialog: 'mainUserDialog'
			// ...
		})
    },
    methods: {
        getAllUsers(){
			this.users = [];
			this.userLoadingProgress = true;
			const user = JSON.parse(localStorage.getItem("user"));
			const userId = JSON.stringify(user.userId);
			const url = `http://dev.adstech.vn:8084/trackings/v1/admin/${userId}/users`;
			axios.get(url, {
					params: {
						type: this.type
					},
					headers: {
						Accept: "application/json",
						Authorization: "Bearer " + localStorage.getItem("token")
					}
				})
				.then(result => {
					result.data.response.filter(element => {
						let obj = {
							userId: element.userId,
							displayName: element.displayName,
							email: element.email,
							role: this.getRole(element.roleId),
							roleId: element.roleId,
							userManagerDialog: false
						}
						this.users.push(obj);
					});
					this.userLoadingProgress = false;
					this.getUserManagerRelationships();
				});
        },
        checkAdmin(role){
			if(role=="Admin"){
				return true;
			}
			else{
				return false;
			}
        },
        closeUserManagerSettingDialog(dialogId){
			dialogId = false;
			this.getAllUsers();
        },
        getUserManagerRelationships(){
			this.userManagerRelationships = [];
			const user = JSON.parse(localStorage.getItem("user"));
			const userId = JSON.stringify(user.userId);
			const url = `http://dev.adstech.vn:8084/trackings/v1/admin/${userId}/user-managers`;
			axios.get(url, {
					headers: {
						Accept: "application/json",
						Authorization: "Bearer " + localStorage.getItem("token")
					}
				})
				.then(result => {
					this.userManagerRelationships = result.data.response;
				});
        },
        getRole(roleId){
			switch(roleId){
				case 3: 
					return 'Admin';
				case 4:
					return 'Technical'
				case 5:
					return 'Sale'
			};
        },
        turnOffMainUserDialog(){
            this.$store.dispatch('turnOffMainUserDialog');
        }
    },
    created(){
        this.getAllUsers();
    }
}
</script>
<style>

</style>