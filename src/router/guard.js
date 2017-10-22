import store from '@/store/index';

export default (to, from, next) => {
    store.dispatch('User/checkProfile').then(() => {
        next();
    }).catch(() => {
        // window.location.replace('/' + store.getters.currentLanguage.urlPrefix + '/login');
        next('/' + store.getters.currentLanguage.urlPrefix + '/login');
    });
}