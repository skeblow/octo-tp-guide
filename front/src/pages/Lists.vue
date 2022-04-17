<template>
    <div>
        <h1 class="h2">Lists</h1>

        <ul class="nav nav-tabs">
            <li class="nav-item">
                <button
                    type="button"
                    v-on:click="toggleTab('cheap')"
                    class="nav-link"
                    v-bind:class="{ active: isCheapTabActive }"
                >#1 cheap</button>
            </li>
            <li class="nav-item">
                <button
                    type="button"
                    v-on:click="toggleTab('expensive')"
                    class="nav-link"
                    v-bind:class="{ active: isExpensiveTabActive }"
                >#2 expensive</button>
            </li>
            <li class="nav-item">
                <button
                    type="button"
                    v-on:click="toggleTab('refine')"
                    class="nav-link"
                    v-bind:class="{ active: isRefineTabActive }"
                >#3 refine</button>
            </li>
            <li class="nav-item">
                <button
                    type="button"
                    v-on:click="toggleTab('salvage')"
                    class="nav-link"
                    v-bind:class="{ active: isSalvageTabActive }"
                >#4 salvage</button>
            </li>
            <li class="nav-item">
                <button
                    type="button"
                    v-on:click="toggleTab('cooking')"
                    class="nav-link"
                    v-bind:class="{ active: isCookingTabActive }"
                >#5 food</button>
            </li>
            <li class="nav-item">
                <button
                    type="button"
                    v-on:click="toggleTab('utility')"
                    class="nav-link"
                    v-bind:class="{ active: isUtilityTabActive }"
                >#6 utility</button>
            </li>
            <li class="nav-item">
                <button
                    type="button"
                    v-on:click="toggleTab('open')"
                    class="nav-link"
                    v-bind:class="{ active: isOpenTabActive }"
                >#7 open</button>
            </li>
            <li class="nav-item">
                <button
                    type="button"
                    v-on:click="toggleTab('weaponsmith')"
                    class="nav-link"
                    v-bind:class="{ active: isWeaponsmithTabActive }"
                >#8 weaponsmith</button>
            </li>
        </ul>
        <div class="tab-content">
            <div 
                class="tab-pane fade" 
                v-bind:class="{ show: isCheapTabActive, active: isCheapTabActive }"
            >
                <div class="card">
                    <div class="card-body">
                        <BasicList :items="cheapTrades"></BasicList>
                    </div>
                </div>
            </div>
            <div 
                class="tab-pane fade"
                v-bind:class="{ show: isExpensiveTabActive, active: isExpensiveTabActive }"
            >
                <div class="card">
                    <div class="card-body">
                        <BasicList :items="expensiveTrades"></BasicList>
                    </div>
                </div>
            </div>
            <div 
                class="tab-pane fade"
                v-bind:class="{ show: isRefineTabActive, active: isRefineTabActive }"
            >
                <div class="card">
                    <div class="card-body">
                        <RefineList :items="refineTrades"></RefineList>
                    </div>
                </div>
            </div>
            <div 
                class="tab-pane fade"
                v-bind:class="{ show: isSalvageTabActive, active: isSalvageTabActive }"
            >
                 <div class="card">
                    <div class="card-body">
                        <SalvageList :items="salvageTrades"></SalvageList>
                    </div>
                 </div>
            </div>
            <div 
                class="tab-pane fade"
                v-bind:class="{ show: isCookingTabActive, active: isCookingTabActive }"
            >
                 <div class="card">
                    <div class="card-body">
                        <RecipeList :items="cookingTrades"></RecipeList>
                    </div>
                 </div>
            </div>
            <div 
                class="tab-pane fade"
                v-bind:class="{ show: isUtilityTabActive, active: isUtilityTabActive }"
            >
                 <div class="card">
                    <div class="card-body">
                        <RecipeList :items="utilityTrades"></RecipeList>
                    </div>
                 </div>
            </div>
            <div 
                class="tab-pane fade"
                v-bind:class="{ show: isOpenTabActive, active: isOpenTabActive }"
            >
                 <div class="card">
                    <div class="card-body">
                        <SalvageList :items="openTrades"></SalvageList>
                    </div>
                 </div>
            </div>
            <div 
                class="tab-pane fade"
                v-bind:class="{ show: isWeaponsmithTabActive, active: isWeaponsmithTabActive }"
            >
                 <div class="card">
                    <div class="card-body">
                        <RecipeList :items="weaponsmithTrades"></RecipeList>
                    </div>
                 </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { BasicTrade, RecipeTrade, SalvageTrade } from '../../../shared';
import BasicList from '../components/BasicList.vue';
import RecipeList from '../components/RecipeList.vue';
import RefineList from '../components/RefineList.vue';
import SalvageList from '../components/SalvageList.vue';
import ListService from '../services/ListService';

@Options({
    components: {
        BasicList,
        RefineList,
        RecipeList,
        SalvageList,
    },
})
export default class Lists extends Vue {
    isCheapTabActive = true;
    isExpensiveTabActive = false;
    isRefineTabActive = false;
    isSalvageTabActive = false;
    isCookingTabActive = false;
    isOpenTabActive = false;
    isUtilityTabActive = false;
    isWeaponsmithTabActive = false;
    cheapTrades: Array<BasicTrade> = [];
    expensiveTrades: Array<BasicTrade> = [];
    refineTrades: Array<RecipeTrade> = [];
    salvageTrades: Array<SalvageTrade> = [];
    cookingTrades: Array<RecipeTrade> = [];
    utilityTrades: Array<RecipeTrade> = [];
    openTrades: Array<RecipeTrade> = [];
    weaponsmithTrades: Array<RecipeTrade> = [];

    toggleTab(tab: string): void {
        this.isCheapTabActive = tab === 'cheap';
        this.isExpensiveTabActive = tab === 'expensive';
        this.isRefineTabActive = tab === 'refine';
        this.isSalvageTabActive = tab === 'salvage';
        this.isCookingTabActive = tab === 'cooking';
        this.isUtilityTabActive = tab === 'utility';
        this.isOpenTabActive = tab === 'open';
        this.isWeaponsmithTabActive = tab === 'weaponsmith';
    }

    mounted(): void {
        ListService.getCheapBasicList().then(trades => this.cheapTrades = trades);
        ListService.getExpensiveBasicList().then(trades => this.expensiveTrades = trades);
        ListService.getRefineList().then(trades => this.refineTrades = trades);
        ListService.getSalvageList().then(trades => this.salvageTrades = trades);
        ListService.getCookingList().then(trades => this.cookingTrades = trades);
        ListService.getUtilityList().then(trades => this.utilityTrades = trades);
        ListService.getOpenList().then(trades => this.openTrades = trades);
        ListService.getWeaponsmithList().then(trades => this.weaponsmithTrades = trades);
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
