<template>
    <div class="row">
        <div class="col-lg-6 col-md-8 mx-auto">
            <h1>Calculator page</h1>
    
            <CalculatorComponent></CalculatorComponent>
      </div>
  </div>  
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import CalculatorComponent from '../components/CalculatorComponent.vue';

@Options({
    components: {
        CalculatorComponent: CalculatorComponent,
    },
})
export default class Calculator extends Vue {
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
</style>
