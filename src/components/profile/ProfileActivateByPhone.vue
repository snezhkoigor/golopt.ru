<template>
    <v-container fluid>
        <v-layout row wrap>
            <v-flex xs12 md6 offset-md3>
                <v-card>
                    <v-card-text>
                        <span class="title">{{ $t('Activation') }}</span>
                        <v-text-field
                                :label="$t('Activation code')"
                                class="mt-5"
                                :hint="$t('Enter activation code from sms')"
                                v-model="code"
                                required
                                :error-messages="errors && errors.code ? $t(errors.code[0]) : []"
                                :error="errors && !!errors.code"
                        ></v-text-field>
                        <v-btn
                                info
                                large
                                block
                                :loading="pending"
                                :disabled="pending"
                                @click="submitForm({token: code})"
                        >
                            {{ $t('Activate') }}
                            <span slot="loader">{{ $t('Processing') }}...</span>
                        </v-btn>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>

        <v-dialog v-model="dialog" persistent>
            <v-card>
                <v-card-title class="headline">
                    <v-icon v-if="errors.system" class="red--text darken-1">
                        mdi-comment-alert-outline
                    </v-icon>
                    <v-icon v-if="!errors.system" class="green--text darken-1">
                        mdi-comment-alert-outline
                    </v-icon>
                </v-card-title>
                <v-card-text v-if="errors.system">
                    {{ $t(errors.system) }}
                </v-card-text>
                <v-card-text v-if="!errors.system">
                    {{ $t('Your account verifyed') }}
                </v-card-text>
                <v-card-actions v-if="errors.system">
                    <v-spacer></v-spacer>
                    <v-btn class="red--text darken-1" flat="flat" @click.native="dialog = false">{{ $t('Close') }}</v-btn>
                </v-card-actions>
                <v-card-actions v-if="!errors.system">
                    <v-spacer></v-spacer>
                    <v-btn class="green--text darken-1" flat="flat" @click.native="goToLogin">{{ $t('Close') }}</v-btn>
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
                errors: [],
                code: '',
                success: false,
                fail: false,
                dialog: false
            }
        },
        computed: {
            ...mapGetters('User', [
                'pending'
            ]),
            ...mapGetters('User', [
                'activation'
            ]),
        },
        methods: {
            submitForm: function (formData) {
                this.$store.dispatch('User/activation', formData.token).then(() => {
                    this.errors = [];
                    this.dialog = true;
                }).catch(errors => {
                    this.errors = errors;

                    if (this.errors && this.errors.system) {
                        this.dialog = true;
                    }
                });
            },
            goToLogin: function() {
                this.$router.push({
                    'name': 'login'
                });
            }
        }
    }
</script>

<style lang="scss"></style>