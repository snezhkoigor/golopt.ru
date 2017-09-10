<template>
    <v-container fluid class="pa-0">
        <v-parallax src="./src/assets/images/cme.jpg" style="margin-top: -40px;">
            <v-layout row>
                <v-flex xs6 order-xs2>
                    <v-card light class="light right">
                        <v-card-text>
                            <div class="headline ma-3 gray--text">Опционный анализ с Option Profit на рынке Forex - путь к стабильному заработку</div>
                            <div
                                    class="subheading ma-3 gray--text hidden-xs-only"
                            >
                                <ul>
                                    <li>
                                        Самые актуальные данные с Чикагской товарной биржи.
                                    </li>
                                    <li>
                                        Потоковая трансляция данных в терминал МetaТrader4. Автоматическое обновление каждые 5 минут.
                                    </li>
                                    <li>
                                        Свежие данные 24 часа в сутки.
                                    </li>
                                    <li>
                                        Бесплатное тестирование в течении двух торговых недель.
                                    </li>
                                </ul>
                            </div>
                            <v-btn
                                    info
                                    large
                                    block
                                    secondary
                                    @click="paymentSystemSelected(dictionary.payment_systems[dictionary.const.PAYMENT_SYSTEM_DEMO], (has_demo.length ? has_demo[0] : null))"
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
                                Революция в области торговли на рынке Форекс.<br/> Индикатор опционных уровней Option Profit.
                            </p>
                            <p>
                                Как известно финансовые рынки между собой взаимосвязаны, а именно срочный рынок Форекс, рынок Фьючерсов и рынок Опционов и, как следствие, они оказывают влияние друг на друга. Таким образом глубокий анализ доступной рыночной информации позволяет с большой долей вероятности прогнозировать движение цены.
                            </p>
                            <p>
                                Однако далеко не каждому эта информация доступна. Большинство трейдеров пытается заработать на рынке Форекс, применяя в своей торговле стандартные инструменты технического анализа. Не секрет, что использование в анализе и торговле обычных индикаторов далеко не самый лучший способ достичь успеха в этом ремесле. Так как все стандартные индикаторы имеют существенный недостаток — они строят графические объекты на основе исторических данных, а так как рынок не линейная структура, есть велика вероятность, что торговая система, основанная на стандартном индикаторе или наборе индикаторов, давшая в прошлом прибыльный сигнал, может с большой долей вероятности в следующий раз выдать ложный, убыточный сигнал.
                            </p>
                            <p>
                                Мы представляем вам индикатор, позволяющий анализировать рынок на основе самой свежей рыночной информации. С помощью индикатора опционных уровней OptionProfit можно с большой долей вероятности спрогнозировать ценовые уровни, где будет происходить, как минимум, коррекционные движения для внутридневной торговли, а так же вы сможете совершать сделки с большим потенциалом прибыли и малым риском в каждой, отдельно взятой сделке.
                            </p>
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
                                Что вы получаете в версии Lite
                            </p>
                        </div>
                        <v-layout row-sm column child-flex-sm class="mb-10" >
                                <v-card dark class="ma-2 what-you-will-get ">
                                    <v-card-title>
                                        <v-icon class="display-2 red--text darken-1">mdi-truck-fast</v-icon>
                                    </v-card-title>
                                    <v-card-text class="subheading">
                                        Самые актуальные данные с Чикагской товарной биржи.
                                    </v-card-text>
                                </v-card>
                                <v-card dark class="ma-2 what-you-will-get">
                                    <v-card-title>
                                        <v-icon class="display-2 red--text darken-1">mdi-cached</v-icon>
                                    </v-card-title>
                                    <v-card-text class="subheading">
                                        Потоковая трансляция данных в терминал МetaТrader4. Автоматическое обновление каждые 5 минут.
                                    </v-card-text>
                                </v-card>
                                <v-card dark class="ma-2 what-you-will-get">
                                    <v-card-title>
                                        <v-icon class="display-2 red--text darken-1">mdi-alarm</v-icon>
                                    </v-card-title>
                                    <v-card-text class="subheading">
                                        Свежие данные 24 часа в сутки.
                                    </v-card-text>
                                </v-card>
                                <v-card dark class="ma-2 what-you-will-get ">
                                    <v-card-title>
                                        <v-icon class="display-2 red--text darken-1">mdi-cart-off</v-icon>
                                    </v-card-title>
                                    <v-card-text class="subheading">
                                        Бесплатное тестирование в течении двух торговых недель.
                                    </v-card-text>
                                </v-card>

                        </v-layout>
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
                                Продвинутые версии индикатора
                            </p>
                        </div>
                        <v-layout row-sm column child-flex-sm>
                            <template v-for="productItem in products">
                                <v-card class="ma-2 cyan darken-2 white--text">
                                    <v-card-title primary-title>
                                        <div class="headline">{{ productItem.name }}</div>
                                        <div class="home-product-description">{{ productItem.description }}</div>
                                        <div class="headline mt-4">{{ productItem.price }}$/{{ dictionary.price_by[productItem.price_by].text }}</div>
                                    </v-card-title>
                                    <v-card-actions>
                                        <v-menu
                                            origin="center center"
                                            transition="scale-transition"
                                            bottom
                                        >
                                            <v-btn flat dark slot="activator">
                                                {{ $t('Buy') }}
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
                            </template>
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
                            {{ $t('Buy') }}
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
            this.list()
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
                errors: []
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
                'list'
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