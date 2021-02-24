import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '../router'
axios.defaults.baseURL = 'http://127.0.0.1:7001/api/'
axios.defaults.timeout = 5000
//跨域请求是否带凭证(带的话egg跨域报错)
// axios.defaults.withCredentials = true
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers['authorization'] = sessionStorage.getItem('token') || ''
axios.defaults.headers.post['Content-Type'] = 'application/json'

//响应拦截
axios.interceptors.response.use(
	response => {
		// Do something before response is sent
		if (response.data.code !== 200) {
			ElMessage.error({
				message: response.data.message,
				type: 'warning'
			})
			if (response.data.code === 401) {
				router.push({ path: '/login' })
			}
		} else {
			return response.data
		}
	},
	error => {
		// Do something with response error
		ElMessage.warning({
			message: '服务端出错',
			type: 'warning'
		})
		return Promise.reject(error)
	}
)
export default axios
