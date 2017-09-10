<template>
    <v-app class="subheading">
        <div v-if="dictionary.length !== 0">
            <header-component v-if="$route.name !== 'notFound'" class="mb-5"/>
            <main>
                <router-view />
            </main>
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
    import momentLocaleRu from '../../node_modules/moment/locale/ru';
    import momentLocaleEn from '../../node_modules/moment/locale/en-gb';

    export default {
        data () {
            return {
                title: '',
                description: ''
            }
        },
        components: {
            HeaderComponent,
            LoaderComponent
        },
        mounted() {
            this.$store.dispatch('Dictionary/list').then(() => {
//                const code = 'ru-Ru';
//                const trans = this.dictionary.locales;
//
//                this.$store.dispatch(events.ADD_TRANSLATION, { trans, code })

                this.$moment.locale('ru').format("LLL");
console.log(this.$moment);
                this.title = this.$t(this.$route.meta.title);
                this.description = this.$t(this.$route.meta.description);
                this.selectedLanguage = this.currentLanguage;
            });
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
                    {charset: 'utf-8'},
                    { name: 'description', content: this.description }
                ]
            }
        },
    }
</script>