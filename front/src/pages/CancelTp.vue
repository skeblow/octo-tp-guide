<template>
    <div>
        <h1 class="h2">Cancel tp items</h1>

        <table class="table table-stripped table hover">
            <thead>
                <tr>
                    <th>id</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Created at</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="sell in currentSells" :key="sell.id">
                    <td>{{ sell.itemId }}</td>
                    <td><Gold :amount="sell.price"></Gold></td>
                    <td>{{ sell.quantity }}</td>
                    <td>{{ sell.createdAt }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { ListedItem } from '../../../shared';
import Gold from '../components/Gold.vue';
import ApiService from '../services/ApiService';
import TokenService from '../services/TokenService';

@Options({
    components: {
        Gold,
    },
})
export default class CancelTp extends Vue {
    currentSells: Array<ListedItem> = [];

    public mounted(): void {
        const token = TokenService.getToken();

        if (token) {
            ApiService.getCurrentSells(token)
                .then(res => this.currentSells = res);
        }
    }
}
</script>

<style scoped>

</style>
