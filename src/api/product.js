import base_api_config from './base_http_config.js'

const HTTP = base_api_config.instance

export default {
    list() {
        return HTTP.get('/products', { headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt_token') } })
    },
    save(formBody) {
        return HTTP.put('/products' + (formBody.id !== undefined ? formBody.id : ''), {
            name: formBody.name,
            path: formBody.path,
            description: formBody.description,
            price: formBody.price,
            price_by: formBody.price_by,
            demo_access_days: formBody.demo_access_days,
            active: formBody.active
        }, { headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt_token') } })
    }
}