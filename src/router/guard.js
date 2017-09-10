import store from '@/store/index';

export default (to, from, next) => {
    store.dispatch('User/checkProfile').then(() => {
        next();
    }).catch(() => {
        next('/' + store.getters.currentLanguage.urlPrefix + '/login');
    });
}