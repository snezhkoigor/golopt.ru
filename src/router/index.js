import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import Registration from '../components/Registration.vue';
import ResetPassword from '../components/profile/ProfileResetPassword.vue';
import Activate from '../components/profile/ProfileActivate.vue';
import Profile from '../components/Profile.vue';
import Product from '../components/Product.vue';
import NotFound from '../components/NotFound.vue';
import PaySuccess from '../components/Pay/Success.vue';
import PayFail from '../components/Pay/Fail.vue';

Vue.use(Router);

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
            path: '/:lang?',
            name: 'home',
            component: Home,
            meta: {
                localized: true,
                access: {
                    guest: true,
                    auth: true
                },
                showIfAuth: true
            }
        },
        {
            path: '/:lang?/login',
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
            path: '/:lang?/registration',
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
            path: '/:lang?/profile',
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
            path: '/:lang?/new/email/:token',
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
            path: '/:lang?/activate/:token',
            name: 'emailActivation',
            component: Activate,
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
            path: '/:lang?/new/password',
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
            path: '/:lang?/logout',
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
        },
        {
            path: '/:lang?/pay/success',
            name: 'paySuccess',
            component: PaySuccess,
            meta: {
                access: {
                    guest: true,
                    auth: true,
                    roles: [
                        ''
                    ]
                },
                title: 'Успешаня оплата',
                icon: null,
                available: false
            }
        },
        {
            path: '/:lang?/pay/fail',
            name: 'payFail',
            component: PayFail,
            meta: {
                access: {
                    guest: true,
                    auth: true,
                    roles: [
                        ''
                    ]
                },
                title: 'Ошибка при оплате',
                icon: null,
                available: false
            }
        }
    ]
})
