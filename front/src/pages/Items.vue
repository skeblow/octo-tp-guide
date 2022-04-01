<template>
    <div>
        <h1>Items</h1>

        <table class="table table-striped">
            <thead>
                <tr>
                    <th></th>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Buy price</th>
                    <th>Sell price</th>
                    <th>Profit</th>
                    <th>ROI</th>
                    <th>Supply</th>
                    <th>Demand</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in items" :key="item.name">
                    <td><img v-bind:src="item.icon" alt=""></td>
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ getBuyPrice(item.id) }}</td>
                    <td>{{ getSellPrice(item.id) }}</td>
                    <td>{{ getProfit(item.id) }}</td>
                    <td>{{ getRoi(item.id) }}%</td>
                    <td>{{ getSupply(item.id) }}</td>
                    <td>{{ getDemand(item.id) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Item, ItemPrice } from '../../../shared';
import ItemService from '../services/ItemService';

@Options({})
export default class Items extends Vue {
    items: Array<Item> = []; 
    prices: Array<ItemPrice> = [];

    async mounted() {
        this.items = await ItemService.getAll();
        this.prices = await ItemService.getPrices(
            this.items.map((item: Item) => item.id)
        );
    }

    getBuyPrice(id: number): number {
        const price = this.prices.find((price: any) => price.id === id);

        return price ? +price.buys.unit_price : 0;
    }

    getSellPrice(id: number): number {
        const price = this.prices.find((price: any) => price.id === id);

        return price ? +price.sells.unit_price : 0;
    }

    getProfit(id: number): number {
        return Math.round( 0.85 * this.getSellPrice(id) - this.getBuyPrice(id) );
    }

    getRoi(id: number): number {
        const buyPrice = this.getBuyPrice(id);

        if (buyPrice === 0) {
            return 0;
        }

        return Math.round(this.getProfit(id) / this.getBuyPrice(id) * 100);
    }

    getSupply(id: number): number {
        const price = this.prices.find((price: any) => price.id === id);

        return price ? +price.sells.quantity : 0;
    }

    getDemand(id: number): number {
        const price = this.prices.find((price: any) => price.id === id);

        return price ? +price.buys.quantity : 0;
    }
}
</script>

<style scoped>
    img {
        width: 30px;
        height: 30px;
    }
</style>
