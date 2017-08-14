import base_api_config from './base_http_config.js'

const HTTP = base_api_config.instance

export default {
    login(formBody) {
        let data = {
            email: formBody.email,
            password: formBody.password
        }

        return HTTP.post('/login', data)
    },
    register(formBody) {
        let data = {
            first_name: formBody.first_name,
            last_name: formBody.last_name,
            email: formBody.email,
            password: formBody.password
        }

        return HTTP.post('/register', data)
    },
    profile() {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        }

        return HTTP.get('/me', { headers: headers })
    },
    roles() {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        }

        return HTTP.get('/me/roles', { headers: headers })
    },
    updateProfile(formBody) {
        let data = {
            first_name: formBody.first_name,
            last_name: formBody.last_name,
            email: formBody.email,
            new_password: formBody.new_password,
            old_password: formBody.old_password
        }

        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        }

        return HTTP.put('/me', data, { headers: headers })
    },
    activation(token) {
        return HTTP.get('/activation/' + token)
    },
    changeEmail(token) {
        return HTTP.get('/new/email/' + token)
    },
    resetPassword(formBody) {
        return HTTP.post('/new/password', {
            email: formBody.email
        })
    },
    checkProfile() {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        }

        return HTTP.get('/me/status', { headers: headers })
    },
    cancelEmailChange(formBody) {
        let data = {
            new_email: formBody.new_email
        }

        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        }

        return HTTP.delete('/new/email/cancel', { data: data }, { headers: headers })
    }
}