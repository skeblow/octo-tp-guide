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
            <li class="nav-item" role="presentation">
                <button
                    type="button"
                    v-on:click="toggleTab('expensive')"
                    class="nav-link"
                    v-bind:class="{ active: isExpensiveTabActive }"
                >#2</button>
            </li>
            <li class="nav-item" role="presentation">
                <button
                    type="button"
                    v-on:click="toggleTab('refine')"
                    class="nav-link"
                    v-bind:class="{ active: isRefineTabActive }"
                >#3</button>
            </li>
        </ul>
        <div class="tab-content">
            <div 
                class="tab-pane fade" 
                v-bind:class="{ show: isCheapTabActive, active: isCheapTabActive }"
            >
                <div class="card">
                    <div class="card-body">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Buy price</th>
                                    <th>Sell price</th>
                                    <th>Profit</th>
                                    <th>ROI</th>
                                    <th>Sold</th>
                                    <th>Bought</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="trade in cheapTrades" :key="trade.item.id">
                                    <td><img v-bind:src="trade.item.icon" alt=""></td>
                                    <td>{{ trade.item.id }}</td>
                                    <td>{{ trade.item.name }}</td>
                                    <td>{{ formatGold(trade.price.buys.unit_price) }}</td>
                                    <td>{{ formatGold(trade.price.sells.unit_price) }}</td>
                                    <td>{{ formatGold(getProfit(trade)) }}</td>
                                    <td>{{ getRoi(trade) }}%</td>
                                    <td>{{ trade.bltc.sold }}</td>
                                    <td>{{ trade.bltc.bought }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div 
                class="tab-pane fade"
                v-bind:class="{ show: isExpensiveTabActive, active: isExpensiveTabActive }"
            >
                <div class="card">
                    <div class="card-body">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Buy price</th>
                                    <th>Sell price</th>
                                    <th>Profit</th>
                                    <th>ROI</th>
                                    <th>Sold</th>
                                    <th>Bought</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="trade in expensiveTrades" :key="trade.item.id">
                                    <td><img v-bind:src="trade.item.icon" alt=""></td>
                                    <td>{{ trade.item.id }}</td>
                                    <td>{{ trade.item.name }}</td>
                                    <td>{{ formatGold(trade.price.buys.unit_price) }}</td>
                                    <td>{{ formatGold(trade.price.sells.unit_price) }}</td>
                                    <td>{{ formatGold(getProfit(trade)) }}</td>
                                    <td>{{ getRoi(trade) }}%</td>
                                    <td>{{ trade.bltc.sold }}</td>
                                    <td>{{ trade.bltc.bought }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div 
                class="tab-pane fade"
                v-bind:class="{ show: isRefineTabActive, active: isRefineTabActive }"
            >
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-4 mb-4" v-for="trade in refineTrades" :key="trade.recipe.id">
                                <div class="card">
                                    <div class="card-header">
                                        <img v-bind:src="trade.output.item.icon" alt="">
                                        {{ trade.output.item.name }}
                                    </div>
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-8">
                                                <table class="table table-stripped">
                                                    <tbody>
                                                        <tr v-for="input in trade.input" :key="input.item.id">
                                                            <td>
                                                                {{ input.quantity }}x
                                                            </td>
                                                            <td>
                                                                 <img v-bind:src="input.item.item.icon" alt="">
                                                            </td>
                                                            <td>{{ input.item.item.name }}</td>
                                                            <td>{{ formatGold(input.item.price.buys.unit_price) }}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div class="col-4">
                                                <table class="table table-stripped">
                                                    <tbody>
                                                        <tr>
                                                            <th>Buy</th>
                                                            <td>{{ formatGold(getRecipeBuy(trade)) }}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Sell</th>
                                                            <td>{{ formatGold(trade.output.price.sells.unit_price) }}</td>
                                                        </tr>
                                                          <tr>
                                                            <th>ROI</th>
                                                            <td>{{ getRecipeRoi(trade) }} %</td>
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
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { BasicTrade, RefineTrade } from '../../../shared';
import ListService from '../services/ListService';

@Options({})
export default class Lists extends Vue {
    isCheapTabActive = true;
    isExpensiveTabActive = false;
    isRefineTabActive = false;
    cheapTrades: Array<BasicTrade> = [];
    expensiveTrades: Array<BasicTrade> = [];
    refineTrades: Array<RefineTrade> = [];

    toggleTab(tab: 'cheap'|'expensive'|'refine'): void {
        this.isCheapTabActive = tab === 'cheap';
        this.isExpensiveTabActive = tab === 'expensive';
        this.isRefineTabActive = tab === 'refine';
    }

    formatGold(amount: number): string {
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
    }

    getProfit(trade: BasicTrade): number {
        return Math.round( 0.85 * trade.price.sells.unit_price - trade.price.buys.unit_price );
    }

    getRoi(trade: BasicTrade): number {
        return Math.round( this.getProfit(trade) / trade.price.buys.unit_price * 100 );
    }

    getRecipeBuy(trade: RefineTrade): number {
        return trade.input.reduce((total, item) => total + item.item.price.buys.unit_price * item.quantity, 0);
    }

    getRecipeRoi(trade: RefineTrade): number {
        const sellPrice = trade.output.price.sells.unit_price;
        const buyPrice = this.getRecipeBuy(trade);
        const profit = Math.round( 0.85 * sellPrice - buyPrice );
    
        return Math.round( profit / buyPrice * 100 );
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
