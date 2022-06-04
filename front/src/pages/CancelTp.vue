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
                </tr>
            </tbody>
        </table>
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

    public mounted(): void {
        const token = TokenService.getToken();

        if (token) {
            TpService.getCancelSells(token)
                .then(res => this.currentSells = res);
        }
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
</style>
