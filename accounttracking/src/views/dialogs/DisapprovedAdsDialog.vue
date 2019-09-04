<template>
    <v-dialog width="70%" v-model="disapprovedAdsDialog" @click:outside="closeDisapprovedAdsDialog()">
        <!-- <template v-slot:activator="{ on }">
            <i class="material-icons" :style="checkNumberColor(numOfDisapprovedAds)">brightness_1</i>
            <a @click.prevent="getDisapprovedAds(customerId)" v-on="on" style="color: blue;">{{ numOfDisapprovedAds }}</a>
        </template> -->
        <v-card>
            <v-card-title
                primary-title
            >Quảng cáo bị từ chối
            </v-card-title>
            <v-card-text>
                <v-row v-if="disapprovedAdsProgress">
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
                        <td>Tên Campaign</td>
                        <td>Tên nhóm quảng cáo</td>
                        <td>Mẫu quảng cáo</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, i) in disapprovedAds" :key="item.id">
                        <td>{{i+1}}</td>
                        <td>{{item.campaignName}}</td>
                        <td>{{item.adGroupName}}</td>
                        <td>
                            {{item.adType}}
                        </td>
                        </tr>
                    </tbody>
                </v-simple-table>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
<script>
//import { mapGetters } from 'vuex'
import config from '../../config'
import axios from 'axios'
export default {
    props: {
        numOfDisapprovedAds: {
            type: Number
        },
        customerId: {
            type: Number
        },
        // disapprovedAdsDialog: {
        //     type: Boolean
        // }
    },
    data(){
        return{
            disapprovedAds: [],
            disapprovedAdsProgress: false,
            disapprovedAdsDialog: false
        }
    },
    // computed: {
    //     ...mapGetters({
    //         // disapprovedAds: 'disapprovedAds',
    //         // disapprovedAdsProgress: 'disapprovedAdsProgress',
    //         // disapprovedAdsDialog: 'disapprovedAdsDialog'
    //         // ...
    //         // disapprovedAdsId: 'disapprovedAdsId'
	// 	})
    // },
    watch:{
        '$store.state.disapprovedAdsId': function(){
            // console.log(this.$store.state.disapprovedAdsId);
            if(this.$store.state.disapprovedAdsId == 0){
                return;
            }
            else{
                this.getDisapprovedAds(this.$store.state.disapprovedAdsId);
            }
            
        }
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
        getDisapprovedAds(customerId){
            this.disapprovedAds = [];
            this.disapprovedAdsDialog = true;
			this.disapprovedAdsProgress = true;
			const user = JSON.parse(localStorage.getItem("user"));
			const userId = JSON.stringify(user.userId);
			const url = `${config.apiUrl}${userId}/disapproved-ads`;
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
					this.disapprovedAds = result.data.response;
					this.disapprovedAdsProgress = false;
				});
			// this.$store.dispatch('getDisapprovedAds', customerId);
        },
        closeDisapprovedAdsDialog(){
            // this.$emit('closeDisapprovedAdsDialog');
            this.$store.dispatch('turnOffDisapprovedAdsDialog');
            this.disapprovedAdsDialog = false;
        }
    },
    created(){
        // this.getDisapprovedAds(this.customerId);
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