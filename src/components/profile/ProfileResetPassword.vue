<template>
    <v-container fluid>
        <v-layout row wrap>
            <v-flex xs12 md6 offset-md3>
                <v-card>
                    <v-card-text
                            v-if="success.status === false"
                    >
                        <span class="title">Сброс пароля</span>
                        <v-text-field
                                label="Ваш e-mail/логин"
                                class="mt-5"
                                hint="Введите e-mail, указанный при регистрации."
                                v-model="email"
                                required
                                :error-messages="errors && errors.email ? errors.email : []"
                                :error="errors && !!errors.email"
                        ></v-text-field>
                        <v-btn
                                info
                                large
                                block
                                :loading="pending"
                                :disabled="pending"
                                @click="submitForm({email: email})"
                        >
                            Сбросить
                            <span slot="loader">Обработка...</span>
                        </v-btn>
                    </v-card-text>

                    <v-card-text
                            v-if="success.status === true"
                    >
                        <span class="title">Сброс пароля</span>

                        <p class="subheading mt-5 text-xs-center">{{ success.message }}</p>
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
                loader: null,
                errors: [],
                success: {
                    status: false,
                    message: null
                }
            }
        },
        computed: {
            ...mapGetters('User', [
                'pending'
            ])
        },
        methods: {
            submitForm: function (formData) {
                this.$store.dispatch('User/resetPassword', formData)
                    .then(response => {
                        this.success.status = true
                        this.success.message = response.data.message
                    })
                    .catch(errors => {
                        this.errors = errors
                    })
            }
        }
    }
</script>

<style lang="scss">
    .custom-loader {
        animation: loader 1s infinite;
        display: flex;
    }
    @-moz-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @-webkit-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @-o-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>