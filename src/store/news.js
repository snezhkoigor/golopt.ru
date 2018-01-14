import api from '../api/news.js';

const VIEW = "VIEW";
const VIEW_SUCCESS = "VIEW_SUCCESS";
const VIEW_FAIL = "VIEW_FAIL";
const SHOW = "SHOW";
const SHOW_SUCCESS = "SHOW_SUCCESS";
const SHOW_FAIL = "SHOW_FAIL";

const state = {
    news: [],
    newsItem: null,
    pending: false
};

const actions = {
    view({ commit }) {
        return new Promise((resolve, reject) => {
            commit(VIEW);

            api.view().then(function (response) {
                if (response.status) {
                    commit(VIEW_SUCCESS, response.data.data);
                    resolve(response);
                } else {
                    commit(VIEW_FAIL);

                    let errors = null;
                    if ((response.data.message !== null) && (typeof( response.data.message ) === 'object')) {
                        errors = response.data.message;
                    } else {
                        errors = {
                            system: response.data.message
                        };
                    }
                    if (process.env !== 'production')  window.console.log('error', response);

                    reject(errors);
                }
            }, error => {
                commit(VIEW_FAIL);
                reject(error);
            })
        })
    },
    show({ commit }, newsId) {
        return new Promise((resolve, reject) => {
            commit(SHOW);

            api.show(newsId).then(function (response) {
                if (response.status) {
                    commit(SHOW_SUCCESS, response.data.data);
                    resolve(response);
                } else {
                    commit(SHOW_FAIL);

                    let errors = null;
                    if ((response.data.message !== null) && (typeof( response.data.message ) === 'object')) {
                        errors = response.data.message;
                    } else {
                        errors = {
                            system: response.data.message
                        };
                    }
                    if (process.env !== 'production')  window.console.log('error', response);

                    reject(errors);
                }
            }, error => {
                commit(SHOW_FAIL);
                reject(error);
            })
        })
    }
}

const mutations = {
    VIEW (state) {
        state.pending = false;
    },
    VIEW_SUCCESS (state, news) {
        state.pending = false;
        state.news = news;
    },
    VIEW_FAIL (state) {
        state.pending = false;
        state.news = [];
    },
    SHOW (state) {
        state.pending = false;
    },
    SHOW_SUCCESS (state, newsItem) {
        state.pending = false;
        state.newsItem = newsItem;
    },
    SHOW_FAIL (state) {
        state.pending = false;
        state.newsItem = null;
    },
}

const getters = {
    news (state) {
        return state.news;
    },
    pending (state) {
        return state.pending;
    },
    newsItem (state) {
        return state.newsItem;
    }
}

const namespaced = true;

export default {
    namespaced,
    state,
    actions,
    mutations,
    getters
}