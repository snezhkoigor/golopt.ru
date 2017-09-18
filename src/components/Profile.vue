<template>
    <div class="profile">
        <v-tabs centered v-model="active">
            <v-tabs-bar slot="activators" class="white">
                <v-tabs-item
                        v-for="tab in tabs"
                        :key="tab.name"
                        :href="'#' + tab.name"
                        ripple
                >
                    {{ $t(tab.title) }}
                    <!--<span v-badge:4.left>{{ tab.title }}</span>-->
                </v-tabs-item>
                <v-tabs-slider class="blue"></v-tabs-slider>
            </v-tabs-bar>

            <v-tabs-content
                    v-for="tab in tabs"
                    :key="tab.name"
                    :id="tab.name"
            >
                <v-card flat>
                    <v-card-text v-if="tab.name === 'edit'">
                        <profile-settings></profile-settings>
                    </v-card-text>
                    <v-card-text v-if="tab.name === 'product'">
                        <profile-products></profile-products>
                    </v-card-text>
                    <v-card-text v-if="tab.name === 'payment'">
                        <profile-payments></profile-payments>
                    </v-card-text>
                </v-card>
            </v-tabs-content>
        </v-tabs>
    </div>
</template>

<script>
    import ProfileSettings from './profile/ProfileSettings.vue'
    import ProfileProducts from './profile/ProfileProducts.vue'
    import ProfilePayments from './profile/ProfilePayments.vue'

    export default {
        components: {
            ProfileSettings,
            ProfileProducts,
            ProfilePayments
        },
        data () {
            return {
                tabs: [
                    {
                        name: 'edit',
                        title: 'Settings'
                    },
                    {
                        name: 'product',
                        title: 'Products'
                    },
                    {
                        name: 'payment',
                        title: 'Payments'
                    }
                ],
                active: 'product'
            }
        }
    }
</script>

<style lang="scss">
    .profile {
        .tabs__items {
            border-width: 0
        }
    }
</style>