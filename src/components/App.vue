<template>
    <v-app>
        <v-navigation-drawer
                temporary
                v-model="sideNav"
        >
            <v-list>
                <v-list-tile
                        v-for="item in $router.options.routes"
                        :key="item.name"
                        v-if="item.meta.available && ((isLogin && item.meta.access.auth === true) || (!isLogin && item.meta.access.guest === true))"
                        :to="item.path"
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
            <v-toolbar-side-icon
                    @click.stop="sideNav = !sideNav"
                    class="hidden-sm-and-up "></v-toolbar-side-icon>
            <v-toolbar-title>
                <router-link :to="{name: 'home'}" v-if="$route.name !== 'home'" tag="span" style="cursor: pointer">
                    <v-icon left dark>mdi-home</v-icon>
                </router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-xs-only">
                <v-btn
                        flat
                        v-for="item in $router.options.routes"
                        :key="item.name"
                        v-if="item.meta.available && ((isLogin && item.meta.access.auth === true) || (!isLogin && item.meta.access.guest === true))"
                        :to="item.path">
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
            <router-view></router-view>
        </main>
    </v-app>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        data () {
            return {
                sideNav: false
            }
        },
        computed: {
            ...mapGetters('User', [
                'isLogin'
            ])
        },
        methods: {
            ...mapActions('User', [
                'logout', 'is'
            ])
        }
    }
</script>

<style lang="scss">

</style>
