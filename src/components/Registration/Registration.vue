<template>
    <v-container fluid grid-list-md>
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
                            <v-select
                                    :items="dictionary.countries"
                                    v-model="country"
                                    :label="$t('Country')"
                                    :hint="$t('Enter your country (in eng)')"
                                    persistent-hint
                                    required
                                    autocomplete
                                    :error-messages="errors && errors.country ? $t(errors.country[0]) : []"
                                    :error="errors && !!errors.country"
                            ></v-select>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs2 sm1>
                                <v-text-field
                                        :prefix="phonePrefix"
                                        disabled
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field
                                        :label="$t('Phone number')"
                                        :hint="$t('Enter your phone number without country code')"
                                        v-model="phone"
                                        mask="phone"
                                        required
                                        :error-messages="errors && errors.phone ? $t(errors.phone[0]) : []"
                                        :error="errors && !!errors.phone"
                                ></v-text-field>
                            </v-flex>
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
                                color="info"
                                large
                                block
                                :loading="pending"
                                :disabled="pending"
                                @click="submitForm({first_name: first_name, last_name: last_name, email: email, password: password, country: country, phone: phone})"
                        >
                            {{ $t('Sing Up') }}
                            <span slot="loader">{{ $t('Processing') }}...</span>
                        </v-btn>
                    </v-card-text>
                </v-card>
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
                phone: '',
                last_name: '',
                country: null,
                loader: null,
                errors: [],
                dialog: false,
                phonePrefix: ""
            }
        },
        computed: {
            ...mapGetters('Dictionary', [
                'dictionary'
            ]),
            ...mapGetters('User', [
                'pending'
            ])
        },
        watch: {
            country: function (val) {
                this.phonePrefix = '+' + this.dictionary.codes[val] + '   '
            },
        },
        methods: {
            submitForm: function (formData) {
                this.$store.dispatch('User/registration', formData).then(() => {
                    this.errors = [];
                    this.dialog = false;
                    this.$router.push({
                        'name': 'activationByPhone'
                    });
                }).catch(errors => {
                    this.errors = errors;

                    if (this.errors && this.errors.system) {
                        this.dialog = true
                    }
                })
            },
            isNumber: function(evt) {
                evt = (evt) ? evt : window.event;
                let charCode = (evt.which) ? evt.which : evt.keyCode;

                if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                    evt.preventDefault();
                } else {
                    return true;
                }
            }
        }
    }
</script>

<style lang="scss">

</style>