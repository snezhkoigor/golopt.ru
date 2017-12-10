<template>
    <v-container fluid  grid-list-md class="pa-0">
        <v-parallax src="./src/assets/images/top.jpg" style="margin-top: -40px;" height="600">
            <v-layout column align-center justify-center>
                <h3 style="position: absolute; top: 150px; font-size: 48px; font-family: 'Roboto', sans-serif" class="white--text parallax-text" v-html="$t('Volume indicator and options online')" />
				<p class="hidden-md-and-down" style="position: absolute; bottom: 200px; font-size: 22px; font-family: 'Roboto', sans-serif">
					{{ $t('Exclusive data analysis from CME to MT4') }}
				</p>
                <p style="position: absolute; bottom: 100px;">
                    <v-btn
                            color="info"
                            large
                            block
							style="width: 300px; height: 60px; font-size: 18px; font-family: 'Roboto', sans-serif"
                            @click="!isLogin ? goToRegistration() : goToProfile()"
                    >
                        {{ $t('Download for free') }}
                    </v-btn>
                </p>
            </v-layout>
        </v-parallax>

        <v-layout row-md wrap class="mb-10 home-product-advantages">
			<v-flex xs12>
				<v-card light class="elevation-0">
					<v-card-text>
						<div>
							<p class="ma-3 text-xs-center content-title" style="text-transform: uppercase; font-size: 40px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif">
								{{ $t('What is it Option Profit') }}
							</p>
						</div>
					</v-card-text>
				</v-card>
			</v-flex>

			<v-flex d-flex xs12 sm6 md6 style="margin-left: 8%" class="hidden-md-and-down">
				<p v-html="$t('Video left text')"></p>
			</v-flex>
			<v-flex d-flex xs12 sm6 md6>
				<p v-html="$t('Video left text')"></p>
			</v-flex>

			<v-flex d-flex xs12 sm4 md4 class="indicator-video hidden-md-and-down" style="margin-top: 3%; margin-left: 30px">
				<iframe width="460" height="200" src="https://www.youtube.com/embed/wZPmUfIMcxU" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>
			</v-flex>
			<v-flex d-flex xs12 sm4 md4 class="indicator-video">
				<iframe width="460" height="200" src="https://www.youtube.com/embed/wZPmUfIMcxU" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>
			</v-flex>

			<v-flex xs12>
				<p class=" headline text-xs-center">
					<v-btn
							color="info"
							large
							style="width: 300px; height: 60px; font-size: 18px;"
							@click="!isLogin ? goToRegistration() : goToProfile()"
					>
						{{ $t('Download for free') }}
					</v-btn>
				</p>
			</v-flex>
        </v-layout>

        <v-layout row wrap id="pricing" class="mb-10 home-product-advantages" v-if="products && activeTab">
            <v-flex xs12>
                <v-card light class="elevation-0">
                    <v-card-text>
                        <div>
                            <p class="ma-3 text-xs-center content-title" style="text-transform: uppercase; font-size: 40px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif">
                                {{ $t('Our products') }}
                            </p>
                        </div>
                    </v-card-text>
                </v-card>

                <v-card light class="elevation-0">
                    <v-card-text>
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
                                                    <div class="headline mb-3 product-item-name">{{ productItem.name }}</div>
                                                    <div class="display-1 mb-3 product-item-price">{{ productItem.price | currency}}/{{ $t(productItem.price_by) }}</div>
                                                    <div class="white elevation-3 product-item-description">
                                                        <v-list two-line>
                                                            <template v-for="(val, key) in productItem.functional">
                                                                <v-list-tile class="subheadline">
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
                                                <v-card-actions v-if="!isLogin"
                                                                class="mb-3"
                                                >
                                                    <v-btn dark
                                                           @click="goToLogin()"
                                                           v-if="!isLogin">
                                                        {{ $t('Buy') }}
                                                    </v-btn>
                                                    <v-btn dark
                                                           v-if="productItem.has_demo === 1"
                                                           @click="goToLogin()"
                                                    >
                                                        {{ $t(dictionary.payment_systems[dictionary.const.PAYMENT_SYSTEM_DEMO].text) }}
                                                    </v-btn>
                                                </v-card-actions>
                                                <v-card-actions v-if="isLogin" class="ml-3 mb-3">
                                                    <v-btn dark
                                                           @click="goToProfile()"
                                                    >
                                                        {{ $t('Go to profile') }}
                                                    </v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </v-flex>
                                    </template>
                                </v-layout>
                            </v-tabs-content>
                        </v-tabs>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>

		<v-layout row-md wrap class="mb-4 indicator-video">
			<v-flex xs12>
				<v-card light class="elevation-0">
					<v-card-text>
						<div>
							<p class="ma-3 text-xs-center content-title" style="text-transform: uppercase; font-size: 40px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif">
								{{ $t('Video with indicator') }}
							</p>
						</div>
					</v-card-text>
				</v-card>
			</v-flex>

			<v-flex d-flex xs12 sm3 md3>
			</v-flex>
			<v-flex d-flex xs12 sm3 md3 >
				<iframe width="300" height="200" v-bind:src='videos[0].src' frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>
			</v-flex>
			<v-flex d-flex xs12 sm3 md3>
				<iframe width="300" height="200" v-bind:src='videos[1].src' frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>
			</v-flex>
			<v-flex d-flex xs12 sm3 md3>
			</v-flex>
			<v-flex d-flex xs12 sm3 md3>
			</v-flex>
			<v-flex d-flex xs12 sm3 md3>
				<iframe width="300" height="200" v-bind:src='videos[2].src' frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>
			</v-flex>
			<v-flex d-flex xs12 sm3 md3>
				<iframe width="300" height="200" v-bind:src='videos[3].src' frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>
			</v-flex>

			<v-flex xs12>
				<p class="ma-3 headline text-xs-center">
					<v-btn
							color="info"
							large
							@click="!isLogin ? goToRegistration() : goToProfile()"
					>
						{{ $t('Watch all') }}
					</v-btn>
				</p>
			</v-flex>
		</v-layout>

		<v-parallax jumbotron src="./src/assets/images/footer.jpg" height="300" style="margin-bottom: -20px">
			<v-layout class="hidden-md-and-down" column align-center justify-center style="font-size: 22px; font-family: 'Roboto', sans-serif">
				<p class="text-lg-center parallax-text" v-html="$t('Footer feedback')">
				</p>
				<p class="text-lg-center parallax-text">
					<router-link :to="{ name: 'feedback'}" replace style="color: white">{{ $t('Feedback') }}</router-link>
				</p>
			</v-layout>

			<v-layout column align-center justify-center style="font-size: 18px; font-family: 'Roboto', sans-serif">
				<p class="text-lg-center parallax-text" v-html="$t('Footer feedback')">
				</p>
				<p class="text-lg-center parallax-text">
					<router-link :to="{ name: 'feedback'}" replace style="color: white">{{ $t('Feedback') }}</router-link>
				</p>
			</v-layout>
		</v-parallax>

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
    </v-container>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        beforeMount() {
            this.$store.dispatch('Youtube/list');
        },
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
            ]),
            ...mapGetters('Youtube', [
                'pending', 'videos'
            ])
        },
        methods: {
            ...mapActions('Product', [
                'pricing'
            ]),
            goToLogin() {
                this.$router.push({
                    'name': 'login'
                });
            },
            goToYoutube: function() {
                window.open('https://www.youtube.com/channel/UCaCmSeb1GwQ9OHTXkpXAJVg', '_blank');
            },
            goToProfile() {
                this.$router.push({
                    'name': 'profile'
                });
            },
            goToRegistration() {
                this.$router.push({
                    'name': 'registration'
                });
            },
            paymentSystemSelected: function(paymentSystem, product) {
                this.psSelected = paymentSystem;
                this.productSelected = product;
                this.dialog = true;

                if (!!this.isLogin) {
                    this.email = this.profile.email;
                    this.trade_account = product.users[0] ? product.users[0].pivot.trade_account : '';
                    this.broker = product.users[0] ? product.users[0].pivot.broker : '';
                    this.skype = this.profile.skype;
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

<style>

</style>
