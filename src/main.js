import Vue from 'vue';
import VueResource from 'vue-resource';
import VueMoment from 'vue-moment';
import router from '@/router/index';
import App from '@/components/App.vue';
import store from '@/store/index';
import momentLocaleRu from '../node_modules/moment/locale/ru';
import Vuetify from 'vuetify';
import { sync } from 'vuex-router-sync';
import VueI18nManager from 'vue-i18n-manager';
import i18nSettings from '@/config/i18n';

sync(store, router);

Vue.use(Vuetify);
Vue.use(VueResource);
Vue.use(VueMoment, {
    momentLocaleRu
});

Vue.use(VueI18nManager, {
    store: store,
    config: i18nSettings.config,
    router: router,
    proxy: i18nSettings.proxy
});

Vue.initI18nManager();

// router.beforeEach((to, from, next) => {
//     if (to.name === 'changeEmail') {
//         if (to.params.token !== undefined) {
//             store.dispatch('User/changeEmail', { token: to.params.token }).then(() => {
//                 store.dispatch('User/profile').then(() => {
//                     router.push({
//                         name: 'profile'
//                     })
//                 })
//             }).catch(error => {
//                 router.push({
//                     name: 'login'
//                 })
//             })
//         }
//     }
//
//     if (to.name === 'logout') {
//         store.dispatch('User/logout').then(() => {
//             router.push({
//                 name: 'home'
//             })
//         }).catch(error => {
//             router.push({
//                 name: 'home'
//             })
//         })
//     }
// });

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
