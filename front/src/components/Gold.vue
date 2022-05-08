<template>
    <span v-bind:class="{'fw-bold': bold}" class="gold">
        <span v-if="gold > 0">{{ gold }}<small>g</small></span>
        <span v-if="silver > 0 || gold > 0">{{ getSilver() }}<small>s</small></span>
        <span v-if="copper > 0 || gold > 0 || silver > 0">{{ getCopper() }}<small>c</small></span>
    </span>
</template>

<script lang="ts">
import { Options, Vue, prop } from 'vue-class-component';

class GoldProps {
    amount = prop<number>({required: true});
    bold = prop<boolean>({required: false, default: false});
}

@Options({})
export default class Gold extends Vue.with(GoldProps) {
    gold: number = 0;
    silver: number = 0;
    copper: number = 0;

    public getSilver(): string {
        if (this.gold > 0) {
            return ('00' + this.silver).slice(-2);
        }

        return ''+this.silver;
    }

    public getCopper(): string {
        return ('00' + this.copper).slice(-2);      
    }

    public mounted(): void {
        let amount = this.amount;

        amount = Math.abs(Math.round(amount));

        if (amount === 0) {
            return;
        }

        if (amount < 0) {
            this.copper = amount;
        }

        const copper = amount - Math.floor(amount / 100) * 100;
        amount = amount - copper;
        amount = Math.round(amount / 100);

        const silver = amount - Math.floor(amount / 100) * 100;
        amount = amount - silver;
        amount = Math.round(amount / 100);

        this.copper = copper;
        this.silver = silver;
        this.gold = amount;
    }

    public formatGold(amount: number): string {
        const sign = amount < 0 ? '-' : '';
        amount = Math.abs(amount);

        if (amount === 0) {
            return '0';
        }

        if (amount < 0) {
            return amount+'c';
        }

        const copper = amount - Math.floor(amount / 100) * 100;
        amount = amount - copper;
        amount = Math.round(amount / 100);

        const silver = amount - Math.floor(amount / 100) * 100;
        amount = amount - silver;
        amount = Math.round(amount / 100);

        const gold = amount;
        const result = [];

        if (gold > 0) {
            result.push(gold + 'g');
        }

        if (silver > 0 || gold > 0) {
            result.push(silver + 's');
        }

         if (copper > 0 || silver > 0 || gold > 0) {
            result.push(Math.floor(copper) + 'c');
        }

        return sign+result.join(' ');
    }
}
</script>

<style scoped>
    .gold {
        white-space: nowrap;
    }

    .gold span {
        display: inline-block;
        margin-right: 3px;
    }

    .gold span:last-child {
        margin-right: 0;
    }
</style>
