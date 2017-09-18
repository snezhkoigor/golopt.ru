import api from '../api/product.js';

const GET_LIST = "GET_LIST";
const GET_LIST_SUCCESS = "GET_LIST_SUCCESS";
const GET_LIST_FAIL = "GET_LIST_FAIL";
const SAVE_PRODUCT = "SAVE_PRODUCT";
const SAVE_PRODUCT_SUCCESS = "SAVE_PRODUCT_SUCCESS";
const SAVE_PRODUCT_FAIL = "SAVE_PRODUCT_FAIL";
const PAY = "PAY";
const PAY_FAIL = "PAY_FAIL";
const PAY_SUCCESS = "PAY_SUCCESS";

const state = {
    products: [],
    has_demo_products: [],
    pending: false
};

const actions = {
    pricing({ commit }) {
        return new Promise((resolve, reject) => {
            commit(GET_LIST);

            api.pricing().then(function (response) {
                if (response.data.status) {
                    commit(GET_LIST_SUCCESS, response.data.data);
                    resolve(response);
                } else {
                    commit(GET_LIST_FAIL);

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
                commit(GET_LIST_FAIL);
                reject(error);
            })
        })
    },
    list({ commit }) {
        return new Promise((resolve, reject) => {
            commit(GET_LIST);

            api.list().then(function (response) {
                if (response.data.status) {
                    commit(GET_LIST_SUCCESS, response.data.data);
                    resolve(response);
                } else {
                    commit(GET_LIST_FAIL);

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
                commit(GET_LIST_FAIL);
                reject(error);
            })
        })
    },
    save({ commit }, formBody) {
        return new Promise((resolve, reject) => {
            commit(SAVE_PRODUCT);

            api.save(formBody).then(response => {
                if (response.data.status) {
                    commit(SAVE_PRODUCT_SUCCESS, response.data.data);
                    resolve(response);
                } else {
                    commit(SAVE_PRODUCT_FAIL);

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
                commit(SAVE_PRODUCT_FAIL);
                reject(error);
            })
        })
    },
    pay({ commit }, formBody) {
        return new Promise((resolve, reject) => {
            commit(PAY);

            api.pay(formBody).then(response => {
                if (response.data.status) {
                    commit(PAY_SUCCESS);
                    resolve(response);
                } else {
                    commit(PAY_FAIL);

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
                commit(PAY_FAIL);
                reject(error);
            })
        })
    },
    demo({ commit }, formBody) {
        return new Promise((resolve, reject) => {
            commit(PAY);

            api.demo(formBody).then(response => {
                if (response.data.status) {
                    commit(PAY_SUCCESS);
                    resolve(response);
                } else {
                    commit(PAY_FAIL);

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
                commit(PAY_FAIL);
                reject(error);
            })
        })
    }
}

const mutations = {
    GET_LIST (state) {
        state.pending = true;
    },
    PAY (state) {
        state.pending = true;
    },
    PAY_SUCCESS (state) {
        state.pending = false;
    },
    PAY_FAIL (state) {
        state.pending = false;
    },
    GET_LIST_SUCCESS (state, products) {
        state.pending = false;
        state.products = products;
    },
    GET_LIST_FAIL (state) {
        state.pending = false;
        state.products = [];
    },
    SAVE_PRODUCT (state) {
        state.pending = true;
    },
    SAVE_PRODUCT_SUCCESS (state, products) {
        state.pending = false;
        state.products = products;
    },
    SAVE_PRODUCT_FAIL (state) {
        state.pending = false;
    }
}

const getters = {
    products (state) {
        return state.products;
    },
    pending (state) {
        return state.pending;
    },
    has_demo (state) {
        if (!!state.products) {
            state.products.forEach(function(value) {
                if (value.has_demo === 1) {
                    state.has_demo_products.push(value);
                }
            })
        }

        return state.has_demo_products;
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