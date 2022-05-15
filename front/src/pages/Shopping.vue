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
import { Item } from '../../../shared';
import ItemService from '../services/ItemService';

@Options({})
export default class Shopping extends Vue {
    items: Array<Item> = [];
    bankMaterials: Array<{id: number, count: number}> = [];

    mounted(): void {
        const token = TokenService.getToken();

        if (token) {
            ApiService.getBankMaterials(token)
                .then(items => this.bankMaterials = items);
        }

        ItemService.getItemsByIds([
            19701, // Orichalcum Ore
            19685, // Orichalcum Ingot
            19725, // Ancient Wood Log
            19712, // Ancient Wood Plank
            76491, // Black Diamond
            75654, // Ebony Orb
            76179, // Freshwater Pearl
            19721, // Glob of Ectoplasm
        ]).then(items => this.items = items);
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
        const requested = [
            // Orichalcum Ingot
            {id: 19685, count: 500},
            // 19712 Ancient Wood Plank
            {id: 19712, count: 500},
            // 76491 Black Diamond
            {id: 76491, count: 50},
            // 75654 Ebony Orb
            {id: 75654, count: 250},
            // 76179 Freshwater Pearl
            {id: 76179, count: 50},
            // 19721	Glob of Ectoplasm
            {id: 19721, count: 250},
        ];

        for (const request of requested) {
            if (request.id === item.id) {
                return request.count;
            }
        }

        return 0;
    }

    public getMissing(item: Item): number {
        return this.getRequestedCount(item) - this.getCountInBank(item);
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
