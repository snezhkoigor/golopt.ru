import store from '@/store/index';

export default (to, from, next) => {
    if (store.getters.isLoggedIn) {
        next();
    } else {
        next('/' + store.getters.currentLanguage.urlPrefix + '/login');
    }
}