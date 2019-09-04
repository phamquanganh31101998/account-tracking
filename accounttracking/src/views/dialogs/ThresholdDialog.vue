<template>
    <v-dialog @click:outside="closeThresholdDialog()"
        v-model="setThresholdDialog"
        width="500"
		
        >
        <!-- <template v-slot:activator="{ on }">
            <v-col class="d-flex" sm="2" md="2" xl="2" >
                <v-btn v-on="on" @click="getThreshold()">Đặt chỉ số cảnh báo</v-btn>
            </v-col>
        </template> -->

        <v-card>
            <v-card-title
            class="headline grey lighten-2"
            primary-title
            >
            Đặt ngưỡng cảnh báo
            </v-card-title>

            <v-card-text>
                <v-simple-table dense class="table">
                    <thead>
                    <tr>
                        <th class="text-left">#</th>
                        <th class="text-left">Tên</th>
                        <th class="text-left">Ngưỡng</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, key) in this.threshold" :key="key">
                        <td>{{item.number}}</td>
                        <td>{{item.text}}</td>
                        <td>
                            <v-text-field v-model="item.value" required type="number" :rules="emptyRule"></v-text-field>
                        </td>
                    </tr>
                    </tbody>
                </v-simple-table>
            </v-card-text>

            <v-card-actions>
            <div class="flex-grow-1"></div>
                <v-btn
                    color="green"
                    text
                    @click="configThreshold()"
                    
                >
                    Save
                </v-btn>
                <v-btn
                    color="red"
                    text
                    @click="closeThresholdDialog()"
                >
                    Cancel
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
import { mapGetters } from 'vuex';
import axios from 'axios'
export default {
	props: {
		// setThresholdDialog: {
		// 	type: Boolean
		// }
	},
    data(){
        return{
			threshold: [],
			selectThreshold: [],
			emptyRule: [
				v => !!v || 'Mặc định là 0'
			],
        }
    },
    computed: {
		...mapGetters({
            setThresholdDialog: 'setThresholdDialog'
		})
	},
	watch: {
	},

    methods: {
        getThreshold(){
			this.threshold = [];
			const user = JSON.parse(localStorage.getItem("user"));
			const userId = JSON.stringify(user.userId);
			const url = `http://dev.adstech.vn:8084/trackings/v1/admin/${userId}/thresholds`;
			axios.get(url, {
				headers: {
					Accept: "application/json",
					Authorization: "Bearer " + localStorage.getItem("token")
				}
				})
				.then(result => {
					let resultLength = result.data.response.length;
					for (let i = 0; i < resultLength;i++){
						const obj = {
							number: i+1,
							key: result.data.response[i].key,
							value: result.data.response[i].value,
						}
						this.threshold.push(obj);
					}
					this.threshold[0].text = 'Số lượt hiển thị';
					this.threshold[1].text = 'CLICK';
					this.threshold[2].text = 'Ngân sách';
					this.threshold[3].text = 'Vị trí trung bình';
					this.threshold[4].text = 'Tỷ lệ hiển thị';
					this.threshold[5].text = 'Tỷ lệ hiển thị so khớp chính xác';
					this.threshold[6].text = 'Tỷ lệ hiển thị bị mất (ngân sách)';
					this.threshold[7].text = 'Tỷ lệ hiển thị bị mất (xếp hạng)';
					this.threshold[8].text = 'Thời gian tải trang';
					this.threshold[9].text = 'OAD';
					this.threshold[10].text = 'Số chuyển đổi';
					this.threshold[11].text = 'Tỷ lệ chuyển đổi';
					this.threshold[12].text = 'CPA';
					for (let i=0; i < this.threshold.length; i++){
						const obj = {
							text: this.threshold[i].text,
							value: this.threshold[i].key
						}
						this.selectThreshold.push(obj);
					}
				}
			);
		},
		configThreshold(){
			const data = [];
			this.threshold.filter(element => {
				let key = element.key;
				if(element.value.length != 0){
					var value = element.value;
				}
				else {
					value = 0;
				}
				let obj = {
					"key": key,
					"value": value
				}
				data.push(obj);
			})
			const user = JSON.parse(localStorage.getItem("user"));
			const userId = JSON.stringify(user.userId);
			const url = `http://dev.adstech.vn:8084/trackings/v1/admin/${userId}/thresholds`;
			axios({
				method: "POST",
				url: url,
				headers: {
					Accept: "application/json",
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
				data: data
			}).then(result => {
				// if (result.data.code == "success"){
				// 	this.setThresholdDialog = false;
				// 	// this.successDialog = true;
				// }
				// else {
				// 	this.setThresholdDialog = false;
				// 	// this.failDialog = true;
				// }
			}).then( () => {
				this.$emit('getDataFromServer');
				this.closeThresholdDialog();
			});
        },
		closeThresholdDialog(){
			// this.setThresholdDialog = false
			// this.$emit('closeThresholdDialog');
			this.$store.dispatch('turnOffThresholdDialog');
		}
	},
	created(){
		this.getThreshold();
	}
}
</script>
<style scoped>

</style>