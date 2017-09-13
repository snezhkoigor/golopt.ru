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
import { events } from 'vue-i18n-manager'

sync(store, router);

Vue.use(Vuetify);
Vue.use(VueResource);
Vue.use(VueMoment, {
    moment
});

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
    data: {
        title: '',
        description: ''
    },
    beforeMount: function (store, events) {
        this.$store.dispatch('User/resetPending');

        this.$store.dispatch('Dictionary/list').then(() => {
            const code = 'ru-Ru';
            const trans = this.dictionary.locales;

            this.$store.dispatch(events.ADD_TRANSLATION, { trans, code });

            this.title = this.$router.currentRoute.meta.title ? this.$t(this.$router.currentRoute.meta.title) : this.$router.currentRoute.name;
            this.description = this.$router.currentRoute.meta.description ? this.$t(this.$router.currentRoute.meta.description) : this.$router.currentRoute.name;
        });
    },
    render: h => h(App)
});
