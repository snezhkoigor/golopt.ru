import base_api_config from './base_http_config.js';

const HTTP = base_api_config.instance;

export default {
    list() {
        return HTTP.get('/dictionary')
    }
}