<template>
    <v-container fluid>
        <v-layout row wrap>
            <v-flex xs12 md6 offset-md3>
                <v-card>
                    <v-card-text>
                        <span class="title">{{ $t('Authorization') }}</span>
                        <v-text-field
                                :label="$t('Your e-mail/login')"
                                class="mt-5"
                                :hint="$t('Enter the e-mail provided during registration')"
                                v-model="email"
                                required
                                :error-messages="errors && errors.email ? $t(errors.email[0]) : []"
                                :error="errors && !!errors.email"
                        ></v-text-field>
                        <v-text-field
                                :label="$t('Your password')"
                                :hint="$t('Enter the password you provided during registration')"
                                v-model="password"
                                :append-icon="e1 ? 'visibility_off' : 'visibility'"
                                :append-icon-cb="() => (e1 = !e1)"
                                :type="e1 ? 'password' : 'text'"
                                required
                                :error-messages="errors && errors.password ? $t(errors.password[0]) : []"
                                :error="errors && !!errors.password"
                        ></v-text-field>
                        <v-btn
                                info
                                large
                                block
                                :loading="pending"
                                :disabled="pending"
                                @click="submitForm({email: email, password: password})"
                        >
                            {{ $t('Login') }}
                            <span slot="loader">{{ $t('Processing') }}...</span>
                        </v-btn>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs12 md6 offset-md3>
                <p class="text-xs-center">
                    <v-btn flat
                           primary
                           :to="'/new/password'"
                    >
                        {{ $t('Reset password') }}
                    </v-btn>
                    |
                    <v-btn flat
                           primary
                           :to="'registration'"
                    >
                        {{ $t('Registration') }}
                    </v-btn>
                </p>
            </v-flex>
        </v-layout>

        <v-dialog v-model="dialog" persistent>
            <v-card>
                <v-card-title class="headline">
                    <v-icon class="red--text darken-1">
                        mdi-comment-alert-outline
                    </v-icon>
                </v-card-title>
                <v-card-text v-if="errors.system">
                    {{ $t(errors.system) }}
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="red--text darken-1" flat="flat" @click.native="dialog = false">{{ $t('Close') }}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-snackbar
                timeout="6000"
                top
                multi-line
                v-model="snackbar"
        >
            {{ $t('Hello, you have been successfully log in on the website') }}
        </v-snackbar>
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
                dialog: false,
                snackbar: false,
            }
        },
        computed: {
            ...mapGetters('User', [
                'pending'
            ])
        },
        methods: {
            submitForm: function (formData) {
                this.$store.dispatch('User/login', formData).then(() => {
                    this.errors = [];
                    this.snackbar = true;
                }).catch(errors => {
                    this.errors = errors;

                    if (this.errors && this.errors.system) {
                        this.dialog = true
                    }
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