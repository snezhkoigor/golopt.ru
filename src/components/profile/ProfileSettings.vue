<template>
    <div class="profile-settings" v-if="isLogin" style="width: 100%">
        <v-card class="grey lighten-4 elevation-0">
            <v-card-text>
                <v-container fluid grid-list-md>
                    <div class="hidden-sm-and-up">
                        <v-layout row>
                            <v-text-field
                                    name="first_name"
                                    :label="$t('First name')"
                                    :hint="$t('Enter your first name')"
                                    v-model="profile.first_name"
                            ></v-text-field>
                        </v-layout>
                        <v-layout row>
                            <v-text-field
                                    name="last_name"
                                    :label="$t('Last name')"
                                    :hint="$t('Enter your last name')"
                                    v-model="profile.last_name"
                            ></v-text-field>
                        </v-layout>
                        <v-layout row>
                            <v-text-field
                                    name="email"
                                    :label="$t('Your e-mail')"
                                    :hint="$t('You must provide your e-mail change request')"
                                    v-model="profile.email"
                                    :disabled="profile.active_change_email_requests.length !== 0"
                                    :error-messages="errors && errors.email ? $t(errors.email[0]) : []"
                                    :error="errors && !!errors.email"
                            ></v-text-field>
                        </v-layout>
                        <v-layout row v-if="profile.active_change_email_requests">
                            <div v-for="item in profile.active_change_email_requests" class="mb-3">
                                <v-icon class="active-change-email">mdi-subdirectory-arrow-right</v-icon>
                                <span class="subheading">
                                    {{ item.created_at | moment('calendar') }} {{ $t('was request for change') }} {{ item.new }}

                                    <v-btn flat
                                           class="red--text darken-1"
                                           :loading="localPending.newEmail"
                                           :disabled="localPending.newEmail"
                                           @click="submitCancelChangeNewEmail({new_email: item.new})"
                                    >
                                        {{ $t('cancel') }}
                                        <span slot="loader">{{ $t('Processing') }}...</span>
                                    </v-btn>

                                </span>
                            </div>
                        </v-layout>
                        <v-layout row>
                            <v-text-field
                                    :label="$t('Skype')"
                                    name="Skype"
                                    :hint="$t('Enter your skype for fast contact with you')"
                                    v-model="profile.skype"
                                    :error-messages="errors && errors.skype ? $t(errors.skype[0]) : []"
                                    :error="errors && !!errors.skype"
                            ></v-text-field>
                        </v-layout>

                        <v-layout row>
                            <v-text-field
                                    name="phone"
                                    :label="$t('Phone number')"
                                    disabled
                                    :hint="$t('Enter your phone number without country code')"
                                    v-model="profile.phone"
                            ></v-text-field>
                        </v-layout>
                        <v-layout row>
                            <v-text-field
                                    name="new_password"
                                    :label="$t('New password')"
                                    :hint="$t('Enter new password')"
                                    v-model="profile.new_password"
                                    :append-icon="e1 ? 'visibility_off' : 'visibility'"
                                    :append-icon-cb="() => (e1 = !e1)"
                                    :type="e1 ? 'password' : 'text'"
                                    :error-messages="errors && errors.new_password ? $t(errors.new_password[0]) : []"
                                    :error="errors && !!errors.new_password"
                            ></v-text-field>
                        </v-layout>
                        <v-layout row>
                            <v-text-field
                                    name="old_password"
                                    :label="$t('Current password')"
                                    :hint="$t('Current password for new set')"
                                    v-model="profile.old_password"
                                    :append-icon="e2 ? 'visibility_off' : 'visibility'"
                                    :append-icon-cb="() => (e2 = !e2)"
                                    :type="e2 ? 'password' : 'text'"
                                    :error-messages="errors && errors.old_password ? $t(errors.old_password[0]) : []"
                                    :error="errors && !!errors.old_password"
                            ></v-text-field>
                        </v-layout>
                    </div>
                    <div class="hidden-xs-only">
                        <v-layout row>
                            <v-flex xs4>
                                <v-subheader>{{ $t('Credentials') }}</v-subheader>
                            </v-flex>
                            <v-flex xs12 sm5>
                                <v-text-field
                                        name="first_name"
                                        :label="$t('First name')"
                                        :hint="$t('Enter your first name')"
                                        v-model="profile.first_name"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm5>
                                <v-text-field
                                        name="last_name"
                                        :label="$t('Last name')"
                                        :hint="$t('Enter your last name')"
                                        v-model="profile.last_name"
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs4>
                                <v-subheader>E-mail</v-subheader>
                            </v-flex>
                            <v-flex xs10>
                                <v-text-field
                                        name="email"
                                        :label="$t('Your e-mail')"
                                        :hint="$t('You must provide your e-mail change request')"
                                        v-model="profile.email"
                                        :disabled="profile.active_change_email_requests.length !== 0"
                                        :error-messages="errors && errors.email ? $t(errors.email[0]) : []"
                                        :error="errors && !!errors.email"
                                ></v-text-field>
                                <div v-if="profile.active_change_email_requests">
                                    <div v-for="item in profile.active_change_email_requests" class="mb-3">
                                        <v-icon class="active-change-email">mdi-subdirectory-arrow-right</v-icon>
                                        <span class="subheading">
                                            {{ item.created_at | moment('calendar') }} {{ $t('was request for change') }} {{ item.new }}
                                        </span>
                                        <span>
                                            <v-btn flat
                                                   class="red--text darken-1"
                                                   :loading="localPending.newEmail"
                                                   :disabled="localPending.newEmail"
                                                   @click="submitCancelChangeNewEmail({new_email: item.new})"
                                            >
                                                {{ $t('cancel') }}
                                                <span slot="loader">{{ $t('Processing') }}...</span>
                                            </v-btn>
                                        </span>
                                    </div>
                                </div>
                            </v-flex>
                        </v-layout>

                        <v-layout row>
                            <v-flex xs4>
                                <v-subheader>{{ $t('Contacts') }}</v-subheader>
                            </v-flex>
                            <v-flex xs12 sm5>
                                <v-text-field
                                        name="skype"
                                        :label="$t('Skype')"
                                        :hint="$t('Enter your skype for fast contact with you')"
                                        v-model="profile.skype"
                                        :error-messages="errors && errors.skype ? $t(errors.skype[0]) : []"
                                        :error="errors && !!errors.skype"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm5>
                                <v-text-field
                                        name="phone"
                                        :label="$t('Phone number')"
                                        disabled
                                        :hint="$t('Enter your phone number without country code')"
                                        v-model="profile.phone"
                                ></v-text-field>
                            </v-flex>
                        </v-layout>

                        <v-layout row class="mt-4">
                            <v-flex xs4>
                                <v-subheader>{{ $t('Change password') }}</v-subheader>
                            </v-flex>
                            <v-flex xs12 sm5>
                                <v-text-field
                                        name="new_password"
                                        :label="$t('New password')"
                                        :hint="$t('Enter new password')"
                                        v-model="profile.new_password"
                                        :append-icon="e1 ? 'visibility_off' : 'visibility'"
                                        :append-icon-cb="() => (e1 = !e1)"
                                        :type="e1 ? 'password' : 'text'"
                                        :error-messages="errors && errors.new_password ? $t(errors.new_password[0]) : []"
                                        :error="errors && !!errors.new_password"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm5>
                                <v-text-field
                                        name="old_password"
                                        :label="$t('Current password')"
                                        :hint="$t('Current password for new set')"
                                        v-model="profile.old_password"
                                        :append-icon="e2 ? 'visibility_off' : 'visibility'"
                                        :append-icon-cb="() => (e2 = !e2)"
                                        :type="e2 ? 'password' : 'text'"
                                        :error-messages="errors && errors.old_password ? $t(errors.old_password[0]) : []"
                                        :error="errors && !!errors.old_password"
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                    </div>

                    <p class="mt-4 button-for-small-screens">
                        <v-btn color="info"
                               large
                               block
                               :loading="pending"
                               :disabled="pending"
                               @click="submitForm(profile)"
                               class="hidden-sm-and-up"
                        >
                            {{ $t('Save') }}
                            <span slot="loader">{{ $t('Processing') }}...</span>
                        </v-btn>
                    </p>
                    <p class="mt-4 button-for-big-screens">
                        <v-btn color="info"
                               large
                               :loading="pending"
                               :disabled="pending"
                               @click="submitForm(profile)"
                               class="hidden-xs-only"
                        >
                            {{ $t('Save') }}
                            <span slot="loader">{{ $t('Processing') }}...</span>
                        </v-btn>
                    </p>
                </v-container>
            </v-card-text>
        </v-card>

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
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        data () {
            return {
                loader: null,
                submitSuccess: false,
                e1: true,
                e2: true,
                errors: [],
                dialog: false
            }
        },
        computed: {
            ...mapGetters('User', [
                'profile', 'pending', 'localPending', 'isLogin'
            ])
        },
        methods: {
            submitForm: function (formData) {
                this.$store.dispatch('User/updateProfile', formData).then(response => {
                        this.errors = [];
                    }).catch(errors => {
                        this.errors = errors;

                        if (this.errors && this.errors.system) {
                            this.dialog = true;
                        }
                    })
            },
            submitCancelChangeNewEmail: function(formData) {
                this.$store.dispatch('User/cancelEmailChange', formData).then(response => {
                        this.errors = [];
                    }).catch(errors => {
                        this.errors = errors;

                        if (this.errors && this.errors.system) {
                            this.dialog = true;
                        }
                    })
            }
        }
    }
</script>

<style lang="scss">
    .profile-settings {
        i.active-change-email {
            margin-top: -8px
        }

        p.button-for-big-screens {
            text-align: right;
        }
    }
</style>