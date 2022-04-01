<template>
    <div class="container">
      <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
          <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
            <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
            <span class="fs-4">Octo tp guide</span>
          </a>

          <ul class="nav nav-pills">
            <li class="nav-item">
              <router-link to="/" class="nav-link" exact-active-class="active">Home</router-link>
            </li>
             <li class="nav-item">
              <router-link to="/lists" class="nav-link" exact-active-class="active">Lists</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/items" class="nav-link" exact-active-class="active">Items</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/about" class="nav-link" exact-active-class="active">About</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/calculator" class="nav-link" exact-active-class="active">Calculator</router-link>
            </li>
          </ul>
        </header>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class Nav extends Vue {
    
}
</script>
<style scoped>

</style>