import axios from './requestConfig'
export function getAdminInfo(params) {
	return axios.post('getAdminInfo', params)
}
export function adminLogin(params) {
	return axios.post('adminLogin', params)
}
export function adminRegister(params) {
	return axios.post('adminRegister', params)
}
export function getAllUserInfo(params) {
	return axios.post('getAllUserInfo', params)
}
export function getAllProducts(params) {
	return axios.post('getAllProducts', params)
}
export function adminGetProduct(params) {
	return axios.post('adminGetProduct', params)
}
export function changeProduct(params) {
	return axios.post('changeProduct', params)
}
export function deleteProduct(params) {
	return axios.post('deleteProduct', params)
}
export function addProduct(params) {
	return axios.post('addProduct', params)
}
export function searchData(params) {
	return axios.post('searchData', params)
}
