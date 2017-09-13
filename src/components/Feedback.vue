<template>
    <v-container fluid>
        <v-layout row wrap>
            <v-flex xs12 md6 offset-md3>
                <v-card>
                    <v-card-text>
                        <span class="title">{{ $t('Feedback') }}</span>
                        <v-text-field
                                :label="$t('Your e-mail/login')"
                                class="mt-5"
                                :hint="$t('Enter the e-mail provided during registration for answer')"
                                v-model="email"
                                required
                                :disabled="this.isLogin === true"
                                :error-messages="errors && errors.email ? $t(errors.email[0]) : []"
                                :error="errors && !!errors.email"
                        ></v-text-field>
                        <v-text-field
                                v-model="text"
                                class="mt-5"
                                :label="$t('Feedback message')"
                                :hint="$t('Enter your question for us')"
                                multi-line
                                required
                                :error-messages="errors && errors.text ? $t(errors.text[0]) : []"
                                :error="errors && !!errors.text"
                        ></v-text-field>

                        <p class="mt-4 button-for-small-screens">
                            <v-btn info
                                   large
                                   block
                                   :loading="pending"
                                   :disabled="pending"
                                   @click="submitForm({ email: email, text: text })"
                                   class="hidden-sm-and-up"
                            >
                                {{ $t('Send') }}
                                <span slot="loader">{{ $t('Processing') }}...</span>
                            </v-btn>
                        </p>
                        <p class="mt-4 button-for-big-screens">
                            <v-btn info
                                   large
                                   :loading="pending"
                                   :disabled="pending"
                                   @click="submitForm({ email: email, text: text })"
                                   class="hidden-xs-only"
                            >
                                {{ $t('Send') }}
                                <span slot="loader">{{ $t('Processing') }}...</span>
                            </v-btn>
                        </p>
                    </v-card-text>
                </v-card>
            </v-flex>

            <v-dialog v-model="systemDialog" persistent>
                <v-card>
                    <v-card-title class="headline">
                        <v-icon v-if="message" class="green--text darken-1">
                            mdi-comment-alert-outline
                        </v-icon>
                        <v-icon v-if="errors.system" class="red--text darken-1">
                            mdi-comment-alert-outline
                        </v-icon>
                    </v-card-title>
                    <v-card-text v-if="message">
                        {{ $t(message) }}
                    </v-card-text>
                    <v-card-text v-if="errors.system">
                        {{ $t(errors.system) }}
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="red--text darken-1" flat="flat" @click="closeSystemDialog();">{{ $t('Close') }}</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
    </v-container>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        mounted() {
            if (!!this.isLogin) {
                this.email = this.profile.email;
            }
        },
        data () {
            return {
                email: '',
                text: '',
                loader: null,
                errors: [],
                message: null,
                systemDialog: false,
            }
        },
        computed: {
            ...mapGetters('User', [
                'profile', 'isLogin', 'pending'
            ])
        },
        methods: {
            closeSystemDialog: function() {
                this.systemDialog = false;

                if (this.isLogin === false) {
                    this.email = '';
                }

                this.text = '';
                this.errors = [];
            },
            submitForm: function (formData) {
                this.$store.dispatch('User/feedback', formData).then(response => {
                    this.errors = [];
                    this.message = response.data.message;
                    this.systemDialog = true;
                }).catch(errors => {
                    this.errors = errors;

                    if (this.errors && this.errors.system) {
                        this.systemDialog = true;
                    }
                })
            },
        }
    }
</script>

<style lang="scss">
    p.button-for-big-screens {
        text-align: right;
    }
</style>