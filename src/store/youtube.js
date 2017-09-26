import api from '../api/youtube';

const YOUTUBE_CHANEL_VIDEOS = "YOUTUBE_CHANEL_VIDEOS";
const YOUTUBE_CHANEL_VIDEOS_SUCCESS = "YOUTUBE_CHANEL_VIDEOS_SUCCESS";
const YOUTUBE_CHANEL_VIDEOS_FAIL = "YOUTUBE_CHANEL_VIDEOS_FAIL";

const state = {
    videos: [],
    pending: false
};

const actions = {
    list({ commit }) {
        return new Promise((resolve, reject) => {
            commit(YOUTUBE_CHANEL_VIDEOS);

            api.list().then(response => {
                if (response.data.status) {
                    commit(YOUTUBE_CHANEL_VIDEOS_SUCCESS, response.data.data);
                    resolve(response);
                } else {
                    commit(YOUTUBE_CHANEL_VIDEOS_FAIL);

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
                commit(YOUTUBE_CHANEL_VIDEOS_FAIL);
                reject(error);
            })
        })
    }
}

const mutations = {
    YOUTUBE_CHANEL_VIDEOS (state) {
        state.pending = true;
    },
    YOUTUBE_CHANEL_VIDEOS_SUCCESS (state, videos) {
        state.pending = false;
        state.videos = videos;
    },
    YOUTUBE_CHANEL_VIDEOS_FAIL (state) {
        state.pending = false;
        state.videos = [];
    }
}

const getters = {
    videos (state) {
        return state.videos
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