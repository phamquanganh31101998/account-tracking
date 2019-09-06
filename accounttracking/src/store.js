import Vue from 'vue'
import Vuex from 'vuex'
import jwt from 'jwt-decode'
Vue.use(Vuex)
import router from './router'
import config from './config'
import axios from 'axios'
export default new Vuex.Store({
	state: {
		token: null,
		user: null,
		missingAds: null,
		missingAdsId: 0,
		missingExtensions: null,
		disapprovedAds: null,
		disapprovedAdsProgress: false,
		disapprovedAdsId: 0,
		disapprovedAdsDialog: false,
		// disapprovedAdsDialog: false,
		missingAdsProgress: false,
		missingExtensionsProgress: false,
		missingExtensionsId: 0,
		setThresholdDialog: false,
		mainUserDialog: false,
		compareValue: null,
		compareValueToolTip: false
	},
	mutations: {
		authToken(state, payload) {
			state.token = payload.token
		},
		authUser(state, payload) {
			state.user = JSON.parse(payload.user);
		},
		clearAuthData(state) {
			state.token = null
			state.user = null
		},
		getMissingAds(state, payload){
			state.missingAdsId = payload;
			// state.missingAds = null;
			// state.missingAdsProgress = true;
			// // const userId = state.user.userId;
			// const user = JSON.parse(localStorage.getItem("user"));
			// const userId = JSON.stringify(user.userId);
			// const url = `${config.apiUrl}${userId}/missing-ads`;
			// axios.get(url, {
			// 	params: {
			// 		cId: payload
			// 	},
			// 	headers: {
			// 		Accept: "application/json",
			// 		Authorization: "Bearer " +localStorage.getItem("token")
			// 	}
			// 	})
			// 	.then(result => {
			// 		state.missingAds = result.data.response;
			// 		state.missingAdsProgress = false;
			// 	});
		},
		getMissingExtensions(state, payload){
			state.missingExtensionsId = payload;
			// state.missingExtensions = null;
			// state.missingExtensionsProgress = true;
			// // const userId = state.user.userId;
			// const user = JSON.parse(localStorage.getItem("user"));
			// const userId = JSON.stringify(user.userId);
			// const url = `${config.apiUrl}${userId}/missing-extensions`;
			// axios.get(url, {
			// 	params: {
			// 		cId: payload
			// 	},
			// 	headers: {
			// 		Accept: "application/json",
			// 		Authorization: "Bearer " + localStorage.getItem("token")
			// 	}
			// 	})
			// 	.then(result => {
			// 		state.missingExtensions = result.data.response;
			// 		state.missingExtensionsProgress = false;
			// 	});
		},
		getDisapprovedAds(state, payload){
			state.disapprovedAdsId = payload;
			// state.disapprovedAdsProgress = true;
			// state.disapprovedAds = null;
			// // const userId = state.user.userId;
			// const user = JSON.parse(localStorage.getItem("user"));
			// const userId = JSON.stringify(user.userId);
			// const url = `${config.apiUrl}${userId}/disapproved-ads`;
			// axios.get(url, {
			// 	params: {
			// 		cId: payload
			// 	},
			// 	headers: {
			// 		Accept: "application/json",
			// 		Authorization: "Bearer " + localStorage.getItem("token")
			// 	}
			// 	})
			// 	.then(result => {
			// 		state.disapprovedAds = result.data.response;
			// 		state.disapprovedAdsProgress = false;
			// 		console.log(state)
			// 	});
		},
		turnOffDisapprovedAdsDialog(state){
			// state.disapprovedAdsDialog = false;
			state.disapprovedAdsId = 0;
		},
		turnOffMissingAdsDialog(state){
			// state.disapprovedAdsDialog = false;
			state.missingAdsId = 0;
		},
		turnOffMissingExtensionsDialog(state){
			// state.disapprovedAdsDialog = false;
			state.missingExtensionsId = 0;
		},
		turnOnThresholdDialog(state){
			state.setThresholdDialog = true;
		},
		turnOffThresholdDialog(state){
			state.setThresholdDialog = false;
		},
		turnOnMainUserDialog(state){
			state.mainUserDialog = true;
		},
		turnOffMainUserDialog(state){
			state.mainUserDialog = false;
		},
		turnOnCompareValueToolTip(state, payload){
			state.compareValue = payload;
			state.compareValueToolTip = true;
		},
		turnOffCompareValueToolTip(state){
			state.compareValue = null;
			state.compareValueToolTip = false;
		}
	},
	actions: {
		login({commit}, data) {
			const token = data
			const decode = jwt(token) 
			const user = JSON.stringify(decode) 
			localStorage.setItem('token', token) 
			localStorage.setItem('user', user) 
			commit('authToken', {
				token: token
			})
			commit('authUser', {
				user: user
			})
		},
		logout({commit}) {
			commit('clearAuthData')
			localStorage.removeItem('token') 
			localStorage.removeItem('user') 
			router.replace('/login') 
		},
		getMissingAds({commit}, data){
			commit('getMissingAds', data);
		},
		getMissingExtensions({commit}, data){
			commit('getMissingExtensions', data);
		},
		getDisapprovedAds({commit}, data){
			commit('getDisapprovedAds', data);
		},
		turnOffDisapprovedAdsDialog({commit}){
			commit('turnOffDisapprovedAdsDialog');
		},
		turnOffMissingAdsDialog({commit}){
			commit('turnOffMissingAdsDialog');
		},
		turnOffMissingExtensionsDialog({commit}){
			commit('turnOffMissingExtensionsDialog');
		},
		turnOnThresholdDialog({commit}){
			commit('turnOnThresholdDialog');
		},
		turnOffThresholdDialog({commit}){
			commit('turnOffThresholdDialog');
		},
		turnOnMainUserDialog({commit}){
			commit('turnOnMainUserDialog');
		},
		turnOffMainUserDialog({commit}){
			commit('turnOffMainUserDialog');
		},
		turnOnCompareValueToolTip({commit}, data){
			commit('turnOnCompareValueToolTip', data);
		},
		turnOffCompareValueToolTip({commit}){
			commit('turnOffCompareValueToolTip');
		},
	},
	getters: {
		missingAds: state => {
			return state.missingAds;
		},
		missingExtensions: state => {
			return state.missingExtensions;
		},
		disapprovedAds: state => {
			return state.disapprovedAds;
		},
		disapprovedAdsProgress: state => {
			return state.disapprovedAdsProgress;
		},
		disapprovedAdsDialog: state => {
			return state.disapprovedAdsDialog;
		},
		disapprovedAdsId: state => {
			return state.disapprovedAdsId;
		},
		missingAdsProgress: state => {
			return state.missingAdsProgress;
		},
		missingExtensionsProgress: state => {
			return state.missingExtensionsProgress;
		},
		user: state => {
			return state.user;
		},
		setThresholdDialog: state => {
			return state.setThresholdDialog;
		},
		mainUserDialog: state => {
			return state.mainUserDialog;
		},
		compareValue: state => {
			return state.compareValue;
		},
		compareValueToolTip: state => {
			return state.compareValueToolTip;
		}
	}
})
