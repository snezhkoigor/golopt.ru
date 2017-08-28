import api from '../api/dictionary.js';

const GET = "GET";
const GET_SUCCESS = "GET_SUCCESS";
const GET_FAIL = "GET_FAIL";

const state = {
    dictionary: [],
    pending: false
};

const actions = {
    list({ commit }) {
        return new Promise((resolve, reject) => {
            commit(GET);

            api.list().then(response => {
                if (response.data.status) {
                    commit(GET_SUCCESS, response.data.data);
                    resolve(response);
                } else {
                    commit(GET_FAIL);

                    let errors = null;
                    if ((response.data.message !== null) && (typeof( response.data.message ) === 'object')) {
                        errors = response.data.message;
                    } else {
                        errors =  {
                            system: response.data.message
                        };
                    }
                    if (process.env !== 'production') window.console.log('error', errors);

                    reject(errors);
                }
            }, error => {
                commit(GET_FAIL);
                reject(error);
            })
        })
    }
}

const mutations = {
    GET (state) {
        state.pending = true;
    },
    GET_SUCCESS (state, items) {
        state.dictionary = items;
        state.pending = false;
    },
    GET_FAIL (state) {
        state.items = [];
        state.pending = false;
    }
}

const getters = {
    dictionary (state) {
        return state.dictionary
    }
};

const namespaced = true;

export default {
    namespaced,
    state,
    actions,
    mutations,
    getters
}