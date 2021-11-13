<template>
  <header class="container-fluid">
    <div class="row">
      <Navbar />
    </div>
    <OffCanvas />
  </header>
  <main class="container-fluid">
    <div class="row">
      <div class="col-md-9">
        <router-view />
      </div>
      <div class="col-md-3">
        <Banner :banner="b" />
      </div>
    </div>
  </main>
  <footer>
    <div class="bg-dark text-light text-center p-4">
      Made with 💖 by CodeWorks
    </div>
  </footer>
</template>

<script>
  import { computed } from 'vue'
  import { AppState } from './AppState'
  export default {
    name: 'App',
    setup() {
      return {
        appState: computed(() => AppState)
      }
    }
  }
</script>
<style lang="scss">
  @import "./assets/scss/main.scss";
</style>