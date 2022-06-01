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
                <div class="card" v-bind:class="{'bg-danger text-white': trade.roi < 20}">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <div>
                            {{ trade.output.quantity }}x
                            <a v-bind:href="'https://www.gw2bltc.com/en/item/'+trade.output.item.id" target="_blank">
                                <img v-bind:src="trade.output.item.icon" alt="">
                            </a>
                            {{ trade.output.item.name }}
                            <small>(Sell)</small>
                        </div>

                        <span class="badge bg-success" v-if="isListed(trade)">{{ getListedCount(trade) }}</span>
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
                                    <td><small>{{ input.item.name }}</small></td>
                                    <td class="text-end">
                                        <small><Gold :amount="input.price.buys.unit_price"></Gold></small>
                                    </td>
                                    <td class="text-end">
                                        <Gold :amount="input.price.buys.unit_price * input.quantity" bold="true"></Gold>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <table class="table table-stripped">
                            <tbody>
                                <tr>
                                    <td>Cost:</td>
                                    <td class="text-start"><Gold :amount="trade.recipe.cost"></Gold></td>
                                    <td class="text-end">Buy:</td>
                                    <td class="text-end">
                                        <Gold :amount="trade.totalBuy" bold="true"></Gold>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Sold:</td>
                                    <td class="text-start"><strong>{{ trade.output.bltc.sold }}</strong></td>
                                    <td class="text-end">Sell:</td>
                                    <td class="text-end">
                                        <Gold :amount="trade.totalSell" bold="true"></Gold>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="table-secondary">Roi:</td>
                                    <td class="text-start table-secondary"><strong>{{ trade.roi }}%</strong></td>
                                    <td class="text-end">Pro:</td>
                                    <td class="text-end">
                                        <Gold :amount="trade.profit" bold="true"></Gold>
                                    </td>
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
import { ListedItem, RecipeTrade } from '../../../shared';
import Gold from './Gold.vue';

class RecipeListProps {
    items = prop<Array<RecipeTrade>>({required: true});
    activeListedItems = prop<Array<ListedItem>>({required: true});
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

    public isListed(trade: RecipeTrade): boolean {
        return this.activeListedItems.find((item: ListedItem) => item.itemId === trade.id) !== undefined;
    }

    public getListedCount(trade: RecipeTrade): number {
        let count = 0

        for (const item of this.activeListedItems) {
            if (trade.id === item.itemId) {
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

    tr:last-child td {
        border-bottom: none;
    }

    .card-body {
        padding: 0.75rem;
    }

    table tr td {
        padding: 0.4rem;
    }
</style>
