import base_api_config from './base_http_config.js';

const HTTP = base_api_config.instance;

export default {
    list() {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };

        return HTTP.get('/products', { headers: headers });
    },
    save(formBody) {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };

        let data = {
            name: formBody.name,
            path: formBody.path,
            description: formBody.description,
            price: formBody.price,
            price_by: formBody.price_by,
            demo_access_days: formBody.demo_access_days,
            active: formBody.active
        };

        return HTTP.put('/products' + (formBody.id !== undefined ? formBody.id : ''), data, { headers: headers });
    },
    pay(formBody) {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };

        let data = {
            payment_system: formBody.payment_system,
            trade_account: formBody.trade_account,
            broker: formBody.broker
        };

        return HTTP.post('/product/' + formBody.product_id + '/pay', data, { headers: headers });
    },
    demo(formBody) {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };

        let data = {
            payment_system: formBody.payment_system,
            trade_account: formBody.trade_account,
            broker: formBody.broker
        };

        return HTTP.post('/product/demo', data, { headers: headers });
    },
    pricing() {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };

        return HTTP.get('/products/pricing', { headers: headers });
    },
    download(id, trade_account) {
        window.open('http://api.goloption.com/api/product/' + id + '/' + trade_account + '/get', '_blank');
    }
}