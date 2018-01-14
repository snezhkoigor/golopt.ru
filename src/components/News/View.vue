<template>
	<v-layout row>
		<v-flex xs12 v-if="!pending">
			<v-card class="grey lighten-4 elevation-0">
				<v-card-text>
					<v-list two-line v-if="this.news.length">
						<template v-for="item in this.news">
							<v-list-tile @click="goToShowNews(item.id)">
								<v-list-tile-content>
									<v-list-tile-sub-title>{{item.date | moment('Do MMM YYYY') }}</v-list-tile-sub-title>
									<v-list-tile-title v-html="item.title"></v-list-tile-title>
								</v-list-tile-content>
							</v-list-tile>
						</template>
					</v-list>
					<v-list two-line v-else>
						<v-list-tile>
							<v-list-tile-content>
								<v-list-tile-title>{{$t('No news')}}</v-list-tile-title>
							</v-list-tile-content>
						</v-list-tile>
					</v-list>
				</v-card-text>
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
            this.view();
		},
        computed: {
            ...mapGetters('News', [
                'news', 'pending'
			])
        },
        methods: {
            ...mapActions('News', [
                'view'
            ]),
            goToShowNews(newsId) {
                this.$router.push({
                    name: 'newsShow',
                    params: { newsId: newsId }
                });
			}
        }
    }
</script>