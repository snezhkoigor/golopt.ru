<template>
    <v-footer dark
              fixed
              class="primary"
    >
        <div class="white--text footer-year">© {{ date | moment('YYYY') }}</div>
        <div class="white--text footer-menu">
            <span>
                <v-btn  flat
                        dark
                        @click="goTo('https://www.youtube.com/channel/UCaCmSeb1GwQ9OHTXkpXAJVg')"
                >
                    <v-icon left dark>mdi-youtube-play</v-icon>
                    Youtube1
                </v-btn>
            </span>
        </div>
    </v-footer>
</template>

<script>
    export default {
        data () {
            return {
                date: '',
            }
        },
        mounted() {
            this.date = new Date();
        },
        methods: {
            goTo: function(url) {
                window.open(url, '_blank');
            }
        }
    }
</script>