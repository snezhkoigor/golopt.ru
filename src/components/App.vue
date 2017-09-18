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