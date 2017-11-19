<template>
    <v-footer dark
              fixed
              color="primary"
    >
        <div class="white--text footer-year">© {{ date | moment('YYYY') }}</div>
        <div class="white--text footer-menu">
            <span>
                <v-menu
                        origin="center center"
                        transition="scale-transition"
                        bottom
                        class="text-xs-right"
                >
                    <v-btn flat dark slot="activator">
                        {{ $t('See us in') }}
                    </v-btn>
                    <v-list>
                        <v-list-tile
                                v-for="item in social" :key="item.key"
                                @click="goTo(item.link)"
                        >
                            <v-list-tile-title>
                                <v-icon left>{{item.ico}}</v-icon>  {{ $t(item.text) }}
                            </v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>
            </span>
        </div>
    </v-footer>
</template>

<script>
    export default {
        data () {
            return {
                date: '',
                social: [
                    {
                        'key': 'youtube',
                        'text': 'Youtube',
                        'link': 'https://www.youtube.com/channel/UCaCmSeb1GwQ9OHTXkpXAJVg',
                        'ico': 'mdi-youtube-play'
                    },
                    {
                        'key': 'vk',
                        'text': 'Vk',
                        'link': 'https://vk.com/svobodnyi_trading',
                        'ico': 'mdi-vk-box'
                    },
                    {
                        'key': 'facebook',
                        'text': 'Facebook',
                        'link': 'https://www.facebook.com/groups/svobodnyitraiding',
                        'ico': 'mdi-facebook-box'
                    },
                    {
                        'key': 'ok',
                        'text': 'Ok',
                        'link': 'https://ok.ru/svobodnytr',
                        'ico': 'mdi-odnoklassniki'
                    }
                ]
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