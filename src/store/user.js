import api from '../api/user.js';
import router from '../router/index';

const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const GET_PROFILE_SUCCESS = "GET_PROFILE_SUCCESS";
const GET_PROFILE_FAIL = "GET_PROFILE_FAIL";
const LOGIN_FAIL = "LOGIN_FAIL";
const LOGOUT = "LOGOUT";
const REGISTER = "REGISTER";
const REGISTER_SUCCESS = "REGISTER_SUCCESS";
const REGISTER_FAIL = "REGISTER_FAIL";
const USER_UPDATE = "USER_UPDATE";
const USER_UPDATE_SUCCESS = "USER_UPDATE_SUCCESS";
const USER_UPDATE_FAIL = "USER_UPDATE_FAIL";
const GET_USER_ROLES_SUCCESS = "GET_USER_ROLES_SUCCESS";
const GET_USER_ROLES_FAIL = "GET_USER_ROLES_FAIL";

const ACTIVATION = "ACTIVATION";
const ACTIVATION_SUCCESS = "ACTIVATION_SUCCESS";
const ACTIVATION_FAIL = "ACTIVATION_FAIL";
const CHANGE_EMAIL = "CHANGE_EMAIL";
const CHANGE_EMAIL_SUCCESS = "CHANGE_EMAIL_SUCCESS";
const CHANGE_EMAIL_FAIL = "CHANGE_EMAIL_FAIL";
const RESET_PASSWORD = "RESET_PASSWORD";
const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
const RESET_PASSWORD_FAIL = "RESET_PASSWORD_FAIL";

const CANCEL_EMAIL_CHANGE = "CANCEL_EMAIL_CHANGE";
const CANCEL_EMAIL_CHANGE_FAIL = "CANCEL_EMAIL_CHANGE_FAIL";
const CANCEL_EMAIL_CHANGE_SUCCESS = "CANCEL_EMAIL_CHANGE_SUCCESS";

const UPDATE_PRODUCT = "UPDATE_PRODUCT";
const UPDATE_PRODUCT_SUCCESS = "UPDATE_PRODUCT_SUCCESS";
const UPDATE_PRODUCT_FAIL = "UPDATE_PRODUCT_FAIL";

const FEEDBACK = "FEEDBACK";
const FEEDBACK_SUCCESS = "FEEDBACK_SUCCESS";
const FEEDBACK_FAIL = "FEEDBACK_FAIL";

const RESET_PENDING = "RESET_PENDING";


const state = {
    isLoggedIn: !!localStorage.getItem('jwt_token'),
    profile: null,
    token: null,
    roles: [],
    pending: false,
    localPending: {}
};

const actions = {
    login({ commit, dispatch }, formBody) {
        return new Promise((resolve, reject) => {
            commit(LOGIN);

            api.login(formBody).then(response => {
                if (response.data.status) {
                    commit(LOGIN_SUCCESS, response.data.data.token);
                    resolve(response);
                } else {
                    commit(LOGIN_FAIL);

                    let errors = null;
                    if ((response.data.message !== null) && (typeof( response.data.message ) === 'object')) {
                        errors = response.data.message;
                    } else {
                        errors = {
                            system: response.data.message
                        };
                    }
                    if (process.env !== 'production') window.console.log('error', errors);

                    reject(errors);
                }
            }, error => {
                commit(LOGIN_FAIL);
                reject(error);
            })
        }).then(function () {
            dispatch('profile').then(() => {
                router.push({
                    name: 'profile'
                })
            })
        })
    },
    registration({ commit }, formBody) {
        return new Promise((resolve, reject) => {
            commit(REGISTER);

            api.register(formBody).then(response => {
                if (response.data.status) {
                    commit(REGISTER_SUCCESS);
                    resolve(response);
                } else {
                    commit(REGISTER_FAIL);

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
                commit(REGISTER_FAIL);
                reject(error);
            })
        })
    },
    profile({ commit }) {
        return new Promise((resolve, reject) => {
            api.profile().then(response => {
                if (response.data.status) {
                    commit(GET_PROFILE_SUCCESS, response.data.data);
                    resolve(response);
                } else {
                    commit(GET_PROFILE_FAIL);

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
                commit(GET_PROFILE_FAIL);
                commit(LOGOUT);
                reject(error);
            })
        })
    },
    updateProduct({ commit }, formBody) {
        return new Promise((resolve, reject) => {
            commit(UPDATE_PRODUCT);

            api.updateProduct(formBody).then(response => {
                if (response.data.status) {
                    commit(UPDATE_PRODUCT_SUCCESS);
                    resolve(response);
                } else {
                    commit(UPDATE_PRODUCT_FAIL);

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
                commit(UPDATE_PRODUCT_FAIL);
                reject(error);
            })
        })
    },
    updateProfile({ commit, dispatch }, formBody) {
        return new Promise((resolve, reject) => {
            commit(USER_UPDATE);

            api.updateProfile(formBody).then(response => {
                if (response.data.status) {
                    commit(USER_UPDATE_SUCCESS, response.data.data);
                    resolve(response);
                } else {
                    commit(USER_UPDATE_FAIL);

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
                commit(USER_UPDATE_FAIL);
                commit(LOGOUT);
                reject(error);
            })
        }).then(() => {
            dispatch('profile');
        })
    },
    cancelEmailChange({ commit, dispatch }, formBody) {
        return new Promise((resolve, reject) => {
            commit(CANCEL_EMAIL_CHANGE);

            api.cancelEmailChange(formBody).then(response => {
                if (response.data.status) {
                    commit(CANCEL_EMAIL_CHANGE_SUCCESS);
                    resolve(response);
                } else {
                    commit(CANCEL_EMAIL_CHANGE_FAIL);

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
                commit(CANCEL_EMAIL_CHANGE_FAIL);
                commit(LOGOUT);
                reject(error);
            })
        }).then(() => {
            dispatch('profile');
        })
    },
    resetPassword({ commit }, formBody) {
        return new Promise((resolve, reject) => {
            commit(RESET_PASSWORD);

            api.resetPassword(formBody).then(response => {
                if (response.data.status) {
                    commit(RESET_PASSWORD_SUCCESS);
                    resolve(response);
                } else {
                    commit(RESET_PASSWORD_FAIL);

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
                commit(RESET_PASSWORD_FAIL);
                commit(LOGOUT);
                reject(error);
            })
        })
    },
    changeEmail({ commit }, formBody) {
        return new Promise((resolve, reject) => {
            commit(CHANGE_EMAIL);

            api.changeEmail(formBody.token).then(response => {
                if (response.data.status) {
                    commit(CHANGE_EMAIL_SUCCESS);
                    resolve(response);
                } else {
                    commit(CHANGE_EMAIL_FAIL);
                    commit(LOGOUT);

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
                commit(CHANGE_EMAIL_FAIL);
                commit(LOGOUT);
                reject(error);
            })
        }).then(() => {
            router.push({
                name: 'profile'
            })
        })
    },
    activation({ commit }, token) {
        return new Promise((resolve, reject) => {
            commit(ACTIVATION);

            api.activation(token).then(response => {
                if (response.data.status) {
                    commit(ACTIVATION_SUCCESS);
                    resolve(response);
                } else {
                    commit(ACTIVATION_FAIL);

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
                commit(ACTIVATION_FAIL);
                commit(LOGOUT);
                reject(error);
            })
        })
    },
    feedback({ commit }, formBody) {
        return new Promise((resolve, reject) => {
            commit(FEEDBACK);

            api.feedback(formBody).then(response => {
                if (response.data.status) {
                    commit(FEEDBACK_SUCCESS);
                    resolve(response);
                } else {
                    commit(FEEDBACK_FAIL);

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
                commit(FEEDBACK_FAIL);
                reject(error);
            })
        })
    },
    checkProfile({ commit }) {
        return new Promise((resolve, reject) => {
            api.checkProfile().then(response => {
                if (response.data.status) {
                    resolve(response);
                } else {
                    commit(LOGOUT);

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
                commit(LOGOUT);
                reject(error);
            })
        })
    },
    logout({ commit }) {
        return new Promise((resolve, reject) => {
            api.logout().then(response => {
                if (response.data.status) {
                    commit(LOGOUT);
                    resolve(response);
                } else {
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
                reject(error);
            })
        })
    },
    is ({ state }, role) {
        return state.roles.indexOf (role) !== -1;
    },
    findProduct(product_id) {
        let result = null;

        if (state.profile) {
            state.profile.products.forEach((value) => {
                if (value.id === product_id) {
                    result = value;
                }
            })
        }

        return result;
    },
    resetPending({ commit }) {
        commit(RESET_PENDING);
    }
}

const mutations = {
    GET_PRICING_LIST (state) {
        state.pending = true;
    },
    RESET_PENDING (state) {
        state.pending = false;
    },
    FEEDBACK (state) {
        state.pending = true;
    },
    FEEDBACK_SUCCESS (state) {
        state.pending = false;
    },
    FEEDBACK_FAIL (state) {
        state.pending = false;
    },
    CANCEL_EMAIL_CHANGE (state) {
        state.localPending.newEmail = true;
    },
    CANCEL_EMAIL_CHANGE_SUCCESS (state) {
        state.localPending.newEmail = false;
    },
    CANCEL_EMAIL_CHANGE_FAIL (state) {
        state.localPending.newEmail = false;
    },
    RESET_PASSWORD (state) {
        state.pending = true;
    },
    RESET_PASSWORD_SUCCESS (state) {
        state.pending = false;
    },
    RESET_PASSWORD_FAIL (state) {
        state.pending = false;
    },
    UPDATE_PRODUCT (state) {
        state.pending = true;
    },
    UPDATE_PRODUCT_SUCCESS (state) {
        state.pending = false;
    },
    UPDATE_PRODUCT_FAIL (state) {
        state.pending = false;
    },
    CHANGE_EMAIL (state) {
        state.pending = true;
    },
    CHANGE_EMAIL_FAIL (state) {
        state.pending = false;
    },
    CHANGE_EMAIL_SUCCESS (state) {
        state.pending = false;
    },
    ACTIVATION (state) {
        state.pending = true;
    },
    ACTIVATION_FAIL (state) {
        state.pending = false;
    },
    ACTIVATION_SUCCESS (state) {
        state.pending = false;
    },
    USER_UPDATE (state) {
        state.pending = true;
    },
    USER_UPDATE_SUCCESS (state, user) {
        state.pending = false;
        state.profile = user;
    },
    USER_UPDATE_FAIL (state) {
        state.pending = false;
    },
    LOGIN (state) {
        state.pending = true;
    },
    LOGIN_SUCCESS (state, token) {
        localStorage.setItem('jwt_token', token);
        state.isLoggedIn = true;
        state.token = token;
        state.pending = false;
    },
    LOGIN_FAIL (state) {
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('vuex');
        state.isLoggedIn = false;
        state.token = null;
        state.pending = false;
    },
    GET_PROFILE_SUCCESS (state, user) {
        state.profile = user;
        state.pending = false;
    },
    GET_PROFILE_FAIL (state) {
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('vuex');
        state.isLoggedIn = false;
        state.token = null;
        state.pending = false;
    },
    GET_USER_ROLES_SUCCESS (state, roles) {
        state.roles = roles;
        state.pending = false;
    },
    GET_USER_ROLES_FAIL (state) {
        state.roles = [];
        state.isLoggedIn = false;
        state.token = null;
        state.pending = false;
    },
    REGISTER (state) {
        state.pending = true;
    },
    REGISTER_SUCCESS (state) {
        state.pending = false;
    },
    REGISTER_FAIL (state) {
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('vuex');
        state.isLoggedIn = false;
        state.token = null;
        state.pending = false;
    },
    LOGOUT (state) {
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('vuex');
        state.isLoggedIn = false;
        state.profile = null;
        state.token = null;
        state.pending = false;
    }
}

const getters = {
    profile (state) {
        return state.profile;
    },
    token (state) {
        return state.token;
    },
    isLogin (state) {
        return state.isLoggedIn;
    },
    pending (state) {
        return state.pending;
    },
    localPending (state) {
        return state.localPending;
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
