<template>
    <div>
        <v-parallax id="parallax" src="../src/assets/images/404_bg.jpg" height="300"></v-parallax>
        <v-card light class="notFound hidden-sm-and-down">
            <v-card-text class="text-xs-center">
                <h1>{{ $t('Not found') }}</h1>
                <p>
                    {{ $t('Try to start from') }} <router-link to="/">{{ $t('home page in 404') }}</router-link>
                </p>
            </v-card-text>
        </v-card>
        <div class="mt-3 text-xs-center hidden-sm-and-up">
            <h1>{{ $t('Not found') }}</h1>
            <p>
                {{ $t('Try to start from') }} <router-link to="/">{{ $t('home page in 404') }}</router-link>
            </p>
        </div>
    </div>
</template>

<script></script>

<style lang="scss">
    .notFound {
        position: absolute;
        top: 25%;
        left: 50%;
        margin-left: -250px;
        width: 500px;
    }
</style>