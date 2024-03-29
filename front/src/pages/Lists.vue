<template>
    <div>
        <h1 class="h2">Lists</h1>

        <div class="alert alert-info" v-if="currentSells.length === 0">
            Loading current sells
        </div>

        <div class="alert alert-info" v-if="currentBuys.length === 0">
            Loading current buys
        </div>

        <ul class="nav nav-tabs">
            <li class="nav-item">
                <button
                    type="button"
                    v-on:click="toggleTab('cheap')"
                    class="nav-link"
                    v-bind:class="{ active: activeTab === 'cheap' }"
                >cheap</button>
            </li>
            <li class="nav-item">
                <button
                    type="button"
                    v-on:click="toggleTab('expensive')"
                    class="nav-link"
                    v-bind:class="{ active: activeTab === 'expensive' }"
                >expensive</button>
            </li>
            <li class="nav-item">
                <button
                    type="button"
                    v-on:click="toggleTab('refine')"
                    class="nav-link"
                    v-bind:class="{ active: activeTab === 'refine' }"
                >refine</button>
            </li>
            <li class="nav-item">
                <button
                    type="button"
                    v-on:click="toggleTab('salvage')"
                    class="nav-link"
                    v-bind:class="{ active: activeTab === 'salvage' }"
                >salvage</button>
            </li>
            <li class="nav-item">
                <button
                    type="button"
                    v-on:click="toggleTab('open')"
                    class="nav-link"
                    v-bind:class="{ active: activeTab === 'open' }"
                >open</button>
            </li>
            <li class="nav-item">
                <button
                    type="button"
                    v-on:click="toggleTab('artificier')"
                    class="nav-link"
                    v-bind:class="{ active: activeTab === 'artificier' }"
                >artificier</button>
            </li>
            <li class="nav-item">
                <button
                    type="button"
                    v-on:click="toggleTab('tailor')"
                    class="nav-link"
                    v-bind:class="{ active: activeTab === 'tailor' }"
                >tailor</button>
            </li>
            <li class="nav-item">
                <button
                    type="button"
                    v-on:click="toggleTab('armorsmith')"
                    class="nav-link"
                    v-bind:class="{ active: activeTab === 'armorsmith' }"
                >armor</button>
            </li>
            <li class="nav-item">
                <button
                    type="button"
                    v-on:click="toggleTab('jewelcrafting')"
                    class="nav-link"
                    v-bind:class="{ active: activeTab === 'jewelcrafting' }"
                >jwc</button>
            </li>
            <li class="nav-item">
                <button
                    type="button"
                    v-on:click="toggleTab('cooking')"
                    class="nav-link"
                    v-bind:class="{ active: activeTab === 'cooking' }"
                >food</button>
            </li>
            <li class="nav-item">
                <button
                    type="button"
                    v-on:click="toggleTab('weaponsmith')"
                    class="nav-link"
                    v-bind:class="{ active: activeTab === 'weaponsmith' }"
                >weapon</button>
            </li>
            <li class="nav-item">
                <button
                    type="button"
                    v-on:click="toggleTab('huntsman')"
                    class="nav-link"
                    v-bind:class="{ active: activeTab === 'huntsman' }"
                >hunt</button>
            </li>
            <li class="nav-item">
                <button
                    type="button"
                    v-on:click="toggleTab('leatherworker')"
                    class="nav-link"
                    v-bind:class="{ active: activeTab === 'leatherworker' }"
                >lw</button>
            </li>
        </ul>

        <div class="tab-content">
            <div class="tab-pane fade show active">
                <div class="card">
                    <div class="card-body">
                        <BasicList v-if="isBasicListActive()" :items="trades" :currentBuys="currentBuys"></BasicList>
                        <RefineList v-if="isRefineListActive()" :items="trades"></RefineList>
                        <SalvageList v-if="isSalvageListActive()" :items="trades" :currentBuys="currentBuys"></SalvageList>
                        <RecipeList v-if="isRecipeListActive()" :items="trades" :currentSells="currentSells"></RecipeList>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { BasicTrade, ListedItem, RecipeTrade, SalvageTrade } from '../../../shared';
import BasicList from '../components/BasicList.vue';
import RecipeList from '../components/RecipeList.vue';
import RefineList from '../components/RefineList.vue';
import SalvageList from '../components/SalvageList.vue';
import ListService from '../services/ListService';
import TokenService from '../services/TokenService';
import TpService from '../services/TpService';

@Options({
    components: {
        BasicList,
        RefineList,
        RecipeList,
        SalvageList,
    },
})
export default class Lists extends Vue {
    currentSells: Array<ListedItem> = [];
    currentBuys: Array<ListedItem> = [];
    activeTab: string = 'cheap';
    trades: Array<BasicTrade|RecipeTrade|SalvageTrade> = [];
   
    public toggleTab(tab: string): void {
        this.activeTab = tab;
        this.trades = [];

        ListService.getList(tab)
            .then(trades => this.trades = trades);
    }

    public isBasicListActive(): boolean {
        return ['cheap', 'expensive'].includes(this.activeTab);
    }

    public isRefineListActive(): boolean {
        return ['refine'].includes(this.activeTab);
    }

    public isSalvageListActive(): boolean {
        return ['salvage', 'open'].includes(this.activeTab);
    }

    public isRecipeListActive(): boolean {
        return ! this.isBasicListActive()
            && ! this.isRefineListActive()
            && ! this.isSalvageListActive();
    }

    public mounted(): void {
        this.toggleTab('cheap');
        
        const token = TokenService.getToken();

        if (token) {
            TpService.getCurrentSells(token)
                .then(res => this.currentSells = res);

            TpService.getCurrentBuys(token)
                .then(res => this.currentBuys = res);
        }
    }
}
</script>

<style scoped>
    .tab-pane > .card {
        border-top: 0px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }
</style>
