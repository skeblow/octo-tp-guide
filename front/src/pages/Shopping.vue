<template>
    <div>
        <h1 class="h2">Shopping list</h1>

        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th></th>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Count in bank</th>
                    <th>Requested count</th>
                    <th>Ordered</th>
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
                    <td>{{ getBuyCount(item) }}</td>
                    <td>{{ Math.max(getMissing(item) - getBuyCount(item), 0) }} / {{ getMissing(item) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import TokenService from '../services/TokenService';
import ApiService from '../services/ApiService';
import { BankItem, Item, ListedItem } from '../../../shared';
import ItemService from '../services/ItemService';
import TpService from '../services/TpService';

@Options({})
export default class Shopping extends Vue {
    items: Array<Item> = [];
    bankMaterials: Array<BankItem> = [];
    currentBuys: Array<ListedItem> = [];

    private getRequestedItems(): Array<BankItem> {
        return [
            // orichalcum ore
            {id: 19701, count: 0},
            // Orichalcum Ingot
            {id: 19685, count: 1500},

            // ancient wood log
            { id: 19725, count: 0 },
            // 19712 Ancient Wood Plank

            {id: 19712, count: 750},
            // 76491 Black Diamond
            {id: 76491, count: 150},

            // 75654 Ebony Orb
            {id: 75654, count: 300},

            // 76179 Freshwater Pearl
            {id: 76179, count: 150},

            // 19721 Glob of Ectoplasm
            {id: 19721, count: 500},

            // hardened leather section
            { id: 19732, count: 0 },
            // 19737, hardened leather square
            {id: 19737, count: 300},

            // 74090-Pile-of-Flax-Seeds
            {id: 74090, count: 0},
            // 73034 Vial of Linseed Oil
            {id: 73034, count: 250},

            // // 24295 Vial of Powerful Blood
            // {id: 24295, count: 150},

            // 24276-Pile-of-Incandescent-Dust
            { id: 24276, count: 3000 },
            // // 24474-Ruby-Crystal
            // { id: 24474, count: 2000 },
            // // 24475-Sapphire-Crystal
            // { id: 24475, count: 2000 },
            // 24350-Large-Claw
            { id: 24350, count: 2500 },
            // 24299-Intricate-Totem
            { id: 24299, count: 2500 },

            // 12142 Onion
            {id: 12142, count: 1000},
            // 12134	Carrot
            {id: 12134, count: 1000},
            // 24359	Slab of Red Meat
            {id: 24359, count: 1000},
            // 12545	Orrian Truffle
            {id: 12545, count: 500},
            // 12254	Raspberry
            {id: 12254, count: 2000},
            // 82866	Handful of Red Lentils
            {id: 82866, count: 1000},
            // 12243	Sage Leaf
            {id: 12243, count: 500},
            // 12248	Thyme Leaf
            {id: 12248, count: 500},
        ];
    }

    public mounted(): void {
        const token = TokenService.getToken();

        if (token) {
            ApiService.getBankMaterials(token)
                .then(items => this.bankMaterials = items);

            TpService.getCurrentBuys(token)
                .then(res => this.currentBuys = res);
        }

        const requestedItemIds = this.getRequestedItems().map(item => item.id);

        ItemService.getItemsByIds(requestedItemIds)
            .then(items => items.sort((item1: Item, item2: Item) => requestedItemIds.findIndex(id => id === item1.id) - requestedItemIds.findIndex(id => id === item2.id)))
            .then(items => this.items = items);
    }

    public getItems(): Array<Item> {
        return this.items;
    }

    public getCountInBank(item: Item): number {
        let count = 0;

        for (const bankItem of this.bankMaterials) {
            if (bankItem.id === item.id) {
                count += bankItem.count;
            }
        }

        return count;
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

    public getBuyCount(item: Item): number {
        let count = 0

        for (const buy of this.currentBuys) {
            if (item.id === buy.itemId) {
                count += buy.quantity;
            }
        }

        return count;
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
