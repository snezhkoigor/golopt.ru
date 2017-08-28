<template>
    <v-app>
        <div v-if="dictionary.length !== 0">
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
                            {{ item.meta.title }}
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
                    <v-btn icon
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
                        {{ item.meta.title }}
                    </v-btn>
                    <!--<v-btn-->
                            <!--flat-->
                            <!--v-if="is('administrator') && isLogin"-->
                            <!--to="/product"-->
                    <!--&gt;-->
                        <!--<v-icon left dark>mdi-apps</v-icon>-->
                        <!--Продукты-->
                    <!--</v-btn>-->
                </v-toolbar-items>
            </v-toolbar>
            <main>
                <router-view />
            </main>
        </div>
        <div v-if="dictionary.length === 0">
            <div id="page-loader">
                <div class="material-loader">
                    <svg class="circular" viewBox="25 25 50 50">
                        <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"></circle>
                    </svg>
                    <div class="message">Загрузка сайта...</div>
                </div>
            </div>
        </div>
    </v-app>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        data () {
            return {
                sideNav: false,
            }
        },
        mounted() {
            this.$store.dispatch('Dictionary/list').then(response => {
                const code = 'ru-Ru'
                const trans = this.dictionary.locales

                console.log(trans)

                this.$store.dispatch(ADD_TRANSLATION, { trans, code })
            })
        },
        computed: {
            ...mapGetters([
                'urlPrefix'
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
        }
    }
</script>

<style lang="scss">

</style>
