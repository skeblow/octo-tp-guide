<template>
    <div>
        <h1 class="h2">
            Cancel current

            <div class="form-check d-inline-flex" @click="setCurrentSells(true)">
                <label class="form-check-label">
                    <input class="form-check-input" type="radio" name="type" checked>
                    sells
                </label>
            </div>

            <div class="form-check d-inline-flex ms-2" @click="setCurrentSells(false)">
                <label class="form-check-label">
                    <input class="form-check-input" type="radio" name="type">
                    buys
                </label>
            </div>
        </h1>

        <table class="table table-stripped table hover">
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Current Price</th>
                    <th>Price diff</th>
                    <th>Created at</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="sell in currentSells" :key="sell.listedItem.id" v-bind:class="{'bg-danger': sell.shouldCancel}">
                    <td>
                        <a v-bind:href="'https://www.gw2bltc.com/en/item/'+sell.item.id" target="_blank">
                            <img v-bind:src="sell.item.icon" alt="">
                        </a>
                    </td>
                    <td>{{ sell.listedItem.quantity }}x</td>
                    <td>{{ sell.item.name }}</td>
                    <td><Gold :amount="sell.listedItem.price"></Gold></td>
                    <td><Gold :amount="sell.itemPrice.sells.unit_price"></Gold></td>
                    <td>{{ sell.diff }}%</td>
                    <td>{{ getCreatedAt(sell) }}</td>
                    <td>{{ getDateDiff(sell) }} days</td>
                    <td><button class="btn btn-secondary" @click="showInfo(sell)">Info</button></td>
                </tr>
            </tbody>
        </table>

        <div class="modal show" tabindex="-1" v-if="currentListedItem">
            <div class="modal-dialog modal-lg modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ currentListedItem.item.name }}</h5>
                        <button type="button" class="btn-close" @click="hideInfo()"></button>
                    </div>
                    <div class="modal-body">
                        <table class="table table-stripped table-hover">
                            <thead>
                                <tr>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr 
                                    v-for="sell in currentListedItem.listing.sells"
                                    v-bind:key="sell.unit_price"
                                    v-bind:class="{'table-info': sell.unit_price === currentListedItem.listedItem.price}"
                                >
                                    <td><Gold :amount="sell.unit_price"></Gold></td>
                                    <td>{{ sell.quantity }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" @click="hideInfo()">OK</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { ListedItemToCancel } from '../../../shared';
import Gold from '../components/Gold.vue';
import TpService from '../services/TpService';
import TokenService from '../services/TokenService';

@Options({
    components: {
        Gold,
    },
})
export default class CancelTp extends Vue {
    isCurrentSells = true;
    currentSells: Array<ListedItemToCancel> = [];
    isInfoShown = false;
    currentListedItem: ListedItemToCancel|null = null;

    public mounted(): void {
        const token = TokenService.getToken();

        if (token) {
            TpService.getCancelSells(token)
                .then(res => this.currentSells = res);
        }
    }

    public showInfo(listedItem: ListedItemToCancel): void {
        this.isInfoShown = true;
        this.currentListedItem = listedItem;
    }

    public hideInfo(): void {
        this.isInfoShown = false;
        this.currentListedItem = null;
    }

    public setCurrentSells(isSells: boolean): void {
        this.isCurrentSells = isSells;
        this.currentSells = [];

        const token = TokenService.getToken();

        if (token) {
            if (isSells) {
                TpService.getCancelSells(token)
                    .then(res => this.currentSells = res);
            } else {
                TpService.getCancelBuys(token)
                    .then(res => this.currentSells = res);
            }
        }
    }

    public getCreatedAt(listedItem: ListedItemToCancel): string {
        return new Date(listedItem.listedItem.createdAt).toLocaleDateString();
    }

    public getDateDiff(listedItem: ListedItemToCancel): number {
        const now = new Date();
        const createdAt = new Date(listedItem.listedItem.createdAt);

        return Math.ceil((createdAt.valueOf() - now.valueOf()) / (1000 * 60 * 60 * 24));
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

    .modal.show {
        display: block;
    }
</style>
