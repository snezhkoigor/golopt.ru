import Vue from 'vue';
import Vuex from 'vuex';
import User from './user';
import Product from './product';
import Dictionary from './dictionary';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        User,
        Product,
        Dictionary
    },
    plugins: [createPersistedState()]
})