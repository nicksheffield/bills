import Home from 'screens/Home'
import NewBill from 'screens/NewBill'
import Login from 'screens/Login'
import Logout from 'screens/Logout'
import Bill from 'screens/Bill'

import { isLoggedIn, isAdmin } from 'utils'

export const routes = [
	{ url: '/', component: Home, title: 'Home' },
	{ url: '/new-bill', component: NewBill, title: 'New Bill' },
	{ url: '/login', component: Login, title: 'Login' },
	{ url: '/logout', component: Logout, title: 'Logout' },
	{ url: '/bill/:id', component: Bill, title: 'View Bill' },
]

export const nav = [
	{ url: '/', title: 'Home', show: () => isLoggedIn() },
	{ url: '/new-bill', title: 'New Bill', show: () => isLoggedIn() && isAdmin() }, // elem: 'Button', type: 'light', icon: 'plus'
	{ url: '/logout', title: 'Logout', show: () => isLoggedIn() },
]
