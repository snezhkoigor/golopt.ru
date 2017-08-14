<template>
    <div class="product">
        <v-data-table
                v-bind:headers="header"
                v-bind:items="products"
                class="elevation-1"
                no-data-text="Нет добавленных продуктов"
                rows-per-page-text="Кол-во на странице"
                :rows-per-page-items="perPage"
        >
            <template slot="headerCell" scope="props">
                <span v-tooltip:bottom="{ 'html': props.header.text }">
                    {{ props.header.text }}
                </span>
            </template>
            <template slot="items" scope="props">
                <td>{{ props.item.id }}</td>
                <td class="text-xs-right">{{ props.item.name }}</td>
                <td class="text-xs-right">{{ props.item.path }}</td>
                <td class="text-xs-right">{{ props.item.description }}</td>
                <td class="text-xs-right">{{ props.item.price }}/{{ props.item.price_by }}</td>
                <td class="text-xs-right">{{ props.item.demo_access_days }}</td>
                <td class="text-xs-right">{{ props.item.active }}</td>
                <td>
                    <v-icon style="cursor: pointer" class="mr-2">mdi-pencil</v-icon>
                    <v-icon style="cursor: pointer">mdi-close-box-outline</v-icon>
                </td>
            </template>
        </v-data-table>

        <p class="mt-4 button-for-small-screens">
            <v-btn info
                   large
                   block
                   @click.native.stop="dialog = true"
                   class="hidden-sm-and-up"
            >
                Добавить
            </v-btn>
        </p>
        <p class="mt-4 button-for-big-screens">
            <v-btn info
                   large
                   @click.native.stop="dialog = true"
                   class="hidden-xs-only"
            >
                Добавить
            </v-btn>
        </p>

        <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition">
            <v-card v-if="!isEditing">
                <v-toolbar dark class="primary">
                    <v-btn icon @click.native="closeModal()" dark>
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title></v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark
                               flat
                               :loading="pending"
                               :disabled="pending"
                               @click="submitModal({name: name, path: path, description: description, price: price, price_by: price_by.key, demo_access_days: demo_access_days})"
                        >
                            Сохранить
                            <span slot="loader">Обработка...</span>
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-card class="lighten-4 elevation-0">
                    <v-card-text>
                        <v-container fluid>
                            <v-layout row>
                                <v-flex xs4>
                                    <v-subheader>Название</v-subheader>
                                </v-flex>
                                <v-flex xs8>
                                    <v-text-field
                                            name="name"
                                            v-model="name"
                                            label="Название"
                                            hint="Вводите название индикатора/продукта"
                                            :error-messages="errors && errors.name ? errors.name : []"
                                            :error="errors && !!errors.name"
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs4>
                                    <v-subheader>Путь для скачивания продукта</v-subheader>
                                </v-flex>
                                <v-flex xs8>
                                    <v-text-field
                                            name="path"
                                            label="Путь"
                                            v-model="path"
                                            hint="Вводите путь, который будет использоваться для скачивания индикатора/продукта"
                                            :error-messages="errors && errors.path ? errors.path : []"
                                            :error="errors && !!errors.path"
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs4>
                                    <v-subheader>Описание</v-subheader>
                                </v-flex>
                                <v-flex xs8>
                                    <v-text-field
                                            name="description"
                                            v-model="description"
                                            label="Описание"
                                            hint="Вводите путь, который будет использоваться для скачивания индикатора/продукта"
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs4>
                                    <v-subheader>Цена подписки</v-subheader>
                                </v-flex>
                                <v-flex xs12 sm5>
                                    <v-text-field
                                            name="price"
                                            label="Цена"
                                            prefix="$"
                                            v-model="price"
                                            hint="Вводите цену индикатора/продукта (указывается в $)"
                                            :error-messages="errors && errors.price ? errors.price : []"
                                            :error="errors && !!errors.price"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm3>
                                    <v-select
                                            name="price_by"
                                            v-bind:items="priceByItems"
                                            v-model="price_by"
                                            item-text="text"
                                            item-value="key"
                                            label="Период подписки"
                                            single-line
                                            hint="По умолчанию - 'В месяц'"
                                            bottom
                                    ></v-select>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs4>
                                    <v-subheader>Демо доступ в днях</v-subheader>
                                </v-flex>
                                <v-flex xs8>
                                    <v-text-field
                                            name="demo_access_days"
                                            label="Демо доступ"
                                            v-model="demo_access_days"
                                            hint="Вводите кол-во дней демо доступа к индикатору/продукту"
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        data () {
            return {
                dialog: false,
                name: '',
                description: '',
                path: '',
                price: '',
                demo_access_days: '',
                loader: null,
                search: '',
                header: [
                    {
                        text: 'ID',
                        align: 'left',
                        sortable: false,
                        value: 'id'
                    },
                    { text: 'Название', value: 'name' },
                    { text: 'Путь', value: 'path' },
                    { text: 'Описание', value: 'description' },
                    { text: 'Цена/интервал', value: 'price' },
                    { text: 'Демо/дней', value: 'demo_access_days' },
                    { text: 'Доступен', value: 'active' },
                    { text: '', value: null }
                ],
                priceByItems: [
                    { text: 'В месяц', key: 'month' },
                    { text: 'В год', key: 'year' },
                    { text: 'Бессрочно', key: 'full' }
                ],
                price_by: { text: 'В месяц', key: 'month' },
                perPage: [ 5, 15, 25, {text: 'Все', value: -1} ],
                isEditing: false
            }
        },
        mounted() {
            this.list()
        },
        computed: {
            ...mapGetters('Product', [
                'products', 'pending', 'errors'
            ])
        },
        methods: {
            ...mapActions('Product', [
                'save', 'list', 'clearErrors'
            ]),
            closeModal: function() {
                this.clearErrors(1)
                this.dialog = false
            },
            submitModal: function(formBody) {
                this.save({
                    name: formBody.name,
                    path: formBody.path,
                    description: formBody.description,
                    price: formBody.price,
                    price_by: formBody.price_by.key,
                    demo_access_days: formBody.demo_access_days
                })

                if (!!this.errors) {
                    this.closeModal()
                }
            }
        }
    }
</script>

<style lang="scss">
    .product {
        p.button-for-big-screens {
            text-align: right;
        }
    }
</style>