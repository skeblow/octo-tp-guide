<template>
      <div class="row">
        <div class="col-4 mb-4" v-for="trade in items" :key="trade.recipe.id">
            <div class="card" v-bind:class="{'bg-danger': trade.roi < 10, 'text-white': trade.roi < 10}">
                <div class="card-header d-flex justify-content-between">
                    <div>
                        <a v-bind:href="'https://www.gw2bltc.com/en/item/'+trade.input.item.id" target="_blank">
                            <img v-bind:src="trade.input.item.icon" alt="">
                        </a>
                        {{ trade.input.item.name }}
                    </div>
                    <div>
                        Buy:
                        <Gold :amount="trade.totalBuy - 3" bold="true"></Gold>
                    </div>
                </div>
                <div class="card-body">
                    <table class="table table-stripped">
                        <tbody>
                            <tr v-for="output in trade.output" :key="output.item.id">
                                <td>
                                    {{ Math.round(output.quantity * 100) / 100 }}x
                                </td>
                                <td>
                                    <a v-bind:href="'https://www.gw2bltc.com/en/item/'+output.item.id" target="_blank">
                                        <img v-bind:src="output.item.icon" alt="">
                                    </a>
                                </td>
                                <td>{{ output.item.name }}</td>
                                <td class="text-end">
                                    <Gold :amount="output.price.sells.unit_price"></Gold>
                                </td>
                                <td class="text-end">
                                    <Gold :amount="output.price.sells.unit_price * output.quantity" bold="true"></Gold>
                                </td>
                            </tr>
                            <tr>
                                <td>Bought:</td>
                                <td><strong>{{ trade.input.bltc.bought }}</strong></td>
                                <td colspan="2" class="text-end">Total buy:</td>
                                <td class="text-end">
                                    <Gold :amount="trade.totalBuy" bold="true"></Gold>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="4" class="text-end">Total sell:</td>
                                <td class="text-end">
                                    <Gold :amount="trade.totalSell" bold="true"></Gold>
                                </td>
                            </tr>
                            <tr>
                                <td class="table-secondary">Roi:</td>
                                <td class="text-end table-secondary"><strong>
                                    {{ trade.roi }}%
                                </strong></td>
                                <td class="text-end" colspan="2">Profit:</td>
                                <td class="text-end"><strong>
                                    <Gold :amount="trade.profit"></Gold>
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
import Gold from './Gold.vue';

class SalvageListProps {
    items = prop<Array<SalvageTrade>>({required: true});
}

@Options({
    components: {
        Gold,
    },
})
export default class SalvageList extends Vue.with(SalvageListProps) {

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
