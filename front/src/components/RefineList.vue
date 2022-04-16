<template>
    <table class="table table-stripped">
        <thead>
            <tr>
                <th>Input</th>
                <th>Output</th>
                <th>Input buy</th>
                <th>Input sell</th>
                <th>Output sell</th>
                <th>Diff</th>
                <th>Roi if bought</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="trade in items" :key="trade.recipe.id">
                <td>
                    {{ trade.input[0].quantity }}x
                    <a v-bind:href="'https://www.gw2bltc.com/en/item/'+trade.input[0].item.id" target="_blank">
                        <img v-bind:src="trade.input[0].item.icon" alt="">
                    </a>
                    {{ trade.input[0].item.name }}
                </td>
                <td>
                    {{ trade.output.quantity }}x
                    <a v-bind:href="'https://www.gw2bltc.com/en/item/'+trade.output.item.id" target="_blank">
                        <img v-bind:src="trade.output.item.icon" alt="">
                    </a>
                    {{ trade.output.item.name }}
                </td>
                <td>
                    {{ formatGold(trade.totalBuy) }}
                </td>
                <td>
                    {{ formatGold(getInputSell(trade)) }}
                </td>
                <td>
                    {{ formatGold(trade.totalSell) }}
                </td>
                <td>
                    {{ formatGold(trade.totalSell - getInputSell(trade)) }}
                </td>
                <td>
                    {{ trade.roi }}%
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script lang="ts">
import { Options, Vue, prop } from 'vue-class-component';
import { RecipeTrade } from '../../../shared';
import PriceService from '../services/PriceService';

class RefineListProps {
    items = prop<Array<RecipeTrade>>({required: true});
}

@Options({})
export default class RefineList extends Vue.with(RefineListProps) {
    formatGold = PriceService.formatGold;

    getInputSell(trade: RecipeTrade): number {
        return trade.input.reduce((total, input) => total + (input.price.sells.unit_price * input.quantity), 0);
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

    tr:last-child td {
        border-bottom: none;
    }
</style>