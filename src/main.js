import Vue from 'vue';
import VueResource from 'vue-resource';
import VueMoment from 'vue-moment';
import momentLocaleRu from '../node_modules/moment/locale/ru';
import momentLocaleEn from '../node_modules/moment/locale/en-gb';
import router from '@/router/index';
import App from '@/components/App.vue';
import store from '@/store/index';
import Vuetify from 'vuetify';
import { sync } from 'vuex-router-sync';
import VueI18nManager from 'vue-i18n-manager';
import i18nSettings from '@/config/i18n';
import Meta from 'vue-meta';

sync(store, router);

Vue.use(Vuetify);
Vue.use(VueResource);
Vue.use(VueMoment);

Vue.use(VueI18nManager, {
    store: store,
    config: i18nSettings.config,
    router: router,
    proxy: i18nSettings.proxy
});

Vue.use(Meta);
Vue.initI18nManager();

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
