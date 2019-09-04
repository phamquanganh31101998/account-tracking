<template>
    <v-dialog width="70%" v-model="missingAdsDialog" @click:outside="closeMissingAdsDialog()">
        <!-- <template v-slot:activator="{ on }">
            <i class="material-icons" :style="checkNumberColor(numOfAdGroupMissingAds)">lens</i>
            <a @click.prevent="getMissingAds(customerId)" v-on="on" style="color: blue;">{{ numOfAdGroupMissingAds }}</a>
        </template> -->
        <v-card>
            <v-card-title primary-title>
                AdGroup bị thiếu mẫu quảng cáo
            </v-card-title>
            <v-card-text>
                <v-row v-if="missingAdsProgress">
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
                            <td>Số quảng cáo bị thiếu</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, i) in missingAds" :key="item.id">
                            <td>{{i+1}}</td>
                            <td>{{item.campaignName}}</td>
                            <td>{{item.adGroupName}}</td>
                            <td>
                            {{item.numOfMissingExpandedTextAds}}
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
import { mapGetters } from 'vuex'
import config from '../../config'
import axios from 'axios'
export default {
    // props:{
    //     numOfAdGroupMissingAds: {
    //         type: Number
    //     },
    //     customerId: {
    //         type: Number
    //     },
    //     missingAdsDialog: {
    //         type: Boolean
    //     }
    // },
    data(){
        return{
            missingAds: null,
            missingAdsProgress: false,
            missingAdsDialog: false
        }
    },
    // computed: {
    //     ...mapGetters({
    //         missingAds: 'missingAds',
    //         missingAdsProgress: 'missingAdsProgress'
	// 		// ...
	// 	})
    // },
    watch: {
        '$store.state.missingAdsId'(){
            if(this.$store.state.missingAdsId == 0){
                this.missingAdsDialog = false;
            }
            else{
                this.getMissingAds(this.$store.state.missingAdsId);
            }
        },
    },
    methods: {
        checkNumberColor(number){
			if (number == 0){
				return "color: #34BFA3;"
			}
			else {
				return "color: #F4516C;"
			}
        },
        getMissingAds(customerId){
            this.missingAds = [];
            this.missingAdsDialog = true;
			this.missingAdsProgress = true;
			const user = JSON.parse(localStorage.getItem("user"));
			const userId = JSON.stringify(user.userId);
			const url = `${config.apiUrl}${userId}/missing-ads`;
			axios.get(url, {
				params: {
					cId: customerId
				},
				headers: {
					Accept: "application/json",
					Authorization: "Bearer " +localStorage.getItem("token")
				}
				})
				.then(result => {
					this.missingAds = result.data.response;
					this.missingAdsProgress = false;
				});
        },
        closeMissingAdsDialog(){
            // this.$emit('closeMissingAdsDialog');
            this.$store.dispatch('turnOffMissingAdsDialog');
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