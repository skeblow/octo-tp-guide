<template>
    <div>
        <div class="row">
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

        <table class="table table-stripped">
            <thead>
                <tr>
                    <th>Input</th>
                    <th>Output</th>
                    <th>Input buy</th>
                    <th>Input sell</th>
                    <th>Output sell</th>
                    <th>Diff</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="trade in getItems()" :key="trade.recipe.id"
                    v-bind:class="{'table-danger': getDiff(trade) < 0}"
                >
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
                        <Gold :amount="trade.totalBuy"></Gold>
                    </td>
                    <td>
                        <Gold :amount="getInputSell(trade)"></Gold>
                    </td>
                    <td>
                        <Gold :amount="trade.totalSell"></Gold>
                    </td>
                    <td>
                        <Gold :amount="getDiff(trade)"></Gold>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script lang="ts">
import { Options, Vue, prop } from 'vue-class-component';
import { RecipeTrade } from '../../../shared';
import Gold from './Gold.vue';

class RefineListProps {
    items = prop<Array<RecipeTrade>>({required: true});
}

@Options({
    components: {
        Gold,
    },
})
export default class RefineList extends Vue.with(RefineListProps) {
    search: string = '';

    getInputSell(trade: RecipeTrade): number {
        return trade.input.reduce((total, input) => total + (input.price.sells.unit_price * input.quantity), 0);
    }

    getDiff(trade: RecipeTrade): number {
        return trade.totalSell - this.getInputSell(trade);
    }

    clearSearch(): void {
        this.search = '';
    }

    getItems(): Array<RecipeTrade> {
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
