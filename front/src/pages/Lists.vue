<template>
    <div>
        <h1 class="h2">Lists</h1>

        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
                <button
                    type="button"
                    v-on:click="toggleTab('cheap')"
                    class="nav-link"
                    v-bind:class="{ active: isCheapTabActive }"
                    data-bs-toggle="tab" data-bs-target="#home"
                    role="tab"
                >#1</button>
            </li>
            <li class="nav-item" role="presentation">
                <button
                    type="button"
                    v-on:click="toggleTab('expensive')"
                    class="nav-link"
                    v-bind:class="{ active: isExpensiveTabActive }"
                    id="profile-tab"
                    data-bs-toggle="tab" data-bs-target="#profile"
                    role="tab"
                >#2</button>
            </li>
        </ul>
        <div class="tab-content">
            <div 
                class="tab-pane fade" 
                v-bind:class="{ show: isCheapTabActive, active: isCheapTabActive }"
                id="home"
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
                id="profile"
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
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { BasicTrade } from '../../../shared';
import ListService from '../services/ListService';

@Options({})
export default class Lists extends Vue {
    isCheapTabActive = true;
    isExpensiveTabActive = false;
    cheapTrades: Array<BasicTrade> = [];
    expensiveTrades: Array<BasicTrade> = [];

    toggleTab(tab: 'cheap'|'expensive'): void {
        if (tab === 'cheap') {
            this.isCheapTabActive = true;
            this.isExpensiveTabActive = false;
        }

        if (tab === 'expensive') {
            this.isCheapTabActive = false;
            this.isExpensiveTabActive = true;
        }
    }

    formatGold(amount: number): string {
        const copper = amount - Math.round(amount / 100) * 100;
        amount = amount - copper;
        amount = Math.round(amount / 100);

        const silver = amount - Math.round(amount / 100) * 100;
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
    }

    getProfit(trade: BasicTrade): number {
        return Math.round( 0.85 * trade.price.sells.unit_price - trade.price.buys.unit_price );
    }

    getRoi(trade: BasicTrade): number {
        return Math.round(this.getProfit(trade) / trade.price.buys.unit_price * 100);
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
