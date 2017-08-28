<template>
    <v-container fluid>
        <p class="display-1 ma-5 text-xs-center">
            <v-icon class="green--text display-4">mdi-emoticon-happy</v-icon>
        </p>
        <p class="display-1 ma-5 text-xs-center">
            Спасибо. Ваш платеж будет обработан в ближайшее время. <br/>
            Вы получите соответствующее уведомление. {{ translation }}
        </p>
    </v-container>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        computed: {
            ...mapGetters([
                'currentLanguage', 'translation'
            ])
        }
    }
</script>

<style lang="scss"></style>