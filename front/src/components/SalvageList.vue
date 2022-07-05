<template>
    <div>
        <div class="row mb-1">
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
        <div class="row mb-4">
            <div class="col-6">
                <div class="form-check">
                    <label class="form-check-label">
                        <input class="form-check-input" type="checkbox" @click="toggleIngredients">
                        Show recipe ingredients
                    </label>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-4 mb-4" v-for="trade in getItems()" :key="trade.recipe.id">
                <div class="card" v-bind:class="{'bg-danger': trade.roi < 10, 'text-white': ! isGoodDeal(trade)}">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <div>
                            <a v-bind:href="'https://www.gw2bltc.com/en/item/'+trade.input.item.id" target="_blank">
                                <img v-bind:src="trade.input.item.icon" alt="">
                            </a>
                            {{ trade.input.item.name }}
                        </div>
                        
                        <span v-bind:class="{'badge bg-primary': isListed(trade)}">{{ getListedCount(trade) }} / {{ trade.target }}</span>
                    </div>
                    <div class="card-body">
                        <table class="table table-stripped" v-if="showIngredients">
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
                                    <td><small>{{ output.item.name }}</small></td>
                                    <td class="text-end">
                                        <small><Gold :amount="output.price.sells.unit_price"></Gold></small>
                                    </td>
                                    <td class="text-end">
                                        <Gold :amount="output.price.sells.unit_price * output.quantity" bold="true"></Gold>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <table class="table table-stripped">
                            <tbody>
                                <tr>
                                    <td>Cost:</td>
                                    <td><strong>{{ trade.recipe.cost }}</strong></td>
                                    <td class="text-end">Buy:</td>
                                    <td class="text-end">
                                        <Gold :amount="trade.totalBuy - 3" bold="true"></Gold>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Bought:</td>
                                    <td><strong>{{ trade.input.bltc.bought }}</strong></td>
                                    <td class="text-end">Sell:</td>
                                    <td class="text-end">
                                        <Gold :amount="trade.totalSell" bold="true"></Gold>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="table-secondary">Roi:</td>
                                    <td class="text-end table-secondary"><strong>
                                        {{ trade.roi }}%
                                    </strong></td>
                                    <td class="text-end">Pro:</td>
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
    </div>
</template>

<script lang="ts">
import { Options, Vue, prop } from 'vue-class-component';
import { ListedItem, RecipeTrade, SalvageTrade } from '../../../shared';
import Gold from './Gold.vue';

class SalvageListProps {
    items = prop<Array<SalvageTrade>>({required: true});
    currentBuys = prop<Array<ListedItem>>({required: true});
}

@Options({
    components: {
        Gold,
    },
})
export default class SalvageList extends Vue.with(SalvageListProps) {
    search: string = '';
    showIngredients = false;

    public isGoodDeal(trade: SalvageTrade): boolean {
        return trade.roi > 5;
    }

    public clearSearch(): void {
        this.search = '';
    }

    public getItems(): Array<SalvageTrade> {
        return this.items
            .filter(
                item => (item.input.item.name + item.output.map(output => output.item.name).join(' '))
                .toLowerCase()
                .includes(this.search),
            );
    }

    public isListed(trade: RecipeTrade): boolean {
        return this.currentBuys.find((item: ListedItem) => item.itemId === trade.id) !== undefined;
    }

    public getListedCount(trade: RecipeTrade): number {
        let count = 0;

        for (const item of this.currentBuys) {
            if (trade.id === item.itemId) {
                count += item.quantity;
            }
        }

        return count;
    }

    public toggleIngredients(): void {
        this.showIngredients = ! this.showIngredients;
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
