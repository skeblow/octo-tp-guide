<template>
    <div>
        <h1 class="h2">Items</h1>

        <div class="row">
            <div class="col-6">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Search..." v-model="search">
                    <button 
                        class="btn btn-outline-secondary" 
                        type="button"
                        v-on:click="clearSeach"
                    >X</button>
                </div>
            </div>
        </div>

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
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in getItems()" :key="item.name">
                    <td>
                        <img v-bind:src="item.icon">
                        <a 
                            v-bind:href="'http://wiki-en.guildwars2.com/index.php?search='+item.name"
                            target="_blank"
                        >w</a>
                        <a 
                            v-bind:href="'https://www.gw2bltc.com/en/item/'+item.id"
                            target="_blank"
                        >b</a>
                    </td>
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ getBuyPrice(item.id) }}</td>
                    <td>{{ getSellPrice(item.id) }}</td>
                    <td>{{ getProfit(item.id) }}</td>
                    <td>{{ getRoi(item.id) }}%</td>
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
    search: string = '';
    items: Array<Item> = []; 
    prices: Array<ItemPrice> = [];

    async mounted() {
        this.items = await ItemService.getAll();
        this.prices = await ItemService.getPrices(
            this.items.map((item: Item) => item.id)
        );
    }

    clearSearch(): void {
        console.log('clear saech');
        this.search = '';
    }

    getItems(): Array<Item> {
        return this.items.filter(
            item => item.name.toLowerCase().includes(this.search) || item.id === +this.search
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
}
</script>

<style scoped>
    img {
        width: 30px;
        height: 30px;
    }

    a {
        margin: 5px;
    }
</style>
