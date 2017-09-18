<template>
    <v-container fluid class="pa-0">
        <v-parallax src="./src/assets/images/cme.jpg" style="margin-top: -40px;">
            <v-layout row>
                <v-flex xs6 order-xs2>
                    <v-card light class="light right">
                        <v-card-text>
                            <div class="headline ma-3 gray--text">{{ $t('Option analysis with Option Profit indicator in the Forex market - the path to stable profit') }}</div>
                            <div
                                    class="subheading ma-3 gray--text hidden-xs-only"
                            >
                                <ul>
                                    <li>
                                        {{ $t('Actual data from CME') }}
                                    </li>
                                    <li>
                                        {{ $t('Streaming data to the MetaTrader 4 terminal') }}
                                    </li>
                                    <li>
                                        {{ $t('Actual data 24 hours a day') }}
                                    </li>
                                    <li>
                                        {{ $t('Free testing within two trading weeks') }}
                                    </li>
                                </ul>
                            </div>
                            <v-btn
                                    info
                                    large
                                    block
                                    secondary
                                    :to="'#pricing'"
                                    v-smooth-scroll="{ duration: 1000, offset: -50 }"
                                    :disabled="!products"
                            >
                                {{ $t('Test for free') }}
                            </v-btn>
                        </v-card-text>
                    </v-card>
                </v-flex>
                <v-flex xs6 order-xs1>
                    <v-card></v-card>
                </v-flex>
            </v-layout>
        </v-parallax>
        <v-layout row wrap class="mb-10 home-product-advantages">
            <v-flex xs12>
                <v-card light class="elevation-0">
                    <v-card-text>
                        <div>
                            <p class="ma-3 headline text-xs-center content-title">
                                {{ $t('Home revolution title') }}
                            </p>
                            <p v-html="$t('Home revolution text')"></p>
                        </div>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout row wrap class="mb-10 home-product-advantages">
            <v-flex xs12>
                <v-card light class="elevation-0">
                    <v-card-text>
                        <div>
                            <p class="ma-3 headline text-xs-center content-title">
                                {{ $t('What you will get in the Basic version') }}
                            </p>
                        </div>
                        <v-layout row-sm column child-flex-sm class="mb-10" >
                                <v-card dark class="ma-2 what-you-will-get ">
                                    <v-card-title>
                                        <v-icon class="display-2 red--text darken-1">mdi-truck-fast</v-icon>
                                    </v-card-title>
                                    <v-card-text class="subheading">
                                        {{ $t('Actual data from CME') }}
                                    </v-card-text>
                                </v-card>
                                <v-card dark class="ma-2 what-you-will-get">
                                    <v-card-title>
                                        <v-icon class="display-2 red--text darken-1">mdi-cached</v-icon>
                                    </v-card-title>
                                    <v-card-text class="subheading">
                                        {{ $t('Streaming data to the MetaTrader 4 terminal') }}
                                    </v-card-text>
                                </v-card>
                                <v-card dark class="ma-2 what-you-will-get">
                                    <v-card-title>
                                        <v-icon class="display-2 red--text darken-1">mdi-alarm</v-icon>
                                    </v-card-title>
                                    <v-card-text class="subheading">
                                        {{ $t('Actual data 24 hours a day') }}
                                    </v-card-text>
                                </v-card>
                                <v-card dark class="ma-2 what-you-will-get ">
                                    <v-card-title>
                                        <v-icon class="display-2 red--text darken-1">mdi-cart-off</v-icon>
                                    </v-card-title>
                                    <v-card-text class="subheading">
                                        {{ $t('Free testing within two trading weeks') }}
                                    </v-card-text>
                                </v-card>

                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout row wrap id="pricing" class="mb-10 home-product-advantages" v-if="products && activeTab">
            <v-flex xs12>
                <v-card light class="elevation-0">
                    <v-card-text>
                        <div>
                            <p class="ma-3 headline text-xs-center content-title">
                                {{ $t('Our products') }}
                            </p>
                        </div>
                        <v-layout row-sm column child-flex-sm>
                            <v-tabs light fixed centered v-model="activeTab">
                                <v-tabs-bar slot="activators" class="white lighten-4" light>
                                    <v-tabs-item
                                            v-for="(val, key) in products"
                                            :key="key"
                                            :href="'#' + key"
                                            ripple
                                    >
                                        {{ key }}
                                    </v-tabs-item>
                                    <v-tabs-slider class="blue"></v-tabs-slider>
                                </v-tabs-bar>

                                <v-tabs-content
                                        v-for="(val, key) in products"
                                        :key="key"
                                        :id="key"
                                        class="mt-3"
                                >
                                    <v-layout row-md column child-flex-md style="justify-content: center;">
                                        <v-card class="ma-2 grey darken-2 white--text" v-for="productItem in products[key]" style="max-width: 400px; display: inline-block; margin-right: -0.25em; align-items: center;">
                                            <v-card-title primary-title>
                                                <div class="headline mb-3" style="width: 100%">{{ productItem.name }}</div>
                                                <div class="display-1 mb-3">{{ productItem.price | currency}}/{{ $t(productItem.price_by) }}</div>
                                                <div class="home-product-description white elevation-3">
                                                    <v-list two-line>
                                                        <template v-for="(val, key) in productItem.functional">
                                                            <v-list-tile>
                                                                <v-list-tile-avatar>
                                                                    <v-icon v-if="val" class="green--text">mdi-check</v-icon>
                                                                    <v-icon v-if="!val" class="red--text">mdi-close</v-icon>
                                                                </v-list-tile-avatar>
                                                                <v-list-tile-content>
                                                                    {{ $t(key) }}
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                        </template>
                                                    </v-list>
                                                </div>
                                            </v-card-title>
                                            <v-card-actions>
                                                <v-menu
                                                        origin="center center"
                                                        transition="scale-transition"
                                                        bottom
                                                >
                                                    <v-btn flat dark slot="activator" v-if="!isLogin">
                                                        {{ $t('Buy') }}
                                                    </v-btn>
                                                    <v-btn flat dark slot="activator" v-else="isLogin">
                                                        <span v-if="!productItem.users[0]">{{ $t('Buy') }}</span>
                                                        <span v-if="!!productItem.users[0]">{{ $t('Renew subscription') }}</span>
                                                    </v-btn>
                                                    <v-list>
                                                        <v-list-tile
                                                                v-for="paymentSystemItem in dictionary.payment_systems" :key="paymentSystemItem.key"
                                                                v-if="paymentSystemItem.key !== dictionary.const.PAYMENT_SYSTEM_DEMO || (paymentSystemItem.key === dictionary.const.PAYMENT_SYSTEM_DEMO && productItem.has_demo === 1)"
                                                        >
                                                            <v-list-tile-title
                                                                    @click="paymentSystemSelected(paymentSystemItem, productItem)"
                                                            >
                                                                {{ $t(paymentSystemItem.text) }}
                                                            </v-list-tile-title>
                                                        </v-list-tile>
                                                    </v-list>
                                                </v-menu>
                                            </v-card-actions>
                                        </v-card>
                                    </v-layout>
                                </v-tabs-content>
                            </v-tabs>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>

        <v-dialog v-model="systemDialog" persistent>
            <v-card>
                <v-card-title class="headline">
                    <v-icon class="red--text darken-1">
                        mdi-comment-alert-outline
                    </v-icon>
                </v-card-title>
                <v-card-text v-if="errors.system">
                    {{ $t(errors.system) }}
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="red--text darken-1" flat="flat" @click="systemDialog = false">{{ $t('Close') }}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" :overlay=false persistent>
            <v-card>
                <v-toolbar dark class="primary">
                    <v-btn icon @click.native="dialog = false" dark>
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title v-if="psSelected">{{ $t(dictionary.payment_systems[psSelected.key].text) }} :: {{ productSelected.name }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark
                               flat
                               :loading="pending"
                               :disabled="pending"
                               @click="submitForm({ email: email, trade_account: trade_account, broker: broker, skype: skype, product_id: productSelected.id, payment_system: psSelected.key })"
                        >
                            <span v-if="productSelected && !productSelected.users">{{ $t('Buy') }}</span>
                            <span v-else="productSelected && !!productSelected.users[0]">{{ $t('Renew subscription') }}</span>
                            <span slot="loader">{{ $t('Processing') }}...</span>
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-card class="grey lighten-4 elevation-0">
                    <v-card-text>
                        <v-container fluid>
                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field
                                            :label="$t('Your e-mail/login')"
                                            :hint="$t('Enter the e-mail provided during registration')"
                                            v-model="email"
                                            required
                                            :disabled="this.isLogin === true"
                                            :error-messages="errors && errors.email ? $t(errors.email[0]) : []"
                                            :error="errors && !!errors.email"
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field
                                            :label="$t('Your trade account')"
                                            :hint="$t('Enter your trade account number')"
                                            v-model="trade_account"
                                            required
                                            :error-messages="errors && errors.trade_account ? $t(errors.trade_account[0]) : []"
                                            :error="errors && !!errors.trade_account"
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field
                                            :label="$t('Trade account broker')"
                                            :hint="$t('Enter broker name of your trade account')"
                                            v-model="broker"
                                            required
                                            :error-messages="errors && errors.broker ? $t(errors.broker[0]) : []"
                                            :error="errors && !!errors.broker"
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field
                                            label="Skype"
                                            :hint="$t('Enter your skype for fast contact with you')"
                                            v-model="skype"
                                            :error-messages="errors && errors.skype ? $t(errors.skype[0]) : []"
                                            :error="errors && !!errors.skype"
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        mounted() {
            this.pricing().then(() => {
                this.activeTab = 'lite';
            });
        },
        data () {
            return {
                dialog: false,
                systemDialog: false,
                psSelected: null,
                productSelected: null,
                email: '',
                skype: '',
                broker: '',
                trade_account: '',
                loader: null,
                errors: [],
                activeTab: null
            }
        },
        computed: {
            ...mapGetters('Product', [
                'products', 'pending', 'has_demo'
            ]),
            ...mapGetters('Dictionary', [
                'dictionary'
            ]),
            ...mapGetters('User', [
                'profile', 'isLogin', 'pending'
            ])
        },
        methods: {
            ...mapActions('Product', [
                'pricing'
            ]),
            paymentSystemSelected: function(paymentSystem, product) {
                this.psSelected = paymentSystem;
                this.productSelected = product;
                this.dialog = true;

                if (!!this.isLogin) {
                    this.email = this.profile.email;
                }
            },
            submitForm: function (formBody) {
                if (this.isLogin === false) {
                    this.$store.dispatch('User/registration', formBody).then(() => {
                        this.$store.dispatch('Product/pay', formBody).then(response => {
                            this.errors = [];
                            this.dialog = false;
                            this.systemDialog = false;
                            this.redirect(response.data.data)
                        }).catch(errors => {
                            this.errors = errors;

                            if (this.errors && this.errors.system) {
                                this.systemDialog = true;
                            }
                        })
                    }).catch(errors => {
                        this.errors = errors;

                        if (this.errors && this.errors.system) {
                            this.systemDialog = true;
                        }
                    })
                } else {
                    let path = (formBody.payment_system === this.dictionary.const.PAYMENT_SYSTEM_DEMO ? 'demo' : 'pay')
                    this.$store.dispatch('Product/' + path, formBody).then(response => {
                        this.errors = [];
                        this.dialog = false;
                        this.systemDialog = false;

                        this.redirect(response.data.data)
                    }).catch(errors => {
                        this.errors = errors;

                        if (this.errors && this.errors.system) {
                            this.systemDialog = true;
                        }
                    })
                }
            },
            redirect: function(formSettings) {
                let form = document.createElement('form');
                form.action = formSettings.actionUrl;
                form.method = formSettings.method;
                let keys = Object.keys(formSettings.params);

                keys.forEach((key) => {
                    form.innerHTML = '<input name="' + key + '" value="' + formSettings.params.key + '">';
                });

                form.submit();
            }
        }
    }
</script>

<style lang="scss">

        .tabs__items {
            border-width: 0
        }

</style>