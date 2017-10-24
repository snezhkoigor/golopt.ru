<template>
    <v-layout row wrap id="pricing" class="mb-10 home-product-advantages" v-if="products">
        <v-flex xs12>
            <v-list three-line v-for="(val, key) in products" :key="key">
                <v-subheader>{{ key | uppercase }}</v-subheader>
                <v-list-tile
                        v-for="productItem in products[key]"
                        :key="productItem.name"
                >
                    <v-list-tile-content class="product-list-title">
                        <v-list-tile-title class="product-list-title-title">
                            <span>{{ productItem.name }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<v-icon>mdi-trending-neutral</v-icon></span>
                            <span>
                                <v-menu
                                        origin="center center"
                                        transition="scale-transition"
                                        bottom
                                        class="text-xs-right"
                                >
                                    <v-btn color="primary" flat slot="activator" v-if="!isLogin">
                                        {{ $t('Buy') }}
                                    </v-btn>
                                    <v-btn color="primary" flat slot="activator" v-else="isLogin">
                                        <span v-if="!productItem.users[0]">{{ $t('Buy') }}</span>
                                        <span v-if="!!productItem.users[0]">{{ $t('Renew subscription') }}</span>
                                    </v-btn>
                                    <v-list>
                                        <v-list-tile
                                                v-for="paymentSystemItem in dictionary.payment_systems" :key="paymentSystemItem.key"
                                                v-if="paymentSystemItem.key !== dictionary.const.PAYMENT_SYSTEM_DEMO"
                                                @click="paymentSystemSelected(paymentSystemItem, productItem)"
                                        >
                                            <v-list-tile-title>
                                                {{ $t(paymentSystemItem.text) }}
                                            </v-list-tile-title>
                                        </v-list-tile>
                                    </v-list>
                                </v-menu>
                            </span>
                            <span v-if="productItem.has_demo === 1 && !productItem.users[0]" class="product-list-title-buttons">
                                <v-btn color="primary" flat
                                       @click="paymentSystemSelected(dictionary.payment_systems[dictionary.const.PAYMENT_SYSTEM_DEMO], productItem)">
                                    {{ $t(dictionary.payment_systems[dictionary.const.PAYMENT_SYSTEM_DEMO].text) }}
                                </v-btn>
                            </span>
                            <span v-if="!!productItem.users[0]" class="product-list-title-buttons">
                                <v-btn color="primary" flat
                                       @click="downloadProduct(productItem)">
                                    {{ $t('Download') }}
                                </v-btn>
                            </span>
                            <span v-if="!!productItem.users[0] && !!productItem.set_path" class="product-list-title-buttons">
                                <v-btn color="primary" flat
                                       @click="downloadSet(productItem)">
                                    .set
                                </v-btn>
                            </span>
                            <span v-if="!!productItem.users[0]" class="product-list-title-buttons">
                                <v-btn color="primary" flat
                                       @click="editSelected(productItem)">
                                    {{ $t('Edit') }}
                                </v-btn>

                            </span>
                        </v-list-tile-title>
                        <v-list-tile-title>
                            {{ productItem.price | currency }}/{{ $t(productItem.price_by) }}
                            <span v-if="!!productItem.users[0]" v-bind:class="{ 'green--text': productItem.users[0].pivot.active === 1, 'red--text': productItem.users[0].pivot.active === 0 }">
                                 ({{ $t('untill') }} {{ productItem.users[0].pivot.subscribe_date_until | moment('Do MMM') }})
                            </span>
                        </v-list-tile-title>
                        <v-list-tile-sub-title class="mb-2">
                            {{ $t(productItem.description) }}
                        </v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
            </v-list>
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
                <v-toolbar dark color="primary">
                    <v-btn icon @click.native="dialog = false" dark>
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title v-if="psSelected">{{ $t(dictionary.payment_systems[psSelected.key].text) }} :: {{ productSelected.name }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark
                               flat
                               :loading="pending || userPending"
                               :disabled="pending || userPending"
                               @click="isEdit ? saveProductSettings({ trade_account: trade_account, broker: broker, product_id: productSelected.id }) : goToPayPage({email: profile.email, trade_account: trade_account, broker: broker, skype: skype, product_id: productSelected.id, payment_system: psSelected.key })"
                        >
                            <span v-if="isEdit === true">
                                {{ $t('Save') }}
                            </span>
                            <span v-if="psSelected && psSelected.key !== dictionary.const.PAYMENT_SYSTEM_DEMO">
                                {{ $t('Buy') }}
                            </span>
                            <span v-if="psSelected && psSelected.key === dictionary.const.PAYMENT_SYSTEM_DEMO">
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
                skype: ''
            }
        },
        computed: {
            ...mapGetters({
                products: 'Product/products',
                pending: 'Product/pending',
                dictionary: 'Dictionary/dictionary',
                profile: 'User/profile',
                isLogin: 'User/isLogin',
                userPending: 'User/pending',
            })
        },
        filters: {
            uppercase: function(v) {
                return v.toUpperCase();
            }
        },
        methods: {
            ...mapActions('Product', [
                'pricing'
            ]),
            ...mapActions('User', [
                'findProduct'
            ]),
            downloadProduct: function(product) {
                if (product.users[0].pivot.trade_account) {
                    this.$store.dispatch('Product/download', {
                        id: product.id,
                        trade_account: product.users[0].pivot.trade_account
                    });
                }
            },
            downloadSet: function(product) {
                if (product.users[0].pivot.trade_account) {
                    this.$store.dispatch('Product/downloadSetFile', {
                        id: product.id,
                        trade_account: product.users[0].pivot.trade_account
                    });
                }
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
                if (formBody.payment_system === this.dictionary.const.PAYMENT_SYSTEM_DEMO) {
                    this.$store.dispatch('Product/demo', formBody).then(() => {
                        this.$store.dispatch('Product/pricing').then(() => {
                            this.$store.dispatch('User/profile').then(() => {
                                this.errors = [];
                                this.dialog = false;
                                this.systemDialog = false;
                            });
                        });
                    }).catch(errors => {
                        this.errors = errors;

                        if (this.errors && this.errors.system) {
                            this.systemDialog = true;
                        }
                    });
                } else {
                    this.$store.dispatch('Product/pay', formBody).then(response => {
                        this.errors = [];
                        this.dialog = false;
                        this.systemDialog = false;

                        this.$store.dispatch('Product/pricing').then(() => {
                            this.$store.dispatch('User/profile').then(() => {
                                this.errors = [];
                                this.dialog = false;
                                this.systemDialog = false;

                                this.redirect(response.data.data);
                            });
                        });
                    }).catch(errors => {
                        this.errors = errors;

                        if (this.errors && this.errors.system) {
                            this.systemDialog = true;
                        }
                    });
                }
            },
            redirect: function(formSettings) {
                let form = document.createElement('form');
                form.action = formSettings.actionUrl;
                form.method = formSettings.method;
                let keys = Object.keys(formSettings.params);

                keys.forEach((item, i) => {
                    if (item === 'need-fio') {
                        form.innerHTML += '<input type="hidden" name="' + item + '" value="false">';
                    }
                    else if (item === 'need-email') {
                        form.innerHTML += '<input type="hidden" name="' + item + '" value="false">';
                    } else {
                        form.innerHTML += '<input type="hidden" name="' + item + '" ' + (item === 'sum' ? 'data-type="number"' : '') + ' value="' + formSettings.params[item] + '">';
                    }
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