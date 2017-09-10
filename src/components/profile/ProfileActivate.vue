<template>
    <v-container fluid>
        <div v-if="pending">
            <div id="page-loader">
                <div class="material-loader">
                    <svg class="circular" viewBox="25 25 50 50">
                        <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"></circle>
                    </svg>
                    <div class="message">{{ $t('Activation') }}...</div>
                </div>
            </div>
        </div>
        <div v-if="success">
            <p class="display-1 ma-5 text-xs-center">
                <v-icon class="green--text display-4">mdi-emoticon-happy</v-icon>
            </p>
            <p class="display-1 ma-5 text-xs-center">
                {{ $t('Your account verifyed') }}<br/>
                <router-link :to="{ path: '/login' }">{{ $t('Get auth') }}</router-link> {{ $t('with data from registration form') }}
            </p>
        </div>
        <div v-if="fail">
            <p class="display-1 ma-5 text-xs-center">
                <v-icon class="red--text display-4">mdi-emoticon-sad</v-icon>
            </p>
            <p class="display-1 ma-5 text-xs-center" v-if="errors.system">
                {{ $t(errors.system) }}
            </p>
        </div>
    </v-container>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        data () {
            return {
                errors: [],
                success: false,
                fail: false
            }
        },
        mounted() {
            this.$store.dispatch('User/activation', this.$route.params.token).then(() => {
                this.success = true;
                this.fail = false;
            }).catch(errors => {
                this.success = false;
                this.fail = true;
                this.errors = errors;
            })
        },
        computed: {
            ...mapGetters('User', [
                'pending'
            ])
        },
        method: {
            ...mapGetters('User', [
                'activation'
            ])
        }
    }
</script>

<style lang="scss"></style>