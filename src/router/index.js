import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'
const routes = [
	{ path: '/', redirect: '/home' },
	{
		path: '/home',
		name: 'Home',
		component: Home,
		meta: { requiresAuth: true },
		children: [
			{ path: '/home', redirect: '/home/list' },
			{
				path: 'list',
				name: 'List',
				component: () =>
					import(/* webpackChunkName: "home" */ '@/views/home/list.vue')
			},
			{
				path: 'news',
				name: 'News',
				component: () =>
					import(/* webpackChunkName: "home" */ '@/views/home/news.vue')
			},
			{
				path: 'search',
				name: 'Search',
				component: () =>
					import(/* webpackChunkName: "home" */ '@/views/home/search.vue')
			},
			{
				path: 'userlist',
				name: 'UserList',
				component: () =>
					import(/* webpackChunkName: "home" */ '@/views/home/userList.vue')
			}
		]
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue')
	},
	{
		path: '/edit/:pid',
		name: 'Edit',
		meta: { requiresAuth: true },
		component: () =>
			import(/* webpackChunkName: "edit" */ '@/views/editProduct.vue')
	},
	{
		path: '/register',
		name: 'Register',
		component: () =>
			import(/* webpackChunkName: "login" */ '@/views/Register.vue')
	}
]

const router = createRouter({
	history: createWebHashHistory(),
	routes
})
router.beforeEach((to, from, next) => {
	//判断是否需要登录/=>login
	if (to.path === '/login') {
		next()
	} else {
		if (sessionStorage.getItem('token') && sessionStorage.getItem('aid')) {
			next()
		} else {
			next('/login')
		}
	}
})
export default router
