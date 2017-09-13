import store from '../store/index';
import base_api_config from '../api/base_http_config.js';
import { events } from 'vue-i18n-manager'

const HTTP = base_api_config.instance;

const config = {
    persistent: true,
    defaultCode: 'ru-Ru',
    languages: [
        {
            name: 'Русский',
            code: 'ru-Ru',
            urlPrefix: 'ru',
            translationKey: 'ru'
        },
        {
            name: 'English',
            code: 'en-US',
            urlPrefix: 'en',
            translationKey: 'en'
        }
    ],
    translations: {}
};

const proxy = {
    getTranslation: function () {
        return HTTP.get('/dictionary/fragment/' + store.getters.currentLanguage.urlPrefix).then(response => {
            return response.data
        })
    },
    localStorage: localStorage
};

export default {
    config,
    proxy
};