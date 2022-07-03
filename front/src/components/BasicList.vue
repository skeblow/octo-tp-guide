<template>
    <table class="table table-striped table-hover">
        <thead>
            <tr>
                <th></th>
                <th>Name</th>
                <th>Buy price</th>
                <th>Sell price</th>
                <th>Profit</th>
                <th>Roi</th>
                <th>Bought</th>
                <th>Sold</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="trade in items" :key="trade.item.id">
                <td>
                    <a v-bind:href="'https://www.gw2bltc.com/en/item/'+trade.item.id" target="_blank">
                        <img v-bind:src="trade.item.icon" alt="">
                    </a>
                </td>
                <td>{{ trade.item.name }}</td>
                <td class="text-end"><Gold :amount="trade.totalBuy"></Gold></td>
                <td class="text-end"><Gold :amount="trade.totalSell"></Gold></td>
                <td class="text-end"><Gold :amount="trade.profit"></Gold></td>
                <td>{{ trade.roi }}%</td>
                <td>{{ trade.bltc.bought }} <small>({{ getBoughtDiff(trade) }})</small></td>
                <td>{{ trade.bltc.sold }} <small>({{ getSoldDiff(trade) }})</small></td>
                <td>
                    <span v-bind:class="{'badge bg-primary': isListed(trade)}">{{ getListedCount(trade) }} / {{ trade.target }}</span>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script lang="ts">
import { Options, Vue, prop } from 'vue-class-component';
import { BasicTrade, ListedItem } from '../../../shared';
import Gold from './Gold.vue';

class BasicListProps {
    items = prop<Array<BasicTrade>>({required: true});
    currentBuys = prop<Array<ListedItem>>({required: true});
}

@Options({
    components: {
        Gold,
    }
})
export default class BasicList extends Vue.with(BasicListProps) {
    public getSoldDiff(trade: BasicTrade): string {
        const diff = trade.bltc.sold - trade.bltc.oldSold;
        const sign = diff > 0 ? '+' : '';

        return sign+diff;
    }

    public getBoughtDiff(trade: BasicTrade): string {
        const diff = trade.bltc.bought - trade.bltc.oldBought;
        const sign = diff > 0 ? '+' : '';

        return sign+diff;
    }

    public isListed(trade: BasicTrade): boolean {
        return this.currentBuys.find(
            (item: ListedItem) => item.itemId === trade.item.id,
        ) !== undefined;
    }

    public getListedCount(trade: BasicTrade): number {
        let count = 0;

        for (const item of this.currentBuys) {
            if (trade.item.id === item.itemId) {
                count += item.quantity;
            }
        }

        return count;
    }
}
</script>
<style scoped>
    img {
        width: 30px;
        height: 30px;
    }

    table {
        margin-bottom: 0;
    }
</style>