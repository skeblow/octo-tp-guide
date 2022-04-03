<template>
    <div>
        <h1 class="h2">Lists</h1>

        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab">#1</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab">Profile</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab">Contact</button>
            </li>
        </ul>
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="home">
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
                                <tr v-for="trade in trades" :key="trade.item.id">
                                    <td><img v-bind:src="trade.item.icon" alt=""></td>
                                    <td>{{ trade.item.id }}</td>
                                    <td>{{ trade.item.name }}</td>
                                    <td>{{ trade.price.buys.unit_price }}</td>
                                    <td>{{ trade.price.sells.unit_price }}</td>
                                    <td>{{ getProfit(trade) }}</td>
                                    <td>{{ getRoi(trade) }}%</td>
                                    <td>{{ trade.bltc.sold }}</td>
                                    <td>{{ trade.bltc.bought }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="profile">...</div>
            <div class="tab-pane fade" id="contact">...</div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { BasicTrade } from '../../../shared';
import ListService from '../services/ListService';

@Options({})
export default class Lists extends Vue {
    trades: Array<BasicTrade> = [];

    async mounted() {
        this.trades = await ListService.getBasicList();
    }

    getBuyPrice(id: number): number {
        const trade = this.trades.find(trade => trade.item.id === id);

        return trade ? +trade.price.buys.unit_price : 0;
    }

    getSellPrice(id: number): number {
        const trade = this.trades.find(trade => trade.item.id === id);

        return trade ? +trade.price.sells.unit_price : 0;
    }

    getProfit(trade: BasicTrade): number {
        return Math.round( 0.85 * trade.price.sells.unit_price - trade.price.buys.unit_price );
    }

    getRoi(trade: BasicTrade): number {
        return Math.round(this.getProfit(trade) / trade.price.buys.unit_price * 100);
    }

    getSupply(id: number): number {
        const trade = this.trades.find(trade => trade.item.id === id);

        return trade ? +trade.price.sells.quantity : 0;
    }

    getDemand(id: number): number {
        const trade = this.trades.find(trade => trade.item.id === id);

        return trade ? +trade.price.buys.quantity : 0;
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
