import base_api_config from './base_http_config.js';

const HTTP = base_api_config.instance;

export default {
    view() {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };

        return HTTP.get('/view', { headers: headers });
    },
    show(newsId) {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };

        return HTTP.get('/show/' + newsId, { headers: headers });
    }
}