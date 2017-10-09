const SET_TITLE = "SET_TITLE";
const SET_DESCRIPTION = "SET_DESCRIPTION";
const SET_PENDING = "SET_PENDING";

const state = {
    title: '',
    pending: false
};

const actions = {
    setTitle({ commit }, title) {
        commit(SET_TITLE, title);
    },
    setDescription({ commit }, description) {
        commit(SET_DESCRIPTION, description);
    },
    setPending({ commit }, pending) {
        commit(SET_DESCRIPTION, pending);
    }
};

const mutations = {
    SET_TITLE (state, title) {
        state.title = title;
    },
    SET_DESCRIPTION (state, description) {
        state.description = description;
    },
    SET_PENDING (state, pending) {
        state.pending = pending;
    }
};

const getters = {
    title (state) {
        return state.title
    },
    description (state) {
        return state.description
    },
    pending (state) {
        return state.pending
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

