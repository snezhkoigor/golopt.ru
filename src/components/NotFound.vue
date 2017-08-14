<template>
    <v-container fluid>
        <body>
        <h1>Not Found</h1>
        <p>The requested URL {{ $route.params[0] }} was not found on this server.</p>
        <p>Additionally, a 404 Not Found
            error was encountered while trying to use an ErrorDocument to handle the request.</p>

        </body>
    </v-container>

</template>

<script>
    export default {
        mounted() {
            console.log(this.$route.params)
        },
    }
</script>

<style lang="scss"></style>