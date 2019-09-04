<template>
    <v-dialog width="70%" v-model="missingExtensionsDialog" @click:outside="closeMissingExtensionsDialog()">
        <!-- <template v-slot:activator="{ on }">
            <i class="material-icons" :style="checkNumberColor(numOfAdGroupMissingExtensions)">brightness_1</i>
            <a @click.prevent="getMissingExtensions(customerId)" v-on="on" style="color: blue;">{{ numOfAdGroupMissingExtensions }}</a>
        </template> -->
       <v-card>
            <v-card-title primary-title
                >AdGroup bị thiếu tiện ích mở rộng</v-card-title>
            <v-card-text>
                <v-row v-if="missingExtensionsProgress">
                    <v-col sm="8" offset-sm="6" md="6" offset-md="6" lg="4" offset-lg="6">
                        <v-progress-circular
                            :size="70"
                            :width="7"
                            color="grey"
                            indeterminate
                        ></v-progress-circular>
                    </v-col>
                </v-row>
                <v-simple-table v-else>
                    <thead>
                    <tr style="font-size: 20px;">
                        <td>#</td>
                        <td>Campaign</td>
                        <td>Nhóm quảng cáo</td>
                        <td>Call Extension</td>
                        <td>Callout Extension</td>
                        <td>Site Link Extension</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, i) in missingExtensions" :key="item.id">
                        <td>{{i+1}}</td>
                        <td>{{item.campaignName}}</td>
                        <td>{{item.adGroupName}}</td>
                        <td>
                        <i class="material-icons" :style="checkMissingColor(item.missingCallExtension)">{{checkMissingIcon(item.missingCallExtension)}}</i>
                        </td>
                        <td>
                        <i class="material-icons" :style="checkMissingColor(item.missingCalloutExtension)">{{checkMissingIcon(item.missingCalloutExtension)}}</i>
                        </td>
                        <td>
                        <i class="material-icons" :style="checkMissingColor(item.missingSiteLinkExtension)">{{checkMissingIcon(item.missingSiteLinkExtension)}}</i>
                        </td>
                    </tr>
                    </tbody>
                </v-simple-table>
            </v-card-text>
            <v-divider></v-divider>
        </v-card>
    </v-dialog>
</template>
<script>
import { mapGetters } from 'vuex';
import config from '../../config'
import axios from 'axios'
export default {
    // props: {
    //     numOfAdGroupMissingExtensions: {
    //         type: Number
    //     },
    //     customerId: {
    //         type: Number
    //     },
    //     missingExtensionsDialog: {
    //         type: Boolean
    //     }
    // },
    data() {
        return{
            missingExtensions: [],
            missingExtensionsProgress: false,
            missingExtensionsDialog: false
        }
    },
    watch: {
        '$store.state.missingExtensionsId'(){
            if(this.$store.state.missingExtensionsId == 0){
                this.missingExtensionsDialog = false;
            }
            else{
                this.getMissingExtensions(this.$store.state.missingExtensionsId);
            }
        },
    },
    // computed: {
    //     ...mapGetters({
    //         missingExtensions: 'missingExtensions',
    //         missingExtensionsProgress: 'missingExtensionsProgress'
	// 		// ...
	// 	})
    // },
    methods:{
        checkMissingColor(value) {
			if (value == true){
				return "color: #F4516C;"
			}
			else {
				return "color: #34BFA3;"
			}
		},
		checkMissingIcon(value){
			if (value == true){
				return "clear"
			}
			else {
				return "done"
			}
        },
        getMissingExtensions(customerId){
            // this.$store.dispatch('getMissingExtensions', customerId);
            this.missingExtensions = null;
            this.missingExtensionsDialog = true;
			this.missingExtensionsProgress = true;
			// const userId = state.user.userId;
			const user = JSON.parse(localStorage.getItem("user"));
			const userId = JSON.stringify(user.userId);
			const url = `${config.apiUrl}${userId}/missing-extensions`;
			axios.get(url, {
				params: {
					cId: customerId
				},
				headers: {
					Accept: "application/json",
					Authorization: "Bearer " + localStorage.getItem("token")
				}
				})
				.then(result => {
					this.missingExtensions = result.data.response;
					this.missingExtensionsProgress = false;
				});
        },
        checkNumberColor(number){
			if (number == 0){
				return "color: #34BFA3;"
			}
			else {
				return "color: #F4516C;"
			}
        },
        closeMissingExtensionsDialog(){
            this.$store.dispatch('turnOffMissingExtensionsDialog');
            // this.$emit('closeMissingExtensionsDialog');
        }
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