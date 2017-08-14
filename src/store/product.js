import api from '../api/product.js'

const GET_LIST = "GET_LIST"
const GET_LIST_SUCCESS = "GET_LIST_SUCCESS"
const GET_LIST_FAIL = "GET_LIST_FAIL"
const SAVE_PRODUCT = "SAVE_PRODUCT"
const SAVE_PRODUCT_SUCCESS = "SAVE_PRODUCT_SUCCESS"
const SAVE_PRODUCT_FAIL = "SAVE_PRODUCT_FAIL"
const ADD_ERRORS = "ADD_ERRORS"
const REMOVE_ERRORS = "REMOVE_ERRORS"

const state = {
    products: [],
    pending: false,
    errors: null,
}

const actions = {
    list({ commit }) {
        commit(GET_LIST)

        api.list().then(function (response) {
            if (response.data.status) {
                let products = response.data.data
                if (products !== undefined) {
                    commit(GET_LIST_SUCCESS, products)
                }
            } else {
                commit(GET_LIST_FAIL)

                if ((response.data.message !== null) && (typeof( response.data.message ) === 'object')) {
                    commit(ADD_ERRORS, response.data.message)
                } else {
                    commit(ADD_ERRORS, {system: response.data.message})
                }
                window.console.log('error', response)
            }
        }.bind(this));
    },
    save({ commit }, formBody) {
        commit(SAVE_PRODUCT)

        api.save(formBody).then(function (response) {
            if (response.data.status) {
                let products = response.data.data
                if (products !== undefined) {
                    commit(SAVE_PRODUCT_SUCCESS, products)
                }
            } else {
                commit(SAVE_PRODUCT_FAIL)

                if ((response.data.message !== null) && (typeof( response.data.message ) === 'object')) {
                    commit(ADD_ERRORS, response.data.message)
                } else {
                    commit(ADD_ERRORS, {system: response.data.message})
                }
                window.console.log('error', response)
            }
        })
    },
    clearErrors({ commit }, milliseconds) {
        setTimeout(function() { commit(REMOVE_ERRORS) }, parseInt(milliseconds) ? milliseconds : 10000)
    }
}

const mutations = {
    ADD_ERRORS (state, errors) {
        state.errors = errors
    },
    REMOVE_ERRORS (state) {
        state.errors = null
    },
    GET_LIST (state) {
        state.pending = true
    },
    GET_LIST_SUCCESS (state, products) {
        state.pending = false
        state.products = products
    },
    GET_LIST_FAIL (state) {
        state.pending = false
        state.products = []
    },
    SAVE_PRODUCT (state) {
        state.pending = true
    },
    SAVE_PRODUCT_SUCCESS (state, products) {
        state.pending = false
        state.products = products
    },
    SAVE_PRODUCT_FAIL (state) {
        state.pending = false
    }
}

const getters = {
    products (state) {
        return state.products
    },
    errors (state) {
        return state.errors
    },
    pending (state) {
        return state.pending
    }
}

const namespaced = true

export default {
    namespaced,
    state,
    actions,
    mutations,
    getters
}