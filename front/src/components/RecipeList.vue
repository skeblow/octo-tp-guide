<template>
    <div>
        <div class="row mb-4">
            <div class="col-6">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Search..." v-model="search">
                    <button 
                        class="btn btn-outline-secondary" 
                        type="button"
                        @click="clearSearch"
                    >X</button>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-4 mb-4" v-for="trade in getItems()" :key="trade.recipe.id">
                <div class="card" v-bind:class="{'bg-danger': trade.roi < 10, 'text-white': trade.roi < 10}">
                    <div class="card-header">
                        {{ trade.output.quantity }}x
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
                                    <td class="text-end">
                                        <Gold :amount="input.price.buys.unit_price"></Gold>
                                    </td>
                                    <td class="text-end">
                                        <Gold :amount="input.price.buys.unit_price * input.quantity" bold="true"></Gold>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="4" class="text-end">Total buy:</td>
                                    <td class="text-end">
                                        <Gold :amount="trade.totalBuy" bold="true"></Gold>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="4" class="text-end">Raw sell:</td>
                                    <td class="text-end">
                                        <Gold :amount="getRawSell(trade)" bold="true"></Gold>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Sold:</td>
                                    <td><strong>{{ trade.output.bltc.sold }}</strong></td>
                                    <td colspan="2" class="text-end">Total sell:</td>
                                    <td class="text-end">
                                        <Gold :amount="trade.totalSell" bold="true"></Gold>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="4" class="text-end">Profit:</td>
                                    <td class="text-end">
                                        <Gold :amount="trade.profit" bold="true"></Gold>
                                    </td>
                                </tr>
                                <tr class="table-secondary">
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
    </div>
</template>
<script lang="ts">
import { Options, Vue, prop } from 'vue-class-component';
import { RecipeTrade } from '../../../shared';
import Gold from './Gold.vue';

class RecipeListProps {
    items = prop<Array<RecipeTrade>>({required: true});
}

@Options({
    components: {
        Gold,
    },
})
export default class RecipeList extends Vue.with(RecipeListProps) {
    search: string = '';

    public getRawSell(trade: RecipeTrade): number {
        return trade.input.reduce((total, input) => total + (input.price.sells.unit_price * input.quantity), 0);
    }

    public clearSearch(): void {
        this.search = '';
    }

    public getItems(): Array<RecipeTrade> {
        return this.items
            .filter(item => item.input.map(input => input.item.name)
                    .concat([item.output.item.name])
                    .join(' ')
                    .toLowerCase()
                    .includes(this.search),
            );
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
