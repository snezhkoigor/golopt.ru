import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Registration from '../components/Registration.vue'
import ResetPassword from '../components/profile/ProfileResetPassword.vue'
import Profile from '../components/Profile.vue'
import Product from '../components/Product.vue'
import NotFound from '../components/NotFound.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '*',
            component: NotFound,
            meta: {
                access: {
                    guest: true,
                    auth: true
                },
                title: 'Пропала страница',
                icon: null,
                available: false
            }
        },
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: {
                access: {
                    guest: true,
                    auth: true
                },
                showIfAuth: true
            }
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
                access: {
                    guest: true,
                    auth: false
                },
                title: 'Войти',
                icon: 'mdi-login-variant',
                available: true
            }
        },
        {
            path: '/registration',
            name: 'registration',
            component: Registration,
            meta: {
                access: {
                    guest: true,
                    auth: false
                },
                title: 'Регистрация',
                icon: 'mdi-account-plus',
                available: true
            }
        },
        {
            path: '/profile',
            name: 'profile',
            component: Profile,
            meta: {
                access: {
                    guest: false,
                    auth: true,
                    roles: [
                        ''
                    ]
                },
                title: 'Профиль',
                icon: 'mdi-contacts',
                available: true
            }
        },
        {
            path: '/product',
            name: 'product',
            component: Product,
            meta: {
                access: {
                    guest: false,
                    auth: true,
                    roles: [
                        ''
                    ]
                },
                title: 'Продукты',
                icon: 'mdi-apps',
                available: false
            }
        },
        {
            path: '/new/email/:token',
            name: 'changeEmail',
            component: null,
            meta: {
                access: {
                    guest: true,
                    auth: true,
                    roles: [
                        ''
                    ]
                },
                title: 'Изменение e-mail',
                icon: null,
                available: false
            }
        },
        {
            path: '/activate/:token',
            name: 'emailActivation',
            component: null,
            meta: {
                access: {
                    guest: true,
                    auth: true,
                    roles: [
                        ''
                    ]
                },
                title: 'Активация аккаунта',
                icon: null,
                available: false
            }
        },
        {
            path: '/new/password',
            name: 'resetPassword',
            component: ResetPassword,
            meta: {
                access: {
                    guest: true,
                    auth: false,
                    roles: [
                        ''
                    ]
                },
                title: 'Сброс пароля',
                icon: null,
                available: false
            }
        },
        {
            path: '/logout',
            name: 'logout',
            component: null,
            meta: {
                access: {
                    guest: false,
                    auth: true,
                    roles: [
                        ''
                    ]
                },
                title: 'Выход',
                icon: 'mdi-exit-to-app',
                available: true
            }
        }
    ]
})
