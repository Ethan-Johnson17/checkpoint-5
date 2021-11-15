<template>
  <header class="container-fluid z sticky">
    <div class="row">
      <Navbar />
    </div>
    <OffCanvas />
  </header>
  <main class="container-fluid">
    <div class="row">
      <div class="col-md-10">
        <router-view />
      </div>
      <div class="col-md-2">
        <Banner class="stickyA" />
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
        appState: computed(() => AppState),
        banners: computed(() => AppState.banners)
      }
    }
  }
</script>
<style lang="scss">
  @import "./assets/scss/main.scss";

  .sticky {
    position: sticky;
    top: 0;
  }

  .stickyA {
    position: sticky;
    top: 3;
  }

  .z {
    z-index: 50;
  }
</style>