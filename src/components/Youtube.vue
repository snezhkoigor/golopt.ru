<template>
    <v-container grid-list-md text-xs-center>
        <div v-if="pending">
            <loader-component/>
        </div>

        <v-layout row wrap v-if="!pending" >
            <v-flex xs4 v-for="video in videos" :key="video.id.videoId">
                <v-card>
                    <v-card-text class="px-0">
                        <youtube :video-id="video.id.videoId"></youtube>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import LoaderComponent from '@/components/Layout/Loader.vue';

    export default {
        components: {
            LoaderComponent
        },
        beforeMount() {
            this.$store.dispatch('Youtube/list');
        },
        mounted() {},
        data () {
            return {

            }
        },
        computed: {
            ...mapGetters('Youtube', [
                'pending', 'videos'
            ])
        },
    }
</script>