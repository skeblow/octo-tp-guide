<template>
      <div class="row">
        <div class="col-4 mb-4" v-for="trade in items" :key="trade.recipe.id">
            <div class="card">
                <div class="card-header">
                    <div class="row">
                        <div class="col-8">
                            <img v-bind:src="trade.input.item.icon" alt="">
                            {{ trade.input.item.name }}
                        </div>
                        <div class="col-4 d-flex justify-content-between">
                            <strong>Buy:</strong>
                            <span>{{ formatGold(trade.totalBuy) }}</span>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <table class="table table-stripped">
                        <tbody>
                            <tr v-for="output in trade.output" :key="output.item.id">
                                <td>
                                    {{ output.quantity }}x
                                </td>
                                <td>
                                    <img v-bind:src="output.item.icon" alt="">
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
