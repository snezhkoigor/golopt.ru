<template>
    <v-container fluid>
        <v-layout row wrap>
            <v-flex xs12 md6 offset-md3>
                <v-card>
                    <v-card-text>
                        <span class="title">{{ $t('Registration') }}</span>
                        <v-layout row>
                            <v-text-field
                                    :label="$t('Your e-mail/login')"
                                    class="mt-5"
                                    :hint="$t('Enter the e-mail address required for authorization')"
                                    v-model="email"
                                    required
                                    :error-messages="errors && errors.email ? $t(errors.email[0]) : []"
                                    :error="errors && !!errors.email"
                            ></v-text-field>
                        </v-layout>
                        <v-layout row>
                            <v-text-field
                                    :label="$t('Your password')"
                                    :hint="$t('Enter the password required for authorization')"
                                    v-model="password"
                                    :append-icon="e1 ? 'visibility_off' : 'visibility'"
                                    :append-icon-cb="() => (e1 = !e1)"
                                    :type="e1 ? 'password' : 'text'"
                                    :error-messages="errors && errors.password ? $t(errors.password[0]) : []"
                                    :error="errors && !!errors.password"
                            ></v-text-field>
                        </v-layout>
                        <v-layout row class="hidden-sm-and-up">
                            <v-text-field
                                    :label="$t('First name')"
                                    :hint="$t('Enter your first name')"
                                    v-model="first_name"
                            ></v-text-field>
                        </v-layout>
                        <v-layout row class="hidden-sm-and-up">
                            <v-text-field
                                    :label="$t('Last name')"
                                    :hint="$t('Enter your last name')"
                                    v-model="last_name"
                            ></v-text-field>
                        </v-layout>
                        <v-layout row class="hidden-xs-only" >
                            <v-flex xs12 sm6>
                                <v-text-field
                                        :label="$t('First name')"
                                        class="mt-5"
                                        :hint="$t('Enter your first name')"
                                        v-model="first_name"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-text-field
                                        :label="$t('Last name')"
                                        class="mt-5"
                                        :hint="$t('Enter your last name')"
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
                            {{ $t('Sing Up') }}
                            <span slot="loader">{{ $t('Processing') }}...</span>
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
                this.$store.dispatch('User/registration', formData).then(() => {
                    this.errors = [];
                    this.$router.push({
                        'name': 'registrationSuccess'
                    });
                }).catch(errors => {
                    this.errors = errors;
                })
            }
        }
    }
</script>

<style lang="scss">

</style>