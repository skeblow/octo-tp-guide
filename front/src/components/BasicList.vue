<template>
    <table class="table table-striped">
        <thead>
            <tr>
                <th></th>
                <th>Id</th>
                <th>Name</th>
                <th>Buy price</th>
                <th>Sell price</th>
                <th>Profit</th>
                <th>Roi</th>
                <th>Sold</th>
                <th>Bought</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="trade in items" :key="trade.item.id">
                <td><img v-bind:src="trade.item.icon" alt=""></td>
                <td>{{ trade.item.id }}</td>
                <td>{{ trade.item.name }}</td>
                <td>{{ formatGold(trade.price.buys.unit_price) }}</td>
                <td>{{ formatGold(trade.price.sells.unit_price) }}</td>
                <td>{{ formatGold(getProfit(trade)) }}</td>
                <td>{{ getRoi(trade) }}%</td>
                <td>{{ trade.bltc.sold }}</td>
                <td>{{ trade.bltc.bought }}</td>
            </tr>
        </tbody>
    </table>
</template>
<script lang="ts">
import { Options, Vue, prop } from 'vue-class-component';
import { BasicTrade } from '../../../shared';
import PriceService from '../services/PriceService';

class BasicListProps {
    items = prop<Array<BasicTrade>>({required: true})
}

@Options({})
export default class BasicList extends Vue.with(BasicListProps) {
    formatGold = PriceService.formatGold;

    getProfit(): number {
        return 0;
    }

    getRoi() {
        return 0;
    }
}
</script>
<style scoped>
    img {
        width: 30px;
        height: 30px;
    }
</style>