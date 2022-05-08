<template>
    <span v-bind:class="{'fw-bold': bold}">
        {{ formatGold(amount) }}
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

</style>
