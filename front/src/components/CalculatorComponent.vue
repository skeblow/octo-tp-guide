<template>
  <div>
    <div class="row">
      <div class="col">
          <div class="form-group">
            <label>
              <div>Buy price:</div>
              <input type="number" v-model.number="buy" class="form-control">
              <small>{{ formatBuy }}</small>
            </label>
          </div>
      </div>

      <div class="col">
        <div class="form-group">
          <label>
            <div>Sell price:</div>
            <input type="number" v-model.number="sell" class="form-control">
            <small>{{ formatSell }}</small>
          </label>
        </div>
      </div>      
    </div>

    <table class="table table-bordered">
      <tbody>
        <tr>
          <th scope="row">Listing fee</th>
          <td>{{ listingFee }}</td>
        </tr>
        <tr>
          <th scope="row">Selling fee</th>
          <td>{{ sellingFee }}</td>
        </tr>
        <tr>
          <th scope="row">Profit</th>
          <td colspan="2">
            {{ profit }} 
            <small>{{ profitPercent }}%</small>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
})
export default class CalculatorComponent extends Vue {
  buy: number|null = null;
  sell: number|null = null;

  get formatBuy(): string {
    return this.format(this.buy);
  }

  get formatSell(): string {
    return this.format(this.sell);
  }

  get listingFee(): string {
    if (! this.sell) {
      return '';
    }

    return this.format(this.sell * 0.05);
  }

  get sellingFee(): string {
    if (! this.sell) {
      return '';
    }

    return this.format(this.sell * 0.1)
  }

  get profit(): string {
    if (! this.buy || ! this.sell) {
      return '';
    }

    return this.format(this.sell * 0.85 - this.buy);
  } 

  get profitPercent(): number {
    if (! this.buy || ! this.sell) {
      return 0;
    }

    return Math.round((this.sell * 0.85 - this.buy) / this.buy * 100);
  }

  get total(): number {
    return (this.buy ?? 0) + (this.sell ?? 0);
  }

  format(amount: number|null): string {
    if (amount === 0 || amount === null) {
      return '0';
    }

    const gold = Math.floor(amount);
    let silver = Math.floor(amount * 100 - gold * 100);
    let copper = Math.round(amount * 100 * 100 - gold * 100 * 100 - silver * 100);

    let formatted = gold + ' g';

    if (copper === 100) {
      silver += 1;
      copper = 0;
    }

    if (silver > 0) {
      formatted += ' ' + silver + ' s';
    }

    if (copper > 0) {
      formatted += ' ' + copper + ' c';
    }

    return formatted;
  }
}
</script>

<style scoped>
  th {
    width: 150px;
  }
</style>
