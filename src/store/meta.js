const SET_TITLE = "SET_TITLE";
const SET_DESCRIPTION = "SET_DESCRIPTION";

const state = {
    title: ''
};

const actions = {
    setTitle({ commit }, title) {
        commit(SET_TITLE, title);
    },
    setDescription({ commit }, description) {
        commit(SET_DESCRIPTION, description);
    }
}

const mutations = {
    SET_TITLE (state, title) {
        state.title = title;
    },
    SET_DESCRIPTION (state, description) {
        state.description = description;
    }
}

const getters = {
    title (state) {
        return state.title
    },
    description (state) {
        return state.description
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

