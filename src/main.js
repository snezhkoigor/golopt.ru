import Vue from 'vue';
import VueResource from 'vue-resource';
import VueMoment from 'vue-moment';
import moment from '../node_modules/moment/min/moment-with-locales.min';
import router from '@/router/index';
import App from '@/components/App.vue';
import store from '@/store/index';
import Vuetify from 'vuetify';
import { sync } from 'vuex-router-sync';
import VueI18nManager from 'vue-i18n-manager';
import i18nSettings from '@/config/i18n';
import Meta from 'vue-meta';
import { events } from 'vue-i18n-manager';
import vueSmoothScroll from 'vue-smooth-scroll';
import VueCurrencyFilter from 'vue-currency-filter';
import VueYouTubeEmbed from 'vue-youtube-embed';

sync(store, router);

Vue.use(Vuetify);
Vue.use(VueResource);
Vue.use(VueMoment, {
    moment
});
Vue.use(vueSmoothScroll);

Vue.use(VueI18nManager, {
    store: store,
    config: i18nSettings.config,
    router: router,
    proxy: i18nSettings.proxy
});

Vue.use(Meta);
Vue.use(VueCurrencyFilter, {symbol : '$'})
Vue.initI18nManager();
Vue.use(VueYouTubeEmbed);

new Vue({
    el: '#app',
    router,
    store,
    beforeMount: function () {
        this.$store.dispatch('User/resetPending');
    },
    render: h => h(App)
});
