<template>
    <div class="hello">
        <h1>hello</h1>
    
      <div v-for="amount in getAmounts()" :key="amount" class="row main">
          <div class="col-6">{{ amount }}</div>
          <div class="col-6 text-end"><Gold :amount="amount"></Gold></div>
      </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Gold from '../components/Gold.vue';

@Options({
    components: {
        Gold,
    },
})
export default class HelloWorld extends Vue {
    getAmounts(): Array<number> {
        return [
            0,
            9,
            99,
            100,
            101,
            999,
            1000,
            1001,
            9999,
            10000,
            10001,
            10100,
            10101,
            11000,
            11010,
            -10101,
        ];
    }
}
</script>

<style scoped>
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}

.main {
    width: 200px;
}
</style>
