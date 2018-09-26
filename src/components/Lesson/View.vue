<template>
	<v-layout row>
		<v-flex xs12 v-if="!pending">
			<v-card class="grey lighten-4 elevation-0">
				<v-card-text>
					<v-list two-line v-if="this.lessons.length">
						<template v-for="item in this.lessons">
							<v-list-tile @click="goToShowLesson(item.id)">
								<v-list-tile-content>
									<v-list-tile-title v-html="item.title"></v-list-tile-title>
								</v-list-tile-content>
							</v-list-tile>
						</template>
					</v-list>
					<v-list two-line v-else>
						<v-list-tile>
							<v-list-tile-content>
								<v-list-tile-title>{{$t('No lessons')}}</v-list-tile-title>
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
            ...mapGetters('Lesson', [
                'lessons', 'pending'
			])
        },
        methods: {
            ...mapActions('Lesson', [
                'view'
            ]),
            goToShowLesson(lessonId) {
                this.$router.push({
                    name: 'lessonShow',
                    params: { lessonId: lessonId }
                });
			}
        }
    }
</script>
