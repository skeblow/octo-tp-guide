<template>
    <div>
        <h1 class="h2">Lists</h1>

        <ul class="nav nav-tabs">
            <li class="nav-item">
                <button
                    type="button"
                    v-on:click="toggleTab('cheap')"
                    class="nav-link"
                    v-bind:class="{ active: isCheapTabActive }"
                >#1</button>
            </li>
            <li class="nav-item">
                <button
                    type="button"
                    v-on:click="toggleTab('expensive')"
                    class="nav-link"
                    v-bind:class="{ active: isExpensiveTabActive }"
                >#2</button>
            </li>
            <li class="nav-item">
                <button
                    type="button"
                    v-on:click="toggleTab('refine')"
                    class="nav-link"
                    v-bind:class="{ active: isRefineTabActive }"
                >#3</button>
            </li>
            <li class="nav-item">
                <button
                    type="button"
                    v-on:click="toggleTab('salvage')"
                    class="nav-link"
                    v-bind:class="{ active: isSalvageTabActive }"
                >#4</button>
            </li>
            <li class="nav-item">
                <button
                    type="button"
                    v-on:click="toggleTab('cooking')"
                    class="nav-link"
                    v-bind:class="{ active: isCookingTabActive }"
                >#5</button>
            </li>
        </ul>
        <div class="tab-content">
            <div 
                class="tab-pane fade" 
                v-bind:class="{ show: isCheapTabActive, active: isCheapTabActive }"
            >
                <div class="card">
                    <div class="card-body">
                        <BasicList :items="cheapTrades"></BasicList>
                    </div>
                </div>
            </div>
            <div 
                class="tab-pane fade"
                v-bind:class="{ show: isExpensiveTabActive, active: isExpensiveTabActive }"
            >
                <div class="card">
                    <div class="card-body">
                        <BasicList :items="expensiveTrades"></BasicList>
                    </div>
                </div>
            </div>
            <div 
                class="tab-pane fade"
                v-bind:class="{ show: isRefineTabActive, active: isRefineTabActive }"
            >
                <div class="card">
                    <div class="card-body">
                        <RefineList :items="refineTrades"></RefineList>
                    </div>
                </div>
            </div>
            <div 
                class="tab-pane fade"
                v-bind:class="{ show: isSalvageTabActive, active: isSalvageTabActive }"
            >
                 <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-4 mb-4" v-for="trade in salvageTrades" :key="trade.recipe.id">
                                <div class="card">
                                    <div class="card-header">
                                        <div class="row">
                                            <div class="col-8">
                                                 <img v-bind:src="trade.input.item.icon" alt="">
                                                {{ trade.input.item.name }}
                                            </div>
                                            <div class="col-4 text-end">
                                                <strong>Buy</strong>
                                                {{ formatGold(trade.input.price.buys.unit_price) }}
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
                                                    <td>{{ formatGold(output.price.sells.unit_price) }}</td>
                                                    <td>
                                                        <strong>
                                                            {{ formatGold(Math.round(output.price.sells.unit_price * output.quantity)) }}
                                                        </strong>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="4" class="text-end">Total sell:</td>
                                                    <td><strong>
                                                        {{ formatGold(Math.round(getSalvageSell(trade))) }}
                                                    </strong></td>
                                                </tr>
                                                <tr>
                                                    <td colspan="4" class="text-end">Profit:</td>
                                                    <td><strong>
                                                        {{ formatGold(getSalvageProfit(trade)) }}
                                                    </strong></td>
                                                </tr>
                                                <tr>
                                                    <td colspan="4" class="text-end">Roi:</td>
                                                    <td><strong>
                                                        {{ getSalvageRoi(trade) }}%
                                                    </strong></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                 </div>
            </div>
            <div 
                class="tab-pane fade"
                v-bind:class="{ show: isCookingTabActive, active: isCookingTabActive }"
            >
                 <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-4 mb-4" v-for="trade in cookingTrades" :key="trade.recipe.id">
                                <div class="card">
                                    <div class="card-header">
                                        <div class="row">
                                            <div class="col-8">
                                                <img v-bind:src="trade.output.item.icon" alt="">
                                                {{ trade.output.item.name }}
                                            </div>
                                            <div class="col-4 text-end">
                                                <strong>Sell</strong>
                                                {{ formatGold(trade.output.price.buys.unit_price * trade.output.quantity) }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <table class="table table-stripped">
                                            <tbody>
                                                 <tr v-for="input in trade.input" :key="input.item.id">
                                                    <td>
                                                        {{ input.quantity }}x
                                                    </td>
                                                    <td>
                                                        <img v-bind:src="input.item.icon" alt="">
                                                    </td>
                                                    <td>{{ input.item.name }}</td>
                                                    <td>{{ formatGold(input.price?.sells?.unit_price) }}</td>
                                                    <td>
                                                        <strong>
                                                            {{ formatGold(Math.round(input.price?.sells?.unit_price * input.quantity)) }}
                                                        </strong>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="4" class="text-end">Total buy:</td>
                                                    <td><strong>
                                                        {{ formatGold(getRecipeBuy(trade)) }}
                                                    </strong></td>
                                                </tr>
                                                <tr>
                                                    <td colspan="4" class="text-end">Profit:</td>
                                                    <td><strong>
                                                      
                                                    </strong></td>
                                                </tr>
                                                <tr>
                                                    <td colspan="4" class="text-end">Roi:</td>
                                                    <td><strong>
                                                        %
                                                    </strong></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                 </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { BasicTrade, RecipeTrade, RefineTrade, SalvageTrade } from '../../../shared';
import BasicList from '../components/BasicList.vue';
import RefineList from '../components/RefineList.vue';
import ListService from '../services/ListService';

@Options({
    components: {
        BasicList,
        RefineList,
    },
})
export default class Lists extends Vue {
    isCheapTabActive = true;
    isExpensiveTabActive = false;
    isRefineTabActive = false;
    isSalvageTabActive = false;
    isCookingTabActive = false;
    cheapTrades: Array<BasicTrade> = [];
    expensiveTrades: Array<BasicTrade> = [];
    refineTrades: Array<RefineTrade> = [];
    salvageTrades: Array<SalvageTrade> = [];
    cookingTrades: Array<RecipeTrade> = [];

    toggleTab(tab: string): void {
        this.isCheapTabActive = tab === 'cheap';
        this.isExpensiveTabActive = tab === 'expensive';
        this.isRefineTabActive = tab === 'refine';
        this.isSalvageTabActive = tab === 'salvage';
        this.isCookingTabActive = tab === 'cooking';
    }

    formatGold(amount: number): string {
        if (amount === 0) {
            return '0';
        }

        if (amount < 0) {
            return amount+'c';
        }

        const copper = amount - Math.floor(amount / 100) * 100;
        amount = amount - copper;
        amount = Math.round(amount / 100);

        const silver = amount - Math.floor(amount / 100) * 100;
        amount = amount - silver;
        amount = Math.round(amount / 100);

        const gold = amount;

        let result = [];

        if (gold > 0) {
            result.push(gold + 'g');
        }

        if (silver > 0) {
            result.push(silver + 's');
        }

         if (copper > 0) {
            result.push(copper + 'c');
        }

        return result.join(' ');
    }

    async mounted() {
        this.cheapTrades = await ListService.getCheapBasicList();
        this.expensiveTrades = await ListService.getExpensiveBasicList();
        this.refineTrades = await ListService.getRefineList();
        this.salvageTrades = await ListService.getSalvageList();
        this.cookingTrades = await ListService.getCookingList();
    }

    getProfit(trade: BasicTrade): number {
        return Math.round( 0.85 * trade.price.sells.unit_price - trade.price.buys.unit_price );
    }

    getRoi(trade: BasicTrade): number {
        return Math.round( this.getProfit(trade) / trade.price.buys.unit_price * 100 );
    }

    getRefineBuy(trade: RefineTrade): number {
        return trade.input.reduce((total, item) => total + item.price.buys.unit_price * item.quantity, 0);
    }

    getRefineProfit(trade: RefineTrade): number {
        const sellPrice = trade.output.price.sells.unit_price;
        const buyPrice = this.getRefineBuy(trade);

        return Math.round( 0.85 * sellPrice - buyPrice );
    }

    getRefineRoi(trade: RefineTrade): number {
        const buyPrice = this.getRefineBuy(trade);
        const profit = this.getRefineProfit(trade);
    
        return Math.round( profit / buyPrice * 100 );
    }

    getSalvageSell(trade: SalvageTrade): number {
        return trade.output.reduce((total, item) => total + item.price.sells.unit_price * item.quantity, 0);
    }

    getSalvageProfit(trade: SalvageTrade): number {
        const sellPrice = this.getSalvageSell(trade);
        const buyPrice = trade.input.price.buys.unit_price + trade.recipe.cost;
        
        return Math.round( 0.85 * sellPrice - buyPrice );
    }

    getSalvageRoi(trade: SalvageTrade): number {
        const buyPrice = trade.input.price.buys.unit_price + trade.recipe.cost;
        const profit = this.getSalvageProfit(trade);

        return Math.round( profit / buyPrice * 100 );
    }

    getRecipeBuy(trade: RecipeTrade): number {
        return trade.input.reduce((total, item) => total + item.price?.buys?.unit_price * item.quantity, 0);
    }

    getRecipeProfit(trade: RecipeTrade): number {
        const sellPrice = trade.output.price.sells.unit_price * trade.output.quantity;

        return Math.round( 0.85 * sellPrice - this.getRecipeBuy(trade) );
    }
}
</script>

<style scoped>
    img {
        width: 30px;
        height: 30px;
    }

    .tab-pane > .card {
        border-top: 0px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }
</style>
