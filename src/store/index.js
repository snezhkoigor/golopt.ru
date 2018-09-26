import Vue from 'vue';
import Vuex from 'vuex';
import User from './user';
import Product from './product';
import Dictionary from './dictionary';
import Youtube from './youtube';
import Meta from './meta';
import News from './news';
import Lesson from './lesson';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        User,
        Product,
        Dictionary,
        Youtube,
        Meta,
        News,
        Lesson
    },
    plugins: [createPersistedState()]
})
