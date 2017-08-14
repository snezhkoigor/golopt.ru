<template>
    <div class="profile-settings">
        <v-card class="grey lighten-4 elevation-0">
            <v-card-text>
                <v-container fluid>
                    <v-layout row>
                        <v-flex xs4>
                            <v-subheader>ФИО</v-subheader>
                        </v-flex>
                        <v-flex xs12 sm5>
                            <v-text-field
                                    name="first_name"
                                    label="Имя"
                                    hint="Вводите свое реальное имя, пожалуйста"
                                    v-model="profile.first_name"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm5>
                            <v-text-field
                                    name="last_name"
                                    label="Фамилия"
                                    hint="Вводите свою реальную фамилию, пожалуйста"
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
                                    label="Ваш e-mail"
                                    hint="После изменения вам необходимо будет подтвердить свое действие, перейдя по ссылке из письма"
                                    v-model="profile.email"
                                    :disabled="profile.active_change_email_requests.length !== 0"
                                    :error-messages="errors && errors.email ? errors.email : []"
                                    :error="errors && !!errors.email"
                            ></v-text-field>
                            <div v-if="profile.active_change_email_requests">
                                <div v-for="item in profile.active_change_email_requests" class="mb-3">
                                    <v-icon class="active-change-email">mdi-subdirectory-arrow-right</v-icon>
                                    <span class="subheading">
                                        {{ item.created_at | moment('calendar') }} был запрос на изменение {{ item.new }}
                                    </span>
                                    <span>
                                        <v-btn flat
                                               class="red--text darken-1"
                                               :loading="localPending.newEmail"
                                               :disabled="localPending.newEmail"
                                               @click="submitCancelChangeNewEmail({new_email: item.new})"
                                        >
                                            отменить
                                            <span slot="loader">Обработка...</span>
                                        </v-btn>
                                    </span>
                                </div>
                            </div>
                        </v-flex>
                    </v-layout>

                    <v-layout row class="mt-4">
                        <v-flex xs4>
                            <v-subheader>Изменить пароль</v-subheader>
                        </v-flex>
                        <v-flex xs12 sm5>
                            <v-text-field
                                    name="new_password"
                                    label="Новый пароль"
                                    hint="Введите желаемый новый пароль"
                                    v-model="profile.new_password"
                                    :append-icon="e1 ? 'visibility_off' : 'visibility'"
                                    :append-icon-cb="() => (e1 = !e1)"
                                    :type="e1 ? 'password' : 'text'"
                                    :error-messages="errors && errors.new_password ? errors.new_password : []"
                                    :error="errors && !!errors.new_password"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm5>
                            <v-text-field
                                    name="old_password"
                                    label="Текущий пароль"
                                    hint="Для изменения пароля, вам необходимо знать текущий. В противном случае, воспользуйтесь формой восстановления пароля."
                                    v-model="profile.old_password"
                                    :append-icon="e2 ? 'visibility_off' : 'visibility'"
                                    :append-icon-cb="() => (e2 = !e2)"
                                    :type="e2 ? 'password' : 'text'"
                                    :error-messages="errors && errors.old_password ? errors.old_password : []"
                                    :error="errors && !!errors.old_password"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>

                    <p class="mt-4 button-for-small-screens">
                        <v-btn info
                               large
                               block
                               :loading="pending"
                               :disabled="pending"
                               @click="submitForm(profile)"
                               class="hidden-sm-and-up"
                        >
                            Сохранить
                            <span slot="loader">Обработка...</span>
                        </v-btn>
                    </p>
                    <p class="mt-4 button-for-big-screens">
                        <v-btn info
                               large
                               :loading="pending"
                               :disabled="pending"
                               @click="submitForm(profile)"
                               class="hidden-xs-only"
                        >
                            Сохранить
                            <span slot="loader">Обработка...</span>
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
                <v-card-text>
                    {{ errors.system }}
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="red--text darken-1" flat="flat" @click.native="dialog = false">Закрыть</v-btn>
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
                'profile', 'pending', 'localPending'
            ])
        },
        methods: {
            submitForm: function (formData) {
                this.$store.dispatch('User/updateProfile', formData)
                    .then(response => {

                    })
                    .catch(errors => {
                        this.errors = errors

                        if (this.errors && this.errors.system) {
                            this.dialog = true
                        }
                    })
            },
            submitCancelChangeNewEmail: function(formData) {
                console.log(formData)
                this.$store.dispatch('User/cancelEmailChange', formData)
                    .then(response => {

                    })
                    .catch(errors => {
                        this.errors = errors

                        if (this.errors && this.errors.system) {
                            this.dialog = true
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