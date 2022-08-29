<template>
    <div>
        <h1 class="h2">Shopping list</h1>

        <div class="form-check d-inline-flex" @click="setCurrentList(1)">
            <label class="form-check-label">
                <input class="form-check-input" type="radio" name="type" checked>
                me
            </label>
        </div>

        <div class="form-check d-inline-flex ms-2" @click="setCurrentList(2)">
            <label class="form-check-label">
                <input class="form-check-input" type="radio" name="type">
                duck
            </label>
        </div>

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
    currentList: number = 1;

    private getRequestedItems(): Array<BankItem> {
        const lists: any = {};

        lists[1] = [
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
            {id: 19737, count: 600},

            // 74090-Pile-of-Flax-Seeds
            {id: 74090, count: 0},
            // 73034 Vial of Linseed Oil
            {id: 73034, count: 250},

            // 24276-Pile-of-Incandescent-Dust
            { id: 24276, count: 3500 },

            // 24350-Large-Claw
            { id: 24350, count: 2500 },
            // 24299-Intricate-Totem
            { id: 24299, count: 2500 },

            // 24295 Vial of Powerful Blood
            {id: 24295, count: 0},
            // 24773	Platinum Doubloon
            { id: 24773, count: 0 },
             // 43773-Quartz-Crystal
            { id: 43773, count: 0 },
            // 66670	Lump of Raw Ambrite
            { id: 66670, count: 0 }
        ];

        lists[2] = [
            // orichalcum ore
            {id: 19701, count: 0},
            // Orichalcum Ingot
            {id: 19685, count: 750},

            // ancient wood log
            { id: 19725, count: 0 },
            // 19712 Ancient Wood Plank

            {id: 19712, count: 750},
            // 76491 Black Diamond
            {id: 76491, count: 100},

            // 75654 Ebony Orb
            {id: 75654, count: 300},

            // 76179 Freshwater Pearl
            {id: 76179, count: 50},

            // 19721 Glob of Ectoplasm
            {id: 19721, count: 500},

            // hardened leather section
            { id: 19732, count: 0 },
            // 19737, hardened leather square
            {id: 19737, count: 200},

            // 74090-Pile-of-Flax-Seeds
            {id: 74090, count: 0},
            // 73034 Vial of Linseed Oil
            {id: 73034, count: 100},

            // 24295 Vial of Powerful Blood
            {id: 24295, count: 250},

            // 24773	Platinum Doubloon
            { id: 24773, count: 250 },

            // 43773-Quartz-Crystal
            { id: 43773, count: 1500 },

            // 24276-Pile-of-Incandescent-Dust
            { id: 24276, count: 1000 },

            // 66670	Lump of Raw Ambrite
            { id: 66670, count: 3500 }
        ];

        return lists[this.currentList];
    }

    public setCurrentList(currentList: number): void {
        this.currentList = currentList;
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
        let count = 0;

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
