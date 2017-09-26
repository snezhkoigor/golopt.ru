<template>
    <v-container fluid>
        <v-navigation-drawer
            temporary
            v-model="sideNav"
        >
            <v-list>
                <v-list-tile
                        v-for="item in $router.options.routes"
                        :key="item.name"
                        v-if="item.meta.available && ((isLogin && item.meta.access.auth === true) || (!isLogin && item.meta.access.guest === true))"
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
                class="primary"
        >
            <v-toolbar-title>
                <v-btn
                        icon
                        @click.stop="sideNav=!sideNav"
                        class="hidden-sm-and-up"
                >
                    <v-icon>mdi-format-list-bulleted</v-icon>
                </v-btn>
                <v-btn icon
                       @click.stop="goHome"
                       v-if="$route.name !== 'home'"
                >
                    <v-icon>mdi-home</v-icon>
                </v-btn>
            </v-toolbar-title>
            <v-spacer />
            <v-toolbar-items class="hidden-xs-only">
                <v-btn
                        flat
                        v-for="item in $router.options.routes"
                        :key="item.name"
                        v-if="item.meta.available && ((isLogin && item.meta.access.auth === true) || (!isLogin && item.meta.access.guest === true))"
                        @click.native="goByMenu((!item.meta.externalUrl ? item.name : item.meta.externalUrl), urlPrefix, !!item.meta.externalUrl)"
                >
                    <v-icon left dark>{{ item.meta.icon }}</v-icon>
                    {{ $t(item.meta.name) }}
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
                    class="ml-2"
                    style="margin-top: 20px; max-width: 100px"
            ></v-select>
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
                sideNav: false,
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

                    this.$store.dispatch(events.SET_LANGUAGE, language.code).then(() => {
                        this.$router.push({
                            name: this.$router.currentRoute.name
                        });
                    })
                }
            }
        }
    }
</script>