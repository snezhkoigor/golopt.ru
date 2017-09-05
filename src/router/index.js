import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home.vue';
import Login from '@/components/Login.vue';
import Registration from '@/components/Registration.vue';
import ResetPassword from '@/components/profile/ProfileResetPassword.vue';
import Activate from '@/components/profile/ProfileActivate.vue';
import Profile from '@/components/Profile.vue';
import Product from '@/components/Product.vue';
import NotFound from '@/components/NotFound.vue';
import PaySuccess from '@/components/Pay/Success.vue';
import PayFail from '@/components/Pay/Fail.vue';
import OdrPlus from '@/components/OdrPlus.vue';

import AuthGuard from '@/router/guard';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '*',
            name: 'notFound',
            component: NotFound,
            template: null,
            meta: {
                access: {
                    guest: true,
                    auth: true
                },
                title: 'Пропала страница',
                description: 'Пропала страница',
                icon: null,
                available: false
            }
        },
        {
            path: '/:lang?/odrplus',
            name: 'odrplus',
            component: OdrPlus,
            meta: {
                title: 'Odr Plus',
                description: 'Торговая система ODR Plus.',
                localized: true,
                access: {
                    guest: true,
                    auth: true
                },
                icon: 'mdi-auto-fix',
                available: true
            }
        },
        {
            path: '/:lang?',
            name: 'home',
            component: Home,
            meta: {
                description: 'Индикатор опционных уровней Option Profit. Прибыльная торговля.',
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
                title: 'Login',
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
                title: 'Registration',
                icon: 'mdi-account-plus',
                available: true
            }
        },
        {
            path: '/:lang?/profile',
            name: 'profile',
            component: Profile,
            beforeEnter: AuthGuard,
            meta: {
                access: {
                    guest: false,
                    auth: true,
                    roles: [
                        ''
                    ]
                },
                title: 'Profile',
                icon: 'mdi-contacts',
                available: true
            }
        },
        {
            path: '/product',
            name: 'product',
            component: Product,
            beforeEnter: AuthGuard,
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
        },
        {
            path: '/:lang?/logout',
            name: 'logout',
            component: null,
            beforeEnter: AuthGuard,
            meta: {
                access: {
                    guest: false,
                    auth: true,
                    roles: [
                        ''
                    ]
                },
                title: 'Logout',
                icon: 'mdi-exit-to-app',
                available: true
            }
        },
    ]
})
