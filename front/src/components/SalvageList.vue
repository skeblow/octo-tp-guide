<template>
      <div class="row">
        <div class="col-4 mb-4" v-for="trade in items" :key="trade.recipe.id">
            <div class="card">
                <div class="card-header">
                    <a v-bind:href="'https://www.gw2bltc.com/en/item/'+trade.input.item.id" target="_blank">
                        <img v-bind:src="trade.input.item.icon" alt="">
                    </a>
                    {{ trade.input.item.name }}
                    <small>(Buy)</small>
                </div>
                <div class="card-body">
                    <table class="table table-stripped">
                        <tbody>
                            <tr v-for="output in trade.output" :key="output.item.id">
                                <td>
                                    {{ output.quantity }}x
                                </td>
                                <td>
                                    <a v-bind:href="'https://www.gw2bltc.com/en/item/'+output.item.id" target="_blank">
                                        <img v-bind:src="output.item.icon" alt="">
                                    </a>
                                </td>
                                <td>{{ output.item.name }}</td>
                                <td class="text-end">{{ formatGold(output.price.sells.unit_price) }}</td>
                                <td class="text-end">
                                    <strong>
                                        {{ formatGold(Math.round(output.price.sells.unit_price * output.quantity)) }}
                                    </strong>
                                </td>
                            </tr>
                            <tr>
                                <td>Bought:</td>
                                <td><strong>{{ trade.input.bltc.bought }}</strong></td>
                                <td colspan="2" class="text-end">Total buy:</td>
                                <td class="text-end"><strong>
                                    {{ formatGold(trade.totalBuy) }}
                                </strong></td>
                            </tr>
                            <tr>
                                <td colspan="4" class="text-end">Total sell:</td>
                                <td class="text-end"><strong>
                                    {{ formatGold(trade.totalSell) }}
                                </strong></td>
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
import { SalvageTrade } from '../../../shared';
import PriceService from '../services/PriceService';

class SalvageListProps {
    items = prop<Array<SalvageTrade>>({required: true});
}

@Options({})
export default class SalvageList extends Vue.with(SalvageListProps) {
    formatGold = PriceService.formatGold;
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
