<template>
    <div>
        <h1 class="h2">Cancel tp items</h1>

        <table class="table table-stripped table hover">
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Current Price</th>
                    <th>Diff</th>
                    <th>Created at</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="sell in currentSells" :key="sell.listedItem.id">
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
                    <td>{{ sell.listedItem.createdAt }}</td>
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
