<template>
    <v-app class="subheading"
           id="toTop"
           v-scroll="onScroll"
           toolbar
           footer
    >
        <div v-if="dictionary.length !== 0">
            <header-component v-if="$route.name !== 'notFound'" class="mb-5"/>

            <main class="content">
                <v-container fluid fill-height>
                    <router-view />
                </v-container>
            </main>

            <v-btn
                    raised
                    fixed
                    floating
                    dark
                    fab
                    bottom
                    right
                    class="blue lighten-2 mb-5 goTop"
                    :to="'#toTop'"
                    v-smooth-scroll="{ duration: 1000, offset: -50 }"
            >
                <v-icon>mdi-chevron-up</v-icon>
            </v-btn>

            <footer-component />
        </div>
        <div v-if="dictionary.length === 0">
            <loader-component />
        </div>
    </v-app>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import HeaderComponent from '@/components/Layout/Header.vue';
    import LoaderComponent from '@/components/Layout/Loader.vue';
    import FooterComponent from '@/components/Layout/Footer.vue';
    import { events } from 'vue-i18n-manager';
    import $ from 'jquery';

    export default {
        data () {
            return {
                offsetTop: 0
            }
        },
        components: {
            HeaderComponent,
            LoaderComponent,
            FooterComponent
        },
        beforeMount() {
            this.$store.dispatch('Dictionary/list').then(() => {
                const code = 'ru-Ru';
                const trans = this.dictionary.locales;

                this.$store.dispatch(events.ADD_TRANSLATION, { trans, code });
            });
        },
        mounted() {

        },
        methods: {
            onScroll (e) {
                this.offsetTop = window.pageYOffset || document.documentElement.scrollTop;

                if (this.offsetTop >= 300) {
                    this.offsetTop = 300;
                    $('.goTop').fadeIn();
                } else {
                    $('.goTop').fadeOut();
                }
            }
        },
        computed: {
            ...mapGetters('Dictionary', [
                'dictionary'
            ]),
            ...mapGetters('Meta', [
                'title', 'description'
            ]),
            ...mapGetters([
                'urlPrefix', 'availableLanguages', 'currentLanguage'
            ]),
        },
        watch: {
            '$route' (toRoute) {
                this.$store.dispatch('Meta/setTitle', toRoute.meta.title ? this.$t(toRoute.meta.title) : toRoute.name);
                this.$store.dispatch('Meta/setDescription', toRoute.meta.description ? this.$t(toRoute.meta.description) : toRoute.name);
            }
        },
        metaInfo () {
            return {
                title: this.title,
                meta: [
                    { name: 'description', content: this.description },
                    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
                ]
            }
        },
    }
</script>