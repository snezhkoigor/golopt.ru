<template>
    <v-layout row wrap id="pricing" class="mb-10 home-product-advantages" v-if="products && activeTab">
        <v-flex xs12>
            <v-tabs light fixed centered v-model="activeTab">
                <v-tabs-bar class="white lighten-4" light>
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
                    <v-layout row wrap child-flex class="product">
                        <template v-for="productItem in products[key]">
                            <v-flex d-flex xs12 sm6 md4>
                                <v-card class="ma-2 grey darken-2 white--text product-item">
                                    <v-card-title primary-title>
                                        <div class="headline mb-3 product-item-name">
                                            {{ productItem.name }}
                                            <span v-if="!!productItem.users[0]" v-bind:class="{ 'green--text': productItem.users[0].pivot.active === 1, 'red--text': productItem.users[0].pivot.active === 0 }">
                                                 {{ $t('untill') }} {{ productItem.users[0].pivot.subscribe_date_until | moment('Do MMM') }}
                                            </span>
                                        </div>
                                        <div class="display-1 mb-3 product-item-price">{{ productItem.price | currency }}/{{ $t(productItem.price_by) }}</div>
                                        <div class="home-product-description white elevation-3 product-item-description">
                                            <v-list two-line >
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
                                            <v-btn dark slot="activator" v-if="!isLogin">
                                                {{ $t('Buy') }}
                                            </v-btn>
                                            <v-btn dark slot="activator" v-else="isLogin">
                                                <span v-if="!productItem.users[0]">{{ $t('Buy') }}</span>
                                                <span v-if="!!productItem.users[0]">{{ $t('Renew subscription') }}</span>
                                            </v-btn>
                                            <v-list>
                                                <v-list-tile
                                                        v-for="paymentSystemItem in dictionary.payment_systems" :key="paymentSystemItem.key"
                                                        v-if="paymentSystemItem.key !== dictionary.const.PAYMENT_SYSTEM_DEMO"
                                                >
                                                    <v-list-tile-title
                                                            @click="paymentSystemSelected(paymentSystemItem, productItem)"
                                                    >
                                                        {{ $t(paymentSystemItem.text) }}
                                                    </v-list-tile-title>
                                                </v-list-tile>
                                            </v-list>
                                        </v-menu>
                                        <v-btn dark
                                               v-if="productItem.has_demo === 1"
                                               @click="paymentSystemSelected(dictionary.payment_systems[dictionary.const.PAYMENT_SYSTEM_DEMO], productItem)">
                                            {{ $t(dictionary.payment_systems[dictionary.const.PAYMENT_SYSTEM_DEMO].text) }}
                                        </v-btn>
                                        <v-btn v-if="!!productItem.users[0].pivot.trade_account"
                                               @click="downloadProduct(productItem)"
                                               class="green darken-1"
                                        >
                                            <v-icon>mdi-download</v-icon>
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-flex>
                        </template>
                    </v-layout>
                </v-tabs-content>
            </v-tabs>
        </v-flex>

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
                    <v-btn class="red--text darken-1" flat @click="systemDialog = false">{{ $t('Close') }}</v-btn>
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
                            v-if="isEdit === true"
                            @click="saveProductSettings({ trade_account: trade_account, broker: broker, product_id: productSelected.id })"
                        >
                            {{ $t('Save') }}
                            <span slot="loader">{{ $t('Processing') }}...</span>
                        </v-btn>
                        <v-btn dark
                            flat
                            v-if="isEdit === false"
                            :loading="pending"
                            :disabled="pending"
                            @click="goToPayPage({email: profile.email, trade_account: trade_account, broker: broker, skype: skype, product_id: productSelected.id, payment_system: psSelected.key })"
                        >
                            <span v-if="psSelected && psSelected.key !== dictionary.const.PAYMENT_SYSTEM_DEMO">
                                {{ $t('Buy') }}
                            </span>
                            <span v-else="psSelected && psSelected.key === dictionary.const.PAYMENT_SYSTEM_DEMO">
                                {{ $t('Get') }}
                            </span>
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
                                        v-model="profile.skype"
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
    </v-layout>
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
                psSelected: null,
                productSelected: null,
                loader: null,
                errors: [],
                systemDialog: false,
                dialog: false,
                broker: '',
                trade_account: '',
                modifyProducts: [],
                isEdit: false,
                activeTab: null,
                skype: ''
            }
        },
        computed: {
            ...mapGetters('Product', [
                'products', 'pending'
            ]),
            ...mapGetters('Dictionary', [
                'dictionary'
            ]),
            ...mapGetters('User', [
                'profile', 'pending', 'isLogin'
            ]),
        },
        methods: {
            ...mapActions('Product', [
                'pricing'
            ]),
            ...mapActions('User', [
                'findProduct'
            ]),
            downloadProduct: function(product) {
                this.$store.dispatch('Product/download', { id: product.id, trade_account: product.users[0].pivot.trade_account });
            },
            editSelected: function(product) {
                this.productSelected = product;
                this.trade_account = product.users[0].pivot.trade_account;
                this.broker = product.users[0].pivot.broker;
                this.dialog = true;
                this.isEdit = true;
                this.errors = [];
            },
            paymentSystemSelected: function(paymentSystem, product) {
                this.errors = [];
                if (product.users.length) {
                    let formBody = {
                        trade_account: product.users[0].pivot.trade_account,
                        broker: product.users[0].pivot.broker,
                        product_id: product.id,
                        payment_system: paymentSystem.key
                    }

                    this.goToPayPage(formBody);
                } else {
                    this.broker = '';
                    this.trade_account = '';
                    this.psSelected = paymentSystem;
                    this.productSelected = product;
                    this.dialog = true;
                    this.isEdit = false;
                }
            },
            saveProductSettings: function(formBody) {
                this.$store.dispatch('User/updateProduct', formBody).then(() => {
                    this.errors = [];
                    this.dialog = false;
                    this.systemDialog = false;
                    this.$store.dispatch('Product/pricing');
                }).catch(errors => {
                    this.errors = errors;

                    if (this.errors && this.errors.system) {
                        this.systemDialog = true;
                    }
                })
            },
            goToPayPage: function (formBody) {
                this.$store.dispatch('Product/pay', formBody).then(response => {
                    this.errors = [];
                    this.dialog = false;
                    this.systemDialog = false;

                    this.redirect(response.data.data);
                }).catch(errors => {
                    this.errors = errors;

                    if (this.errors && this.errors.system) {
                        this.systemDialog = true;
                    }
                })
            },
            redirect: function(formSettings) {
                let form = document.createElement('form');
                form.action = formSettings.actionUrl;
                form.method = formSettings.method;
                let keys = Object.keys(formSettings.params);

                keys.forEach((item, i) => {
                    form.innerHTML += '<input type="hidden" name="' + item + '" ' + (item === 'sum' ? 'data-type="number"' : '') + ' value="' + formSettings.params[item] + '">';
                });

                form.submit();
            }
        }
    }
</script>

<style lang="scss">
    .card-title p {
        width: 100%;
    }

    p.subscribe_date_until-empty {
        min-height: 36px;
    }
</style>