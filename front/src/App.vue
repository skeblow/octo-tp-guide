<template>
  <main>
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
            <router-link to="/about" class="nav-link" exact-active-class="active">About</router-link>
            </li>
          <li class="nav-item">
            <router-link to="/calculator" class="nav-link" exact-active-class="active">Calculator</router-link>
            </li>
        </ul>
      </header>
    </div>

    <div class="container">
      <router-view></router-view>
    </div>
  </main>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
})
export default class App extends Vue {
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
