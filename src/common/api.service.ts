//https://corona-stats.online/?format=json
import Vue from 'vue';
import axios from "axios";
import VueAxios from "vue-axios";
const ApiService = {
	init() {
		Vue.use(VueAxios, axios)
		Vue.axios.defaults.baseURL = 'https://corona-stats.online/?format=json';

		Vue.axios.interceptors.response.use(
			response => response,
			error => Promise.reject({ ...error })
		);
		// this.setHeaders()

	},
	// setHeaders() {
	// 	if (!!JwtService.getToken()) {
	// 		Vue.axios.interceptors.request.use(
	// 			config => {
	// 				config.headers["Authorization"] = JwtService.getToken();
	// 				return config;
	// 			},
	// 			error => {
	// 				return Promise.reject(error);
	// 			}
	// 		);
	// 	} else {
	// 		Vue.axios.defaults.headers["Authorization"] = "";
	// 	}
	// },

	// query(resource, params) {
	// 	let query_elements = params.join('&')
	// 	return Vue.axios.get(`${resource}/?${query_elements}`)
	// },

	get(slug: string) {
		return axios.get(`https://exchange.vcoud.com/coronavirus/${slug ? `${slug}` : 'latest'}`)
	},

	// post(resource, params) {
	// 	return Vue.axios.post(resource, params);
	// },

	// update(resource, slug, params) {
	// 	return Vue.axios.put(`${resource}/${slug}/`, params);
	// },

	// put(resource, params) {
	// 	return Vue.axios.put(`${resource}`, params);
	// },

	// delete(resource) {
	// 	return Vue.axios.delete(resource)
	// },
	// upload(resource, params, config) {
	// 	return axios.post(resource, params, {
	// 		headers: {
	// 			'Content-Type': 'image/jpeg',
	// 			'X-Requested-With': 'XMLHttpRequest'
	// 		}
	// 	})
	// },
	// patch(resource, details) {
	// 	return Vue.axios.patch(resource, details)
	// }
};

export default ApiService;