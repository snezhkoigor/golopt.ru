<template>
    <v-container fluid>
        <v-navigation-drawer
                persistent
                v-model="drawer"
                enable-resize-watcher
                app
                overflow
                class="hidden-lg-and-up"
        >
            <v-list>
                <v-list-tile
                        v-for="item in $router.options.routes"
                        :key="item.name"
                        v-if="drawer && item.meta.available && ((isLogin && item.meta.access.auth === true) || (!isLogin && item.meta.access.guest === true))"
                        :to="{ name: item.name, params: { lang: urlPrefix } }"
                >
                    <v-list-tile-action>
                        <v-icon>{{ item.meta.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        {{ $t(item.meta.name) }}
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar
                dark
                fixed
                color="primary"
        >
            <img src="../../assets/images/logo.png" width="44"/>
            <v-toolbar-title>
                <v-toolbar-side-icon class="hidden-lg-and-up" @click.stop="drawer=!drawer"></v-toolbar-side-icon>
                <v-btn icon
                       @click.stop="goHome"
                       v-if="$route.name !== 'home'"
                >
                    <v-icon>mdi-home</v-icon>
                </v-btn>
            </v-toolbar-title>
            <v-btn flat
                class="hidden-md-and-down"
                style="height: 100%"
                @click.native="goByMenu('theory')"
            >
                {{ $t('Theory') }}
            </v-btn>
            <v-btn flat
                class="hidden-md-and-down"
                style="height: 100%"
                @click.native="goByMenu('odrplus')"
            >
                {{ $t('Odrplus') }}
            </v-btn>
            <v-btn flat
                    class="hidden-md-and-down"
                    style="height: 100%"
                    @click.native="goByMenu('newsView')"
            >
                {{ $t('News') }}
            </v-btn>
            <v-btn flat
                class="hidden-md-and-down"
                style="height: 100%"
                @click.native="goByMenu('feedback')"
            >
                {{ $t('Feedback') }}
            </v-btn>
            <v-btn flat
                    class="hidden-md-and-down"
                    style="height: 100%"
                    @click="!isLogin ? goToRegistration() : goToProfile()"
            >
                {{ $t('Download menu') }}
            </v-btn>
            <v-spacer />
            <v-toolbar-items class="hidden-md-and-down">
                <v-btn flat
                        style="height: 100%"
                        v-if="!isLogin"
                        @click.native="goByMenu('registration')"
                >
                    {{ $t('Registration') }}
                </v-btn>
                <v-btn flat
                        style="height: 100%"
                        v-if="!isLogin"
                        @click.native="goByMenu('login')"
                >
                    {{ $t('Login') }}
                </v-btn>
                <v-btn flat
                        style="height: 100%"
                        v-if="isLogin"
                        @click.native="goByMenu('profile')"
                >
                    {{ $t('Profile') }}
                </v-btn>
            </v-toolbar-items>
            <v-select
                    dark
                    v-bind:items="availableLanguages"
                    v-model="selectedLanguage"
                    item-text="name"
                    item-value="code"
                    return-object
                    persistent-hint
                    single-line
                    ref="select_language"
                    class="ml-2"
                    style="max-width: 70px; margin-top: 25px"
            >
                <template slot="selection" slot-scope="data">
                    <v-list-tile-content
                            style="color: white"
                            dark
                    >
                        <img v-if="data.item.code === 'ru-Ru'" src="../../assets/images/ru.png"/>
                        <img v-if="data.item.code === 'en-US'" src="../../assets/images/us.png"/>
                    </v-list-tile-content>
                </template>
                <template slot="item" slot-scope="data">
                    <template>
                        <v-list-tile-content>
                            <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                        </v-list-tile-content>
                    </template>
                </template>
            </v-select>
        </v-toolbar>
    </v-container>
</template>

<script>
    import { events } from 'vue-i18n-manager';
    import { mapGetters, mapActions } from 'vuex';
    import moment from '../../../node_modules/moment/min/moment-with-locales.min';

    export default {
        data () {
            return {
                drawer: false,
                selectedLanguage: null
            }
        },
        mounted() {
            this.selectedLanguage = this.currentLanguage;
            moment.locale(this.currentLanguage.urlPrefix);
        },
        computed: {
            ...mapGetters([
                'urlPrefix', 'availableLanguages', 'currentLanguage'
            ]),
            ...mapGetters('User', [
                'isLogin'
            ]),
            ...mapGetters('Dictionary', [
                'dictionary'
            ])
        },
        methods: {
            ...mapActions('User', [
                'logout', 'is'
            ]),
            ...mapActions('Dictionary', [
                'list'
            ]),
            goToRegistration() {
                this.$router.push({
                    'name': 'registration'
                });
            },
            goToProfile() {
                this.$router.push({
                    'name': 'profile'
                });
            },
            goHome: function() {
                this.$router.push({
                    name: 'home'
                })
            },
            goByMenu: function(url, urlPrefix, isExternal) {
                if (isExternal) {
                    window.open(url, '_blank');
                } else {
                    this.$router.push({
                        name: url,
                        params: { lang: urlPrefix }
                    });
                }
            }
        },
        watch: {
            selectedLanguage: function(language) {
                if (language.urlPrefix !== this.currentLanguage.urlPrefix) {
                    moment.locale(language.urlPrefix);

                    this.$store.dispatch(events.SET_FORCE_TRANSLATION, true);

                    this.$store.dispatch(events.SET_LANGUAGE, language.code).then(() => {
                        this.$router.push({
                            name: this.$router.currentRoute.name
                        });
                    });
                }

                this.$refs.select_language.blur();
            }
        }
    }
</script>