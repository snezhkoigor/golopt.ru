<template>
    <v-card class="grey lighten-4 elevation-0">
        <v-card-text>
            <v-data-table
                    v-bind:headers="header"
                    v-bind:items="profile.payments"
                    class="elevation-1"
                    :no-data-text="$t('No payment transactions')"
                    :rows-per-page-text="$t('By page')"
                    :rows-per-page-items="perPage"
            >
                <template slot="headerCell" scope="props">
                <span v-tooltip:bottom="{ 'html': $t(props.header.text) }">
                    {{ $t(props.header.text) }}
                </span>
                </template>
                <template slot="items" scope="props">
                    <td class="text-xs-right">{{ props.item.created_at | moment('Do MMM, h:mm a') }}</td>
                    <td class="text-xs-right" v-if="!!props.item.updated_at">{{ props.item.updated_at | moment('Do MMM, h:mm a') }}</td>
                    <td class="text-xs-right" v-if="!props.item.updated_at"></td>
                    <td class="text-xs-right">{{ props.item.amount }} {{ props.item.currency }}</td>
                    <td class="text-xs-right">{{ $t(dictionary.payment_systems[props.item.payment_system].text) }}</td>
                </template>
            </v-data-table>
        </v-card-text>
    </v-card>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        data () {
            return {
                header: [
                    { text: 'Create date', value: 'created_at' },
                    { text: 'Finish date', value: 'updated_at' },
                    { text: 'Amount', value: 'amount' },
                    { text: 'Payment system', value: 'payment_system' }
                ],
                perPage: [ 5, 15, 25, {text: 'All', value: -1} ]
            }
        },
        computed: {
            ...mapGetters('Dictionary', [
                'dictionary'
            ]),
            ...mapGetters('User', [
                'profile'
            ])
        }
    }
</script>

<style lang="scss"></style>