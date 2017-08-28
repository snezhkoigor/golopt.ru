import Vue from 'vue';
import VueResource from 'vue-resource';
import VueMoment from 'vue-moment';
import router from './router/index';
import App from './components/App.vue';
import store from './store/index';
import momentLocaleRu from '../node_modules/moment/locale/ru';
import Vuetify from 'vuetify';
import { sync } from 'vuex-router-sync';
import VueI18nManager from 'vue-i18n-manager';
import base_api_config from './api/base_http_config.js';

const HTTP = base_api_config.instance;

sync(store, router);

Vue.use(Vuetify);
Vue.use(VueResource);
Vue.use(VueMoment, {
    momentLocaleRu
});

const proxy = {
    getTranslation: function ({ translationKey }) {
        return HTTP.get(`/dictionary/fragment/${translationKey}`).then(function (response) {
            return response.data
        })
    }
};

Vue.use(VueI18nManager, {
    store,
    config: {
        defaultCode: 'ru-Ru',
        languages: [
            {
                name: 'Русский',
                code: 'ru-Ru',
                urlPrefix: 'ru',
                translationKey: 'ru'
            }
        ],
        translations: {},
    },
    router,
    proxy
});

Vue.initI18nManager();

router.beforeEach((to, from, next) => {
    if (to.name === 'changeEmail') {
        if (to.params.token !== undefined) {
            store.dispatch('User/changeEmail', { token: to.params.token }).then(() => {
                store.dispatch('User/profile').then(() => {
                    router.push({
                        name: 'profile'
                    })
                })
            }).catch(error => {
                router.push({
                    name: 'login'
                })
            })
        }
    }

    if (to.meta.access.guest === false) {
        store.dispatch('User/profile').then(() => {
            next()
        }).catch(error => {
            router.push({
                name: 'login'
            })
        })
    } else {
        next()
    }

    if (to.name === 'logout') {
        store.dispatch('User/logout').then(() => {
            router.push({
                name: 'home'
            })
        }).catch(error => {
            router.push({
                name: 'home'
            })
        })
    }
});

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
