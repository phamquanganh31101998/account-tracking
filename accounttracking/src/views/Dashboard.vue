<template>
    <v-container>
		<!-- app bar start here -->
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
		</v-app-bar> -->
		<appBar></appBar>
		<br>
		<br>
		<!-- app bar end -->
		<v-row row>
			<v-col class="d-flex" sm="2" md="2" xl="2" offset-sm="5" offset-md="5" offset-xl="5" block>
				<v-btn @click="getAllUsers()" v-if="checkAdminId(currentUser.roleId)" style="background-color: #FFAB91;">
					Các tài khoản
					<i class="material-icons" style="outlined" outlined>person_outline</i>
				</v-btn>
				<mainUserDialog></mainUserDialog>
			</v-col>
			
			<!-- <v-dialog
				width="70%"
				>
				<template v-slot:activator="{ on }">
					<v-col class="d-flex" sm="3" md="3" xl="3" offset-sm="4" offset-md="4" offset-xl="4">
						<v-btn v-on="on" @click="getAllUsers()">Xem các tài khoản</v-btn>
					</v-col>
				</template>

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
										<td> -->
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
											<!-- <userManagerSettingDialog v-if="!checkAdmin(item.role)"
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
				</v-card>
			</v-dialog> -->

			<v-col class="d-flex" sm="3" md="3" xl="3">
				<v-btn @click="getThreshold()" block v-if="checkAdminId(currentUser.roleId)" style="background-color: #FFF176;">
					Đặt chỉ số cảnh báo
					<i class="material-icons" >warning</i>
				</v-btn>
			</v-col>
			<!-- :setThresholdDialog="setThresholdDialog"  -->
			<!-- @closeThresholdDialog="this.$store.state.setThresholdDialog = false" -->
			<thresholdDialog @getDataFromServer="getDataFromServer()"></thresholdDialog>
			<!-- <v-dialog
				v-model="setThresholdDialog"
				width="500"
				>
				<template v-slot:activator="{ on }">
					<v-col class="d-flex" sm="2" md="2" xl="2" >
						<v-btn v-on="on" @click="getThreshold()">Đặt chỉ số cảnh báo</v-btn>
					</v-col>
				</template>

				<v-card>
					<v-card-title
					class="headline grey lighten-2"
					primary-title
					>
					Đặt chỉ số cảnh báo
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
							@click="setThresholdDialog = false"
						>
							Cancel
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog> -->
			

			
			<v-col class="d-flex" sm="2" md="2" xl="2">
				<v-select block
					:items="items"
					outlined
					v-model="type"
				></v-select>
			</v-col>

		</v-row>
		
		<v-row>
			<v-col sm="8" offset-sm="2" md="6" offset-md="3" lg="4" offset-lg="6">
				<v-progress-circular
					v-if="dataLoadingProgress"
					:size="70"
					:width="7"
					color="grey"
					indeterminate
				></v-progress-circular>
			</v-col>
		</v-row>

		<v-row>
			<v-card width="100%" v-if="!dataLoadingProgress"> 
				<v-card-title >
					<v-row row>
						<v-col xs="8" lg="8">
						<div class="body-1 font-weight-bold">Theo dõi tài khoản GoogleAds</div>
						</v-col>
						<v-col class="d-flex" sm="2" md="2" xl="2">
							<v-text-field
								:value="itemsPerPage"
								label="Số dòng/trang"
								type="number"
								min="1"
								required
								@change="itemsPerPage = parseInt($event, 10)"
							></v-text-field>
						</v-col>
						<v-spacer></v-spacer>
						<v-col xs="1" lg="1">
						<v-tooltip top>
							<template v-slot:activator="{ on }">
								<i class="material-icons" style="color: blue" large v-on="on">contact_support</i>
							</template>
							<div>
								<p>Ký hiệu</p>
								<p><i class="material-icons" style="color: #34BFA3;">brightness_1</i>Bình thường</p>
								<p><i class="material-icons" style="color: #F4516C;">brightness_1</i>Cảnh báo</p>
							</div>
						</v-tooltip>
						
						</v-col>
					</v-row>
				</v-card-title>
				<v-card-text>
					<v-simple-table class="table elevation-1" dense :page.sync="page"
						hide-default-footer @page-count="pageCount = $event">
						<thead>
							<tr>
								<th class="text-left" v-for="(h, k) in headers" :key="k"><p class="font-weight-black">{{h}}</p></th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="item in displayData" :key="item.number">
								<td>{{ item.number }}</td>
								<td>{{ item.customerId }}</td>
								<td>{{ item.customerDescriptiveName }}</td>
								<td v-for="detail in item.trackingDetail" :key="detail.id">
									<!-- <i class="material-icons" v-on="on" 
										:style="getColor(detail.isWarning)" 
										@mouseover="turnOnCompareValueToolTip(item.currency, detail.previousValue, detail.type, detail.isWarning, detail.changeValue)" 
										@mouseout="turnOffCompareValueToolTip()"
										>
										brightness_1
									</i>
									{{checkNumberValue(detail.currentValue)}} {{getCurrency(detail.type, item.currency)}} {{checkRate(detail.type)}} -->
									<v-tooltip top>
										<template v-slot:activator="{ on }">
										<i class="material-icons" v-on="on" 
											:style="getColor(detail.isWarning)" 
											>
											brightness_1
										</i>
										{{checkNumberValue(detail.currentValue)}} {{getCurrency(detail.type, item.currency)}} {{checkRate(detail.type)}}
										</template>
										<template>
										<v-container>
											<v-row>
											<v-col>
												Giá trị cũ: {{checkNumberValue(detail.previousValue)}} {{getCurrency(detail.type, item.currency)}} {{checkRate(detail.type)}}
												<br>
											</v-col>
											</v-row>
											<v-row>
											<i class="material-icons" v-if="detail.isWarning">trending_down</i>
											<i class="material-icons" v-else>trending_up</i>
											<p :style="getColor(detail.isWarning)">: {{checkNumberValue(detail.changeValue)}} %</p>
											</v-row>
										</v-container>
										</template>
									</v-tooltip>
								
								</td>
								<td>
									<i class="material-icons" :style="checkNumberColor(item.numOfDisapprovedAds)">brightness_1</i>
									<a @click.prevent="getDisapprovedAds(item.customerId)" style="color: blue;">{{ item.numOfDisapprovedAds }}</a>
									<!-- <disapprovedAdsDialog></disapprovedAdsDialog> -->
									<!-- <disapprovedAdsDialog 
										:numOfDisapprovedAds="item.numOfDisapprovedAds"
										:customerId="item.customerId"
										:disapprovedAdsDialog="item.disapprovedAdsDialog"
									></disapprovedAdsDialog> -->
									<!-- <v-dialog width="100%"> -->
										<!-- <template v-slot:activator="{ on }">
											<i class="material-icons" :style="checkNumberColor(item.numOfDisapprovedAds)">brightness_1</i>
											<a @click.prevent="getDisapprovedAds(item.customerId)" v-on="on" style="color: blue;">{{ item.numOfDisapprovedAds }}</a>
										</template> -->
										<!-- <v-card>
											<v-card-title
												primary-title
											>Quảng cáo bị từ chối
											</v-card-title>
											<v-card-text>
												<v-row>
													<v-col sm="8" offset-sm="6" md="6" offset-md="6" lg="4" offset-lg="6">
														<v-progress-circular
														v-if="disapprovedAdsProgress"
														:size="70"
														:width="7"
														color="grey"
														indeterminate
														></v-progress-circular>
													</v-col>
												</v-row>
												<v-simple-table>
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
										</v-card> -->
										
									<!-- </v-dialog> -->
								</td>
								<td>
									<i class="material-icons" :style="checkNumberColor(item.numOfAdGroupMissingAds)">lens</i>
									<a @click.prevent="getMissingAds(item.customerId)" style="color: blue;">{{ item.numOfAdGroupMissingAds }}</a>
									
									<!-- <v-dialog width="100%"> -->
										<!-- <template v-slot:activator="{ on }">
											<i class="material-icons" :style="checkNumberColor(item.numOfAdGroupMissingAds)">lens</i>
											<a @click.prevent="getMissingAds(item.customerId)" v-on="on" style="color: blue;">{{ item.numOfAdGroupMissingAds }}</a>
										</template> -->
										<!-- <v-card>
											<v-card-title primary-title>
												AdGroup bị thiếu mẫu quảng cáo
											</v-card-title>
											<v-card-text>
												<v-row>
													<v-col sm="8" offset-sm="6" md="6" offset-md="6" lg="4" offset-lg="6">
														<v-progress-circular
														v-if="missingAdsProgress"
														:size="70"
														:width="7"
														color="grey"
														indeterminate
														></v-progress-circular>
													</v-col>
												</v-row>
												<v-simple-table>
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
										</v-card> -->
										
									<!-- </v-dialog> -->
								</td>
								<td>
									<i class="material-icons" :style="checkNumberColor(item.numOfAdGroupMissingExtensions)">brightness_1</i>
									<a @click.prevent="getMissingExtensions(item.customerId)" style="color: blue;">{{ item.numOfAdGroupMissingExtensions }}</a>
									<!-- <missingExtensionsDialog 
										:numOfAdGroupMissingExtensions="item.numOfAdGroupMissingExtensions" 
										:customerId="item.customerId" 
										:missingExtensionsDialog="item.missingExtensionsDialog">
									</missingExtensionsDialog> -->
									<!-- <v-dialog width="100%"> -->
										<!-- <template v-slot:activator="{ on }">
											<i class="material-icons" :style="checkNumberColor(item.numOfAdGroupMissingExtensions)">brightness_1</i>
											<a @click.prevent="getMissingExtensions(item.customerId)" v-on="on" style="color: blue;">{{ item.numOfAdGroupMissingExtensions }}</a>
										</template> -->
										<!-- <v-card>
											<v-card-title
											primary-title
											>AdGroup bị thiếu tiện ích mở rộng</v-card-title>
											<v-card-text>
												<v-col sm="8" offset-sm="6" md="6" offset-md="6" lg="4" offset-lg="6">
													<v-progress-circular
													v-if="missingExtensionsProgress"
													:size="70"
													:width="7"
													color="grey"
													indeterminate
													></v-progress-circular>
												</v-col>
												<v-simple-table>
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
										</v-card> -->
										
									<!-- </v-dialog> -->
								</td>
							</tr>
						</tbody>
					</v-simple-table>
					<div class="text-center">
						<v-pagination
						v-model="page"
						:length="pages"
						></v-pagination>
					</div>
					
				</v-card-text>
			</v-card>
		</v-row>
		<disapprovedAdsDialog></disapprovedAdsDialog>
		<missingAdsDialog></missingAdsDialog>
		<missingExtensionsDialog></missingExtensionsDialog>
		<compareValueToolTip></compareValueToolTip>
		<v-dialog
			v-model="successDialog"
			max-width="290"
			>
			<v-card>
				<v-card-title class="headline" style="color: green;">Success</v-card-title>

				<v-card-text>
				<p class="body-1">Lưu lại thành công</p>
				</v-card-text>

				<v-card-actions>
				<div class="flex-grow-1"></div>

				</v-card-actions>
			</v-card>
		</v-dialog>
		<v-dialog
			v-model="failDialog"
			max-width="290"
			>
			<v-card>
				<v-card-title class="headline" style="color: red;">Fail</v-card-title>

				<v-card-text>
				<p class="body-1">Đã xảy ra lỗi. Xin hãy thử lại sau vài phút</p>
				</v-card-text>

				<v-card-actions>
				<div class="flex-grow-1"></div>

				</v-card-actions>
			</v-card>
		</v-dialog>
  </v-container>
  
  
</template>

<script>
import service from '../service'
import config from '../config'
import axios from 'axios'
import numberFormat from '../helpers/numberformat'
import { setTimeout } from 'timers';
import { mapGetters } from 'vuex'
import missingAdsDialog from './dialogs/MissingAdsDialog'
import missingExtensionsDialog from './dialogs/MissingExtensionsDialog'
import disapprovedAdsDialog from './dialogs/DisapprovedAdsDialog'
import userManagerSettingDialog from './dialogs/UserManagerSettingDialog'
import thresholdDialog from './dialogs/ThresholdDialog'
import mainUserDialog from './dialogs/MainUserDialog'
import appBar from '../components/AppBar'
import navBar from '../components/NavBar'
import compareValueToolTip from '../views/tooltips/CompareValueToolTip'
export default {
	components: {
		missingAdsDialog,
		missingExtensionsDialog,
		disapprovedAdsDialog,
		userManagerSettingDialog,
		thresholdDialog,
		mainUserDialog,
		appBar,
		navBar,
		compareValueToolTip
	},
	data(){
        return {
			emptyRule: [
				v => !!v || 'Mặc định là 0'
			],
            page: 1,
            pages: 0,
            itemsPerPage: 10,
            type: 'NEAR',
            headers: [
                '#', 'Mã khách hàng', 'Tên khách hàng', 'Số lượt hiển thị', 'CLICK', 
                'Ngân sách', 'Vị trí trung bình', 'Số chuyển đổi', 'Giá trị chuyển đổi',	
                'Tỷ lệ chuyển đổi',	'CPA',	'ROAS', 'Ngân sách còn lại',
                'Thời gian tải trang(s)',	'Tỷ lệ hiển thị',	'Tỷ lệ hiển thị so khớp chính xác',	
                'Tỷ lệ hiển thị bị mất (ngân sách)', 'Tỷ lệ hiển thị bị mất (xếp hạng)', 'Quảng cáo bị từ chối',
                'AdGroup bị thiếu mẫu quảng cáo',	'AdGroup bị thiếu tiện ích mở rộng'
                ],
            fakeData: [
                {
                    "id": 539,
                    "customerId": 3009015299,
                    "customerDescriptiveName": "sofayen.com",
                    "currentDate": "2019-08-20",
                    "previousDate": "2019-08-19",
                    "currency": "VND",
                    "type": "NEAR",
                    "userEmail": "anhpq.adsplus@gmail.com",
                    "trackingDetail": [
                        {
                            "id": 7533,
                            "trackingId": 539,
                            "type": "CLICK",//CLICK
                            "previousValue": 30.0,
                            "currentValue": 17.0,
                            "changeValue": -43.333333333333336,
                            "isWarning": true
                        },
                        {
                            "id": 7534,
                            "trackingId": 539,
                            "type": "IMPRESSION",//Số lượt hiển thị
                            "previousValue": 1335.0,
                            "currentValue": 1433.0,
                            "changeValue": 7.340823970037453,
                            "isWarning": false
                        },
                        {
                            "id": 7535,
                            "trackingId": 539,
                            "type": "SPEND",//Ngân sách
                            "previousValue": 6.9674E10,
                            "currentValue": 3.3369E10,
                            "changeValue": -52.1069552487298,
                            "isWarning": false
                        },
                        {
                            "id": 7536,
                            "trackingId": 539,
                            "type": "POSITION",
                            "previousValue": 0.0,
                            "currentValue": 0.0,
                            "changeValue": null,
                            "isWarning": null
                        },
                        {
                            "id": 7537,
                            "trackingId": 539,
                            "type": "CONVERSION",//Số chuyển đổi
                            "previousValue": 0.0,
                            "currentValue": 0.0,
                            "changeValue": null,
                            "isWarning": null
                        },
                        {
                            "id": 7538,
                            "trackingId": 539,
                            "type": "CONVERSION_VALUE",//Giá trị chuyển đổi
                            "previousValue": 0.0,
                            "currentValue": 0.0,
                            "changeValue": null,
                            "isWarning": null
                        },
                        {
                            "id": 7539,
                            "trackingId": 539,
                            "type": "CR",//Tỷ lệ chuyển đổi
                            "previousValue": 0.0,
                            "currentValue": 0.0,
                            "changeValue": null,
                            "isWarning": null
                        },
                        {
                            "id": 7540,
                            "trackingId": 539,
                            "type": "CPA",//CPA
                            "previousValue": null,
                            "currentValue": null,
                            "changeValue": null,
                            "isWarning": null
                        },
                        {
                            "id": 7541,
                            "trackingId": 539,
                            "type": "ROAS",//ROAS
                            "previousValue": null,
                            "currentValue": null,
                            "changeValue": null,
                            "isWarning": null
                        },
                        {
                            "id": 7542,
                            "trackingId": 539,
                            "type": "IS",//Tỷ lệ hiển thị
                            "previousValue": null,
                            "currentValue": 0.0,
                            "changeValue": null,
                            "isWarning": true
                        },
                        {
                            "id": 7543,
                            "trackingId": 539,
                            "type": "EXACT_IS",//Tỷ lệ hiển thị so khớp chính xác
                            "previousValue": null,
                            "currentValue": 0.0,
                            "changeValue": null,
                            "isWarning": true
                        },
                        {
                            "id": 7544,
                            "trackingId": 539,
                            "type": "BUDGET_LOST_IS",//Tỷ lệ hiển thị bị mất (ngân sách)
                            "previousValue": null,
                            "currentValue": 0.0,
                            "changeValue": null,
                            "isWarning": false
                        },
                        {
                            "id": 7545,
                            "trackingId": 539,
                            "type": "RANK_LOST_IS",//Tỷ lệ hiển thị bị mất (xếp hạng)
                            "previousValue": null,
                            "currentValue": 0.0,
                            "changeValue": null,
                            "isWarning": false
                        },
                        {
                            "id": 7546,
                            "trackingId": 539,
                            "type": "REMAIN_BUDGET",//Ngân sách còn lại
                            "previousValue": null,
                            "currentValue": 3.441921E12,
                            "changeValue": null,
                            "isWarning": false
                        },
                        {
                            "id": null,
                            "trackingId": null,
                            "type": "PAGE_LOAD_TIME",//
                            "previousValue": 9.02767,
                            "currentValue": 8.579,
                            "changeValue": -4.9699364,
                            "isWarning": false
                        }
                    ],
                    "numOfDisapprovedAds": 0,
                    "numOfAdGroupMissingAds": 0,
                    "numOfAdGroupMissingExtensions": 1
                },
            ],
            displayData: [],
            items: [
                {
                text: 'Cảnh báo gần',
                value: 'NEAR'
                },
                {
                    text: 'Cảnh báo xa',
                    value: 'FAR'
                }
                ],
            setThresholdDialog: false,
            threshold: [],
            newData: [],
            selectThreshold: [],
            newThresholdValue: 0,
			selectedThreshold: 'impression.change.threshold',
			successDialog: false,
			failDialog: false,
			disapprovedAdsProgress: false,
			dataLoadingProgress: false,
			userLoadingProgress: false,
			users: [],
			userManagerRelationships: [],
			userManagerDialog: false,
			// disableSaveButton: true,
			currentUser: null
        }
    },
    watch: {
        newThresholdValue(){
            if(this.newThresholdValue.length == 0){
                this.disableSaveButton = true;
            }
            else {
                this.disableSaveButton = false;
            }
        },
		type(){
			this.getDataFromServer();
			this.page = 1;
        },
        page(){
            // this.displayData = [];
            this.setDisplayData();
		},
		//Nếu dư thì cộng thêm 1 trang
        itemsPerPage(){
			if((this.fakeData.length % this.itemsPerPage) == 0){
				this.pages = parseInt((this.fakeData.length / this.itemsPerPage));
			}
			else{
				this.pages = parseInt((this.fakeData.length / this.itemsPerPage)) + 1;
			}
			// this.pages = (this.fakeData.length / this.itemsPerPage) + 1
			this.page = 1;
            this.displayData = [];
            this.setDisplayData();
			localStorage.setItem('itemsPerPage', this.itemsPerPage);
			
		},
  	},
	computed: {
		...mapGetters({
            // currentUser: 'user'
			// ...
		})
	},
	methods: {
		getThreshold(){
			this.$store.dispatch('turnOnThresholdDialog');
			// this.threshold = [];
			// const user = JSON.parse(localStorage.getItem("user"));
			// const userId = JSON.stringify(user.userId);
			// const url = `http://dev.adstech.vn:8084/trackings/v1/admin/${userId}/thresholds`;
			// axios.get(url, {
			// 	headers: {
			// 		Accept: "application/json",
			// 		Authorization: "Bearer " + localStorage.getItem("token")
			// 	}
			// 	})
			// 	.then(result => {
			// 		let resultLength = result.data.response.length;
			// 		for (let i = 0; i < resultLength;i++){
			// 			const obj = {
			// 				number: i+1,
			// 				key: result.data.response[i].key,
			// 				value: result.data.response[i].value,
			// 			}
			// 			this.threshold.push(obj);
			// 		}
			// 		this.threshold[0].text = 'Số lượt hiển thị';
			// 		this.threshold[1].text = 'CLICK';
			// 		this.threshold[2].text = 'Ngân sách';
			// 		this.threshold[3].text = 'Vị trí trung bình';
			// 		this.threshold[4].text = 'Tỷ lệ hiển thị';
			// 		this.threshold[5].text = 'Tỷ lệ hiển thị so khớp chính xác';
			// 		this.threshold[6].text = 'Tỷ lệ hiển thị bị mất (ngân sách)';
			// 		this.threshold[7].text = 'Tỷ lệ hiển thị bị mất (xếp hạng)';
			// 		this.threshold[8].text = 'Thời gian tải trang';
			// 		this.threshold[9].text = 'OAD';
			// 		this.threshold[10].text = 'Số chuyển đổi';
			// 		this.threshold[11].text = 'Tỷ lệ chuyển đổi';
			// 		this.threshold[12].text = 'CPA';
			// 		for (let i=0; i < this.threshold.length; i++){
			// 			const obj = {
			// 				text: this.threshold[i].text,
			// 				value: this.threshold[i].key
			// 			}
			// 			this.selectThreshold.push(obj);
			// 		}
			// 	}
			// );
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
				if (result.data.code == "success"){
					this.setThresholdDialog = false;
					this.successDialog = true;
				}
				else {
					this.setThresholdDialog = false;
					this.failDialog = true;
				}
			}).then( () => {
				this.getDataFromServer();
			});
		},
		getDataFromServer(){
			this.displayData = [];
			this.fakeData = [];
			this.dataLoadingProgress = true;
			const user = JSON.parse(localStorage.getItem("user"));
			const userId = JSON.stringify(user.userId);
			const url = `${config.apiUrl}${userId}/account-tracking`;
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
						this.fakeData.push(element);
					})
					// this.pages = (this.fakeData.length / this.itemsPerPage) + 1
					if((this.fakeData.length % this.itemsPerPage) == 0){
						this.pages = parseInt((this.fakeData.length / this.itemsPerPage));
					}
					else{
						this.pages = parseInt((this.fakeData.length / this.itemsPerPage)) + 1;
					}
					// var k = 0;
					for(let i = 0;i<this.fakeData.length;i++){
					// if(((i+1)%this.itemsPerPage) == 1){
					// 	k++;
					// }
					this.fakeData[i].number = i+1;
					this.fakeData[i].disapprovedAdsDialog = false;
					this.fakeData[i].missingAdsDialog = false;
					this.fakeData[i].missingExtensionsDialog = false;
					// this.fakeData[i].page = k;
					}
					this.dataLoadingProgress = false;
					for (let i = 0; i < this.itemsPerPage; i++){
						this.displayData.push(this.fakeData[i]);
					}
				});
		},
		getAllUsers(){
			this.$store.dispatch('turnOnMainUserDialog');
			// this.users = [];
			// this.userLoadingProgress = true;
			// const user = JSON.parse(localStorage.getItem("user"));
			// const userId = JSON.stringify(user.userId);
			// const url = `http://dev.adstech.vn:8084/trackings/v1/admin/${userId}/users`;
			// axios.get(url, {
			// 		params: {
			// 			type: this.type
			// 		},
			// 		headers: {
			// 			Accept: "application/json",
			// 			Authorization: "Bearer " + localStorage.getItem("token")
			// 		}
			// 	})
			// 	.then(result => {
			// 		result.data.response.filter(element => {
			// 			let obj = {
			// 				userId: element.userId,
			// 				displayName: element.displayName,
			// 				email: element.email,
			// 				role: this.getRole(element.roleId),
			// 				roleId: element.roleId,
			// 				userManagerDialog: false
			// 			}
			// 			this.users.push(obj);
			// 		});
			// 		this.userLoadingProgress = false;
			// 		this.getUserManagerRelationships();
			// 	});
		},
		setDisplayData(){
			this.displayData = [];
			let start = this.page * this.itemsPerPage - this.itemsPerPage;
			let end = this.page * this.itemsPerPage;
			for (let i = start; i < end; i++){
				if(typeof(this.fakeData[i]) != 'undefined'){
					this.displayData.push(this.fakeData[i]);
				}
			}
			// this.displayData = [...this.displayData];
		},
		changeType(){
			if (this.type == 'FAR'){
				this.type = 'NEAR'
			}
			else{
				this.type = 'FAR'
			}
		},
		getColor (isWarning) {
			if (isWarning == true){
				return "color: #F4516C;"
			}
			else {
				return "color: #34BFA3;"
			}
		},
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
		checkNumberColor(number){
			if (number == 0){
				return "color: #34BFA3;"
			}
			else {
				return "color: #F4516C;"
			}
		},
		checkNumberValue(example){
			if(example==null){
				return '-'
			}
			else {
				if (this.isFloat(example)){
				return numberFormat.number_format(example, 2);
				}
				else {
				return this.format(example);
				}
			}
		},
		isInteger(f) {
			return typeof(f)==="number" && Math.round(f) == f;
		},
		isFloat(f) { 
			return typeof(f)==="number" && !this.isInteger(f); 
		},
		format(data) {
			var numberFormat = new Intl.NumberFormat("es-ES");
			if (data > 10000) {
				data = data / 10000;
			}
			var formatted = numberFormat.format(data);
			return formatted;
		},
		getCurrency(type, type1) {
			if (type == "SPEND" || type == 'REMAIN_BUDGET') {
				return type1
			} else return null
		},
		checkRate(type) {
			if (type == "CR" || type == 'IS' || type == 'EXACT_IS' || type == 'BUDGET_LOST_IS' || type == 'RANK_LOST_IS') {
				return '%'
			} else return null
		},
		getDisapprovedAds(customerId){
			// this.disapprovedAds = [];
			// this.disapprovedAdsProgress = true;
			// const user = JSON.parse(localStorage.getItem("user"));
			// const userId = JSON.stringify(user.userId);
			// const url = `${config.apiUrl}${userId}/disapproved-ads`;
			// axios.get(url, {
			// 	params: {
			// 		cId: customerId
			// 	},
			// 	headers: {
			// 		Accept: "application/json",
			// 		Authorization: "Bearer " + localStorage.getItem("token")
			// 	}
			// 	})
			// 	.then(result => {
			// 		this.disapprovedAds = result.data.response;
			// 		this.disapprovedAdsProgress = false;
			// 	});
			this.$store.dispatch('getDisapprovedAds', customerId);
		},
		getMissingAds(customerId){
			this.$store.dispatch('getMissingAds', customerId);
		},
		getMissingExtensions(customerId){
			// this.missingExtensions = [];
			// this.missingExtensionsProgress = true;
			// const user = JSON.parse(localStorage.getItem("user"));
			// const userId = JSON.stringify(user.userId);
			// const url = `${config.apiUrl}${userId}/missing-extensions`;
			// axios.get(url, {
			// 	params: {
			// 		cId: customerId
			// 	},
			// 	headers: {
			// 		Accept: "application/json",
			// 		Authorization: "Bearer " + localStorage.getItem("token")
			// 	}
			// 	})
			// 	.then(result => {
			// 	this.missingExtensions = result.data.response;
			// 	this.missingExtensionsProgress = false;
			// 	});
			this.$store.dispatch('getMissingExtensions', customerId);
		},
		getManageAccount(userId){

		},
		getAccountById(id){
			this.users.filter(element => {
				if(element.userId == id){
					// console.log(element);
				}
			});

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
		checkAdmin(role){
			if(role=="Admin"){
				return true;
			}
			else{
				return false;
			}
		},
		checkAdminId(id){
			if(id == 3){
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
		logout(){
			this.$store.dispatch('logout');
		},
		logging(){
			console.log("Hello");
		},
		turnOnCompareValueToolTip(currency, previousValue, type, isWarning, changeValue){
			let data = {
				currency: currency,
				previousValue: previousValue,
				type: type,
				isWarning: isWarning,
				changeValue: changeValue
			}
			this.$store.dispatch('turnOnCompareValueToolTip', data);
		},
		turnOffCompareValueToolTip(){
			this.$store.dispatch('turnOffCompareValueToolTip');
		}
	},
	created(){
		if(localStorage.getItem('itemsPerPage') === null){
			this.itemsPerPage = 10;
		}
		else{
			this.itemsPerPage = localStorage.getItem('itemsPerPage');
		}
		this.getCurrentUser();
		this.getDataFromServer();
		
	}
};
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