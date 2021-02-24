import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//公共样式
import './assets/base.less'
import {
	ElButton,
	ElSelect,
	ElInput,
	ElFormItem,
	ElForm,
	ElContainer,
	ElHeader,
	ElMain,
	ElAside,
	ElMenu,
	ElSubmenu,
	ElMenuItem,
	ElTable,
	ElTableColumn,
	ElBreadcrumb,
	ElBreadcrumbItem,
	ElIcon,
	ElPagination,
	ElAvatar,
	ElCheckbox,
	ElCascader,
	ElImage
} from 'element-plus'

const components = [
	ElButton,
	ElSelect,
	ElInput,
	ElFormItem,
	ElForm,
	ElContainer,
	ElHeader,
	ElMain,
	ElAside,
	ElMenu,
	ElSubmenu,
	ElMenuItem,
	ElTable,
	ElTableColumn,
	ElBreadcrumb,
	ElBreadcrumbItem,
	ElIcon,
	ElPagination,
	ElAvatar,
	ElCheckbox,
	ElCascader,
	ElImage
]
const plugins = []
const app = createApp(App)
app.use(store).use(router)

components.forEach(component => {
	app.component(component.name, component)
})

plugins.forEach(plugin => {
	app.use(plugin)
})
app.mount('#app')
