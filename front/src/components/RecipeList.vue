<template>
    <div class="row">
        <div class="col-4 mb-4" v-for="trade in items" :key="trade.recipe.id">
            <div class="card" v-bind:class="{'bg-danger': trade.roi < 10, 'text-white': trade.roi < 10}">
                <div class="card-header">
                    <a v-bind:href="'https://www.gw2bltc.com/en/item/'+trade.output.item.id" target="_blank">
                        <img v-bind:src="trade.output.item.icon" alt="">
                    </a>
                    {{ trade.output.item.name }}
                     <small>(Sell)</small>
                </div>
                <div class="card-body">
                    <table class="table table-stripped">
                        <tbody>
                            <tr v-for="input in trade.input" :key="input.item.id">
                                <td>
                                    {{ input.quantity }}x
                                </td>
                                <td>
                                    <a v-bind:href="'https://www.gw2bltc.com/en/item/'+input.item.id" target="_blank">
                                        <img v-bind:src="input.item.icon" alt="">
                                    </a>
                                </td>
                                <td>{{ input.item.name }}</td>
                                <td class="text-end">{{ formatGold(input.price.buys.unit_price) }}</td>
                                <td class="text-end"><strong>
                                    {{ formatGold(input.price.buys.unit_price * input.quantity) }}
                                </strong></td>
                            </tr>
                            <tr>
                                <td colspan="4" class="text-end">Total buy:</td>
                                <td class="text-end">
                                    <strong>{{ formatGold(trade.totalBuy) }}</strong>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="4" class="text-end">Raw sell:</td>
                                <td class="text-end">
                                    <strong>{{ formatGold(getRawSell(trade)) }}</strong>
                                </td>
                            </tr>
                            <tr>
                                <td>Sold:</td>
                                <td><strong>{{ trade.output.bltc.sold }}</strong></td>
                                <td colspan="2" class="text-end">Total sell:</td>
                                <td class="text-end">
                                    <strong>{{ formatGold(trade.totalSell) }}</strong>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="4" class="text-end">Profit:</td>
                                <td class="text-end"><strong>
                                    {{ formatGold(trade.profit) }}
                                </strong></td>
                            </tr>
                            <tr>
                                <td colspan="4" class="text-end">Roi:</td>
                                <td class="text-end"><strong>
                                    {{ trade.roi }}%
                                </strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Options, Vue, prop } from 'vue-class-component';
import { RecipeTrade } from '../../../shared';
import PriceService from '../services/PriceService';

class RecipeListProps {
    items = prop<Array<RecipeTrade>>({required: true});
}

@Options({})
export default class RecipeList extends Vue.with(RecipeListProps) {
    formatGold = PriceService.formatGold;

    getRawSell(trade: RecipeTrade): number {
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
