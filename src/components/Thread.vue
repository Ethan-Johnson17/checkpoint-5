<template>
  <div class="thread row justify-content-center">
    <div v-for="p in posts" :key="p.id" class="col-md-6 elevation-2 m-3 pt-2 bg-light rounded-2">
      <Post :post="p" />
    </div>
  </div>
</template>


<script>
  import { AppState } from "../AppState";
  import { computed, reactive, onMounted } from "vue";
  export default {
    setup() {
      return {
        posts: computed(() => AppState.posts),
      }
    }
  }
</script>


<style lang="scss" scoped>

</style>