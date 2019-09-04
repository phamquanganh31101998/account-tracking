<template>
    <v-dialog width="50%" v-model="user.userManagerDialog">
        <template v-slot:activator="{ on }">
            <a v-on="on" @click="addUserToSelectComponent()">{{user.role}}</a>
        </template>
        <v-card>
            <v-card-title
                class="headline grey lighten-2"
                primary-title
                >
                Các tài khoản thuộc quyền quản lý
            </v-card-title>

            <v-card-text>
                <v-row>
                    <v-col xs="10" lg="10">
                        <v-select label="Chọn tài khoản" :items="selectableUser" v-model="selectUserId"></v-select>
                    </v-col>
                    <v-col xs="2" lg="2">
                        <v-btn color="green" dark @click="addUserToTheList()">Thêm</v-btn>
                    </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row>
                    <v-col>
                        <p>Các tài khoản thuộc quyền quản lý hiện tại</p>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-simple-table dense class="table">
                            <thead>
                                <tr>
                                    <th>
                                        ID
                                    </th>
                                    <th>
                                        Tên tài khoản
                                    </th>
                                    <th>
                                        Xóa
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="u in selectedUser" :key="u.text">
                                    <td>
                                        {{u.value}}
                                    </td>
                                    <td>
                                        {{u.text}}
                                    </td>
                                    <td>
                                        <a @click.prevent="deleteUserFromTheList(u.value)"><i class="material-icons" style="color: red;">clear</i></a>
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
                    color="green"
                    text
                    @click="updateUserManagerRelationships()"
                >
                    Save
                </v-btn>
                <v-btn
                    color="red"
                    text
                    @click="closeUserManagerSettingDialog()"
                >
                    Cancel
                </v-btn>
            </v-card-actions>
        </v-card>
	</v-dialog>
</template>
<script>
import axios from 'axios'
export default {
    props: {
        user: {
            type: Object
        },
        users: {
            type: Array
        },
        userManagerRelationships: {
            type: Array
        },
    },
    data(){
        return{
            //các user có thể chọn để quản lý
            selectableUser: [],
            //các userId đã có 
            selectedUser: [],
            //tổng 2 mảng trên + id của tài khoản hiện tại bằng users mà prop đc,
            selectUserId: 0
        }
    },
    computed: {

    },
    watch: {
        selectUserId(){
            
        }
    },
    methods: {
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
        closeUserManagerSettingDialog(){
            this.$emit('closeUserManagerSettingDialog');
        },
        getUserById(id){
            var result = {};
			this.users.filter(element => {
				if(element.userId == id){
                    result = element;
				}
            });
            return result;
        },
        //Kiểm tra xem đã có quan hệ chưa
        checkHasRelationship(){
            let found = false;
            this.userManagerRelationships.filter(element => {
                if(this.user.userId == element.managerId){
                    found = true;
                }
            });
            return found;
        },
        //Nếu chưa có quan hệ nào thì add hết vào selectableUser, nếu đã có thì bỏ các user đã có
        addUserToSelectComponent(){
            // this.getUserManagerRelationships();
            this.selectableUser = [];
            this.selectedUser = [];
            //Đã có quản lý
            if(this.checkHasRelationship(this.user.userId) == true){
                //Lấy mảng các userId trong 1 quan hệ của managerId (để loại bỏ các user có userId này)
                var userIdsArrayOfRelationship = [];
                this.userManagerRelationships.filter(e => {
                    if(this.user.userId == e.managerId){
                        userIdsArrayOfRelationship = e.userIds
                    }
                })
                
                //Lấy danh sách các user cần loại bỏ (đã có trong quan hệ hoặc là chính nó)

                let removeUserArray = [];
                userIdsArrayOfRelationship.filter(e => {
                    let obj = this.getUserById(e)
                    removeUserArray.push(obj);
                    let selectedObj = {
                        text: obj.displayName,
                        value: obj.userId
                    }
                    this.selectedUser.push(selectedObj);
                })
                removeUserArray.push(this.user);

                let resultArray = this.users.filter(function(e){
                    return this.indexOf(e) < 0;
                }, removeUserArray);

                resultArray.filter(element => {
                    if(element.roleId == this.user.roleId){
                        let object = {
                            text: element.userId + "/ " + element.displayName,
                            value: element.userId
                        }
                        this.selectableUser.push(object);
                    }
                })
                
            }
            //Chưa có: add hết các user có cùng roleId
            else{
                this.users.filter(element => {
                    //Phải bỏ chính user đó đi (điều kiện sau)
                    if(element.roleId == this.user.roleId && this.user.userId != element.userId){
                        let object = {
                            text: element.displayName,
                            value: element.userId
                        }
                        this.selectableUser.push(object);
                    }
                });
                // console.log(this.selectableUser);
            }
        },
        logging(){
            console.log(this.selectableUser);
            console.log(this.selectedUser);
            console.log(this.selectUserId);
        },
        getSelectableUserById(id){
            let result = {};
            this.selectableUser.filter(e => {
                if(e.value == id){
                    result = e;
                }
            })
            return result;
        },
        getSelectedUserById(id){
            let result = {};
            this.selectedUser.filter(e => {
                if(e.value == id){
                    result = e;
                }
            })
            return result;
        },
        addUserToTheList(){
            if(this.selectUserId == 0){
                return;
            }
            else{
                let selectUser = this.getSelectableUserById(this.selectUserId);
                // this.selectableUser.filter(e => {
                //     if (e === selectUser){
                //         this.selectableUser.splice()
                //     }
                // })
                // dùng vòng for
                for (let i = 0; i<this.selectableUser.length; i++){
                    if(this.selectableUser[i] === selectUser){
                        this.selectableUser.splice(i, 1);
                    }
                }
                this.selectableUser = [...this.selectableUser];
                this.selectedUser.unshift(selectUser);
                this.selectedUser = [...this.selectedUser];
                this.selectUserId = 0;
            }
        },
        deleteUserFromTheList(id){
            let selectUser = this.getSelectedUserById(id);
            for (let i = 0; i<this.selectedUser.length; i++){
                if(this.selectedUser[i] === selectUser){
                    this.selectedUser.splice(i, 1);
                }
            }
            this.selectedUser = [...this.selectedUser];
            this.selectableUser.unshift(selectUser);
            this.selectableUser = [...this.selectableUser];
        },
        updateUserManagerRelationships(){
            // console.log(this.user.userId);
            // console.log(this.selectedUser);
            let user = JSON.parse(localStorage.getItem("user"));
			const userId = JSON.stringify(user.userId);
            const url = `http://dev.adstech.vn:8084/trackings/v1/admin/${userId}/user-managers`;
            const userIds = [];
            this.selectedUser.filter(e => {
                userIds.push(e.value);
            })
            let obj = {
                "managerId": this.user.userId,
                "userIds": userIds
            };
            const data = [];
            data.push(obj);

            axios({
				method: "POST",
				url: url,
				headers: {
					Accept: "application/json",
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
				data: data
			}).then(result => {
                console.log(result);
                this.closeUserManagerSettingDialog();
				// if (result.data.code == "success"){
				// 	this.setThresholdDialog = false;
				// 	this.successDialog = true;
				// }
				// else {
				// 	this.setThresholdDialog = false;
				// 	this.failDialog = true;
				// }
			});
        }
    },
    created(){

    }
}
</script>
<style>
    .table {
	border-collapse: collapse;
	width: 100%;
	border: 1px solid rgb(255, 255, 255);
	table-layout: fixed;
	white-space: nowrap;
	}

	.table th{
		background-color: rgb(255, 255, 255);
	}
	
	.table tr:hover{
		background-color: rgb(238, 160, 160);
	}
</style>