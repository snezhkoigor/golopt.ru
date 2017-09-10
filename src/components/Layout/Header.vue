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
                        :to="{ name: item.name, params: { lang: urlPrefix } }"
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
    import { events } from 'vue-i18n-manager'
    import { mapGetters, mapActions } from 'vuex'

    export default {
        data () {
            return {
                sideNav: false,
                selectedLanguage: null
            }
        },
        mounted() {
            this.$store.dispatch('Dictionary/list').then(() => {
                const code = 'ru-Ru';
                const trans = this.dictionary.locales;

                this.$store.dispatch(events.ADD_TRANSLATION, { trans, code })
                this.selectedLanguage = this.currentLanguage;
            });
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
            }
        },
        watch: {
            selectedLanguage: function(language) {
                if (language.urlPrefix !== this.currentLanguage.urlPrefix) {
                    this.$store.dispatch(events.SET_LANGUAGE, language.code).then(() => {
                        this.$router.push({
                            name: this.$router.currentRoute.name
                        });
                    });
                }
            }
        }
    }
</script>