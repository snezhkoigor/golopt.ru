<template>
    <v-container fluid>
        <v-layout row wrap>
            <v-flex xs12 md6 offset-md3>
                <v-card>
                    <v-card-text>
                        <span class="title">Регистрация</span>
                        <v-layout row>
                            <v-text-field
                                    label="Ваш e-mail/логин"
                                    class="mt-5"
                                    hint="Введите e-mail, необходимый для авторизации."
                                    v-model="email"
                                    required
                                    :error-messages="errors && errors.email ? errors.email : []"
                                    :error="errors && !!errors.email"
                            ></v-text-field>
                        </v-layout>
                        <v-layout row>
                            <v-text-field
                                    label="Ваш пароль"
                                    hint="Введите пароль, необходимый для авторизации."
                                    v-model="password"
                                    :append-icon="e1 ? 'visibility_off' : 'visibility'"
                                    :append-icon-cb="() => (e1 = !e1)"
                                    :type="e1 ? 'password' : 'text'"
                                    required
                                    :error-messages="errors && errors.password ? errors.password : []"
                                    :error="errors && !!errors.password"
                            ></v-text-field>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs12 sm6>
                                <v-text-field
                                        label="Имя"
                                        class="mt-5"
                                        hint="Введите ваше имя."
                                        v-model="first_name"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-text-field
                                        label="Фамилия"
                                        class="mt-5"
                                        hint="Введите вашу фамилию."
                                        v-model="last_name"
                                ></v-text-field>
                            </v-flex>
                        </v-layout>

                        <v-btn
                                info
                                large
                                block
                                :loading="pending"
                                :disabled="pending"
                                @click="submitForm({first_name: first_name, last_name: last_name, email: email, password: password})"
                        >
                            Зарегистрироваться
                            <span slot="loader">Обработка...</span>
                        </v-btn>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        data () {
            return {
                e1: true,
                email: '',
                password: '',
                first_name: '',
                last_name: '',
                loader: null,
                errors: []
            }
        },
        computed: {
            ...mapGetters('User', [
                'pending'
            ])
        },
        methods: {
            submitForm: function (formData) {
                this.$store.dispatch('User/registration', formData)
                    .then(response => {

                    })
                    .catch(errors => {
                        this.errors = errors
                    })
            }
        }
    }
</script>

<style lang="scss">

</style>