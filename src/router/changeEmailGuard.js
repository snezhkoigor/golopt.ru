import store from '@/store/index';

export default (to, from, next) => {
    if (to.params.token !== undefined) {
        store.dispatch('User/changeEmail', { token: to.params.token }).then(response => {
            if (response.data.status) {
                store.dispatch('User/profile').then(() => {
                    window.location.replace('/' + store.getters.currentLanguage.urlPrefix + '/profile');
                });
            } else {
                window.location.replace('/' + store.getters.currentLanguage.urlPrefix + '/login');
            }
        }).catch(() => {
            window.location.replace('/' + store.getters.currentLanguage.urlPrefix + '/login');
        });
    }
}