<template>
	<v-layout row>
		<v-flex xs12 v-if="!pending">
			<v-btn class="green--text darken-1" flat="flat" @click="goToViewLessons()">{{ $t('Back') }}</v-btn>
			<v-card class="grey lighten-4 elevation-0" v-if="this.lesson.text.length">
				<v-card-text>
					<div v-html="this.lesson.text"></div>
				</v-card-text>	
			</v-card>
			<div id="vk_comments"></div>
		</v-flex>
	</v-layout>
</template>

<script>
	// VK.Widgets.Comments("vk_comments", {limit: 20, attach: "*"});

    import { mapGetters, mapActions } from 'vuex';

    export default {
        data() {
            return {}
        },
        mounted() {
            this.show(parseInt(this.$route.params.lessonId));
        },
        computed: {
            ...mapGetters('Lesson', [
                'lesson', 'pending'
            ])
        },
        methods: {
            ...mapActions('Lesson', [
                'show'
            ]),
            goToViewLessons() {
                this.$router.push({
                    name: 'lessonView'
                });
			}
        }
    }
</script>
