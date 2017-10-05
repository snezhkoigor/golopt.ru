<template>
    <v-app class="subheading" id="toTop" v-scroll="onScroll">
        <div v-if="dictionary.length !== 0">
            <header-component v-if="$route.name !== 'notFound'" class="mb-5"/>

            <main class="content">
                <router-view />
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
                title: '',
                description: '',
                offsetTop: 0,

                direction: "top",
                fab: false,
                fling: false,
                hover: false,
                tabs: null,
                top: false,
                right: true,
                bottom: true,
                left: false,
                transition: 'slide-y-reverse-transition'
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

                this.title = this.$router.currentRoute.meta.title ? this.$t(this.$router.currentRoute.meta.title) : this.$router.currentRoute.name;
                this.description = this.$router.currentRoute.meta.description ? this.$t(this.$router.currentRoute.meta.description) : this.$router.currentRoute.name;
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
            ])
        },
        watch: {
            '$route' (toRoute) {
                this.title = toRoute.meta.title ? this.$t(toRoute.meta.title) : toRoute.name;
                this.description = toRoute.meta.description ? this.$t(toRoute.meta.description) : toRoute.name;
            }
        },
        metaInfo () {
            return {
                title: this.title,
                meta: [
                    { name: 'description', content: this.description }
                ]
            }
        },
    }
</script>