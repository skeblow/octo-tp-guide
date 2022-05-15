<template>
    <div>
        <h1 class="h2">Lists</h1>

        <ul class="nav nav-tabs">
            <li class="nav-item">
                <button
                    type="button"
                    v-on:click="toggleTab('cheap')"
                    class="nav-link"
                    v-bind:class="{ active: activeTab === 'cheap' }"
                >#1 cheap</button>
            </li>
            <li class="nav-item">
                <button
                    type="button"
                    v-on:click="toggleTab('expensive')"
                    class="nav-link"
                    v-bind:class="{ active: activeTab === 'expensive' }"
                >#2 expensive</button>
            </li>
            <li class="nav-item">
                <button
                    type="button"
                    v-on:click="toggleTab('refine')"
                    class="nav-link"
                    v-bind:class="{ active: activeTab === 'refine' }"
                >#3 refine</button>
            </li>
            <li class="nav-item">
                <button
                    type="button"
                    v-on:click="toggleTab('salvage')"
                    class="nav-link"
                    v-bind:class="{ active: activeTab === 'salvage' }"
                >#4 salvage</button>
            </li>
            <li class="nav-item">
                <button
                    type="button"
                    v-on:click="toggleTab('cooking')"
                    class="nav-link"
                    v-bind:class="{ active: activeTab === 'cooking' }"
                >#5 food</button>
            </li>
            <li class="nav-item">
                <button
                    type="button"
                    v-on:click="toggleTab('utility')"
                    class="nav-link"
                    v-bind:class="{ active: activeTab === 'utility' }"
                >#6 utility</button>
            </li>
            <li class="nav-item">
                <button
                    type="button"
                    v-on:click="toggleTab('open')"
                    class="nav-link"
                    v-bind:class="{ active: activeTab === 'open' }"
                >#7 open</button>
            </li>
            <li class="nav-item">
                <button
                    type="button"
                    v-on:click="toggleTab('weaponsmith')"
                    class="nav-link"
                    v-bind:class="{ active: activeTab === 'weaponsmith' }"
                >#8 weapon</button>
            </li>
            <li class="nav-item">
                <button
                    type="button"
                    v-on:click="toggleTab('artificier')"
                    class="nav-link"
                    v-bind:class="{ active: activeTab === 'artificier' }"
                >#9 artificier</button>
            </li>
            <li class="nav-item">
                <button
                    type="button"
                    v-on:click="toggleTab('jewelcrafting')"
                    class="nav-link"
                    v-bind:class="{ active: activeTab === 'jewelcrafting' }"
                >#10 jwc</button>
            </li>
            <li class="nav-item">
                <button
                    type="button"
                    v-on:click="toggleTab('tailor')"
                    class="nav-link"
                    v-bind:class="{ active: activeTab === 'tailor' }"
                >#11 tailor</button>
            </li>
            <li class="nav-item">
                <button
                    type="button"
                    v-on:click="toggleTab('huntsman')"
                    class="nav-link"
                    v-bind:class="{ active: activeTab === 'huntsman' }"
                >#12 hunt</button>
            </li>
            <li class="nav-item">
                <button
                    type="button"
                    v-on:click="toggleTab('armorsmith')"
                    class="nav-link"
                    v-bind:class="{ active: activeTab === 'armorsmith' }"
                >#13 armor</button>
            </li>
        </ul>

        <div class="tab-content">
            <div class="tab-pane fade show active">
                <div class="card">
                    <div class="card-body">
                        <BasicList v-if="isBasicListActive()" :items="trades"></BasicList>
                        <RefineList v-if="isRefineListActive()" :items="trades"></RefineList>
                        <SalvageList v-if="isSalvageListActive()" :items="trades"></SalvageList>
                        <RecipeList v-if="isRecipeListActive()" :items="trades" :activeListingIds="activeListingIds"></RecipeList>
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
    activeTab: string = 'cheap';
    trades: Array<BasicTrade|RecipeTrade|SalvageTrade> = []
   
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
        return ['salvage'].includes(this.activeTab);
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
            ApiService.getActiveListingIds(token)
                .then(res => this.activeListingIds = res);
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
