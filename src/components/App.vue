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
        components: {
            HeaderComponent,
            LoaderComponent
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
            ...mapGetters('Dictionary', [
                'dictionary'
            ])
        }
    }
</script>