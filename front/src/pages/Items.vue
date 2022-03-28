<template>
    <div>
        <h1>Items</h1>

        <table class="table table-striped">
            <thead>
                <tr>
                    <th></th>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in items" :key="item.name">
                    <td><img v-bind:src="item.icon" alt=""></td>
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ getPrice(item.id) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import ItemService from '../services/ItemService';

@Options({})
export default class Items extends Vue {
    items: Array<any> = []; 
    prices: Array<any> = [];

    mounted() {
        ItemService.getAll()
            .then(items => {
                this.items = items;

                ItemService.getPrices(items.map((item: any) => item.id))
                    .then(prices => this.prices = prices);
            });
    }

    getPrice(id: number): number {
        const price = this.prices.find((price: any) => price.id === id);

        return price ? +price.buys.unit_price : 0;
    }
}
</script>

<style scoped>
    img {
        width: 30px;
        height: 30px;
    }
</style>
