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
                >#8 weapon</button>
            </li>
            <li class="nav-item">
                <button
                    type="button"
                    v-on:click="toggleTab('artificier')"
                    class="nav-link"
                    v-bind:class="{ active: isArtificierTabActive }"
                >#9 artificier</button>
            </li>
            <li class="nav-item">
                <button
                    type="button"
                    v-on:click="toggleTab('jewelcrafting')"
                    class="nav-link"
                    v-bind:class="{ active: isJewelcraftingTabActive }"
                >#10 jwc</button>
            </li>
            <li class="nav-item">
                <button
                    type="button"
                    v-on:click="toggleTab('tailor')"
                    class="nav-link"
                    v-bind:class="{ active: isTailorTabActive }"
                >#11 tailor</button>
            </li>
            <li class="nav-item">
                <button
                    type="button"
                    v-on:click="toggleTab('huntsman')"
                    class="nav-link"
                    v-bind:class="{ active: isHuntsmanTabActive }"
                >#12 huntsman</button>
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
                        <RecipeList :items="cookingTrades" :activeListingIds="activeListingIds"></RecipeList>
                    </div>
                 </div>
            </div>
            <div 
                class="tab-pane fade"
                v-bind:class="{ show: isUtilityTabActive, active: isUtilityTabActive }"
            >
                 <div class="card">
                    <div class="card-body">
                        <RecipeList :items="utilityTrades" :activeListingIds="activeListingIds"></RecipeList>
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
                        <RecipeList :items="weaponsmithTrades" :activeListingIds="activeListingIds"></RecipeList>
                    </div>
                 </div>
            </div>
            <div 
                class="tab-pane fade"
                v-bind:class="{ show: isJewelcraftingTabActive, active: isJewelcraftingTabActive }"
            >
                 <div class="card">
                    <div class="card-body">
                        <RecipeList :items="jewelcraftingTrades" :activeListingIds="activeListingIds"></RecipeList>
                    </div>
                 </div>
            </div>
            <div 
                class="tab-pane fade"
                v-bind:class="{ show: isArtificierTabActive, active: isArtificierTabActive }"
            >
                 <div class="card">
                    <div class="card-body">
                        <RecipeList :items="artificierTrades" :activeListingIds="activeListingIds"></RecipeList>
                    </div>
                 </div>
            </div>
            <div 
                class="tab-pane fade"
                v-bind:class="{ show: isHuntsmanTabActive, active: isHuntsmanTabActive }"
            >
                 <div class="card">
                    <div class="card-body">
                        <RecipeList :items="huntsmanTrades" :activeListingIds="activeListingIds"></RecipeList>
                    </div>
                 </div>
            </div>
            <div 
                class="tab-pane fade"
                v-bind:class="{ show: isTailorTabActive, active: isTailorTabActive }"
            >
                 <div class="card">
                    <div class="card-body">
                        <RecipeList :items="tailorTrades" :activeListingIds="activeListingIds"></RecipeList>
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
import TokenService from '../services/TokenService';
import ApiService from '../services/ApiService';

@Options({
    components: {
        BasicList,
        RefineList,
        RecipeList,
        SalvageList,
    },
})
export default class Lists extends Vue {
    activeListingIds: Array<number> = [];

    isCheapTabActive = true;
    isExpensiveTabActive = false;
    isRefineTabActive = false;
    isSalvageTabActive = false;
    isCookingTabActive = false;
    isOpenTabActive = false;
    isUtilityTabActive = false;
    isWeaponsmithTabActive = false;
    isJewelcraftingTabActive = false;
    isArtificierTabActive = false;
    isHuntsmanTabActive = false;
    isTailorTabActive = false;

    cheapTrades: Array<BasicTrade> = [];
    expensiveTrades: Array<BasicTrade> = [];
    refineTrades: Array<RecipeTrade> = [];
    salvageTrades: Array<SalvageTrade> = [];
    cookingTrades: Array<RecipeTrade> = [];
    utilityTrades: Array<RecipeTrade> = [];
    openTrades: Array<RecipeTrade> = [];
    weaponsmithTrades: Array<RecipeTrade> = [];
    jewelcraftingTrades: Array<RecipeTrade> = [];
    artificierTrades: Array<RecipeTrade> = [];
    huntsmanTrades: Array<RecipeTrade> = [];
    tailorTrades: Array<RecipeTrade> = [];

    toggleTab(tab: string): void {
        this.isCheapTabActive = tab === 'cheap';
        this.isExpensiveTabActive = tab === 'expensive';
        this.isRefineTabActive = tab === 'refine';
        this.isSalvageTabActive = tab === 'salvage';
        this.isCookingTabActive = tab === 'cooking';
        this.isUtilityTabActive = tab === 'utility';
        this.isOpenTabActive = tab === 'open';
        this.isWeaponsmithTabActive = tab === 'weaponsmith';
        this.isJewelcraftingTabActive = tab === 'jewelcrafting';
        this.isArtificierTabActive = tab === 'artificier';
        this.isHuntsmanTabActive = tab === 'huntsman';
        this.isTailorTabActive = tab === 'tailor';
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
        ListService.getJewelcraftingList().then(trades => this.jewelcraftingTrades = trades);
        ListService.getArtificierList().then(trades => this.artificierTrades = trades);
        ListService.getHuntsmanList().then(trades => this.huntsmanTrades = trades);
        ListService.getTailorList().then(trades => this.tailorTrades = trades);

        const token = TokenService.getToken();

        if (token) {
            ApiService.getActiveListingIds(token)
                .then(res => {
                    this.activeListingIds = res;
                    console.log(res);
                });
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
