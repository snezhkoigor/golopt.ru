<template>
    <v-container fluid>
        <v-layout row wrap class="mb-10 odr-advantages">
            <v-flex xs12>
                <v-card light class="elevation-0">
                    <v-card-text>
                        <div>
                            <p class="ma-3 headline text-xs-center content-title">
                                ODR Plus.
                            </p>
                            <p v-html="$t('ODR Plus text')"></p>
                        </div>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout row wrap class="mb-10 odr-advantages">
            <v-flex xs12>
                <v-card light class="elevation-0">
                    <v-card-text>
                        <div>
                            <p class="ma-3 headline text-xs-center content-title">
                                {{ $t('A bit of history') }}
                            </p>
                            <p v-html="$t('ODR Plus history text')"></p>
                        </div>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>