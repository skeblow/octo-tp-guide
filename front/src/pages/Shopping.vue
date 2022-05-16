<template>
    <div>
        <h1 class="h2">Shopping list</h1>

        <table class="table table-striped">
            <thead>
                <tr>
                    <th></th>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Count in bank</th>
                    <th>Requested count</th>
                    <th>Missing</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in getItems()" :key="item.id">
                    <td>
                        <a v-bind:href="'https://www.gw2bltc.com/en/item/'+item.id" target="_blank">
                            <img v-bind:src="item.icon">
                        </a>
                    </td>
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ getCountInBank(item) }}</td>
                    <td>{{ getRequestedCount(item) }}</td>
                    <td>{{ getMissing(item) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import TokenService from '../services/TokenService';
import ApiService from '../services/ApiService';
import { BankItem, Item } from '../../../shared';
import ItemService from '../services/ItemService';

@Options({})
export default class Shopping extends Vue {
    items: Array<Item> = [];
    bankMaterials: Array<BankItem> = [];

    private getRequestedItems(): Array<BankItem> {
        return [
            // Orichalcum Ingot
            {id: 19685, count: 500},
            // 19712 Ancient Wood Plank
            {id: 19712, count: 500},
            // 76491 Black Diamond
            {id: 76491, count: 50},
            // 75654 Ebony Orb
            {id: 75654, count: 300},
            // 76179 Freshwater Pearl
            {id: 76179, count: 50},
            // 19721	Glob of Ectoplasm
            {id: 19721, count: 500},
            // 19737, hardened leather square
            {id: 19737, count: 300},
            // 73034	Vial of Linseed Oil
            {id: 73034, count: 100},
            // 70957-Maguuma-Lily
            {id: 70957, count: 50},
        ];
    }

    mounted(): void {
        const token = TokenService.getToken();

        if (token) {
            ApiService.getBankMaterials(token)
                .then(items => this.bankMaterials = items);
        }

        ItemService.getItemsByIds(this.getRequestedItems().map(item => item.id))
            .then(items => this.items = items);
    }

    public getItems(): Array<Item> {
        return this.items;
    }

    public getCountInBank(item: Item): number {
        for (const bankItem of this.bankMaterials) {
            if (bankItem.id === item.id) {
                return bankItem.count;
            }
        }

        return 0;
    }

    public getRequestedCount(item: Item): number {
        for (const requested of this.getRequestedItems()) {
            if (requested.id === item.id) {
                return requested.count;
            }
        }

        return 0;
    }

    public getMissing(item: Item): number {
        return Math.max(this.getRequestedCount(item) - this.getCountInBank(item), 0);
    }
}
</script>

<style scoped>
    img {
        width: 30px;
        height: 30px;
    }

    a {
        margin: 5px;
    }
</style>
