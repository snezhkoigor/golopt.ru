<template>
	<v-layout row>
		<v-flex xs12 v-if="!pending">
			<v-btn class="green--text darken-1" flat="flat" @click="goToViewNews()">{{ $t('Back') }}</v-btn>
			<v-card class="grey lighten-4 elevation-0" v-if="this.newsItem.text.length">
				<v-card-text v-html="this.newsItem.text" />
			</v-card>
		</v-flex>
	</v-layout>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        data() {
            return {}
        },
        mounted() {
            this.show(parseInt(this.$route.params.newsId));
        },
        computed: {
            ...mapGetters('News', [
                'newsItem', 'pending'
            ])
        },
        methods: {
            ...mapActions('News', [
                'show'
            ]),
            goToViewNews() {
                this.$router.push({
                    name: 'newsView'
                });
			}
        }
    }
</script>