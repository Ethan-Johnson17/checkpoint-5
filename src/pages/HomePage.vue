<template>
  <div class="home row align-items-center justify-content-center">
    <div class="col-md-6 ">
      <CreatePost />
    </div>
    <!-- <div class="home-card p-5 bg-white rounded elevation-3"> -->
    <Thread />
    <!-- </div> -->
    <!-- <div class="mt-2 text-center d-flex justify-content-evenly" v-if="totalPages > 0">
      <button class="btn me-1 text-white selectable btn-dark mdi mdi-arrow-left" :disabled="newer == null"
        @click="getNext(newer)">
        Newer
      </button>
      <button class="btn me-1 text-white selectable btn-dark mdi mdi-arrow-right" :disabled="older == null"
        @click="getNext(older)">
        Older
      </button>
    </div> -->
  </div>
</template>

<script>
  import { computed, reactive, onMounted } from "@vue/runtime-core";
  import { logger } from "../utils/Logger";
  import Pop from "../utils/Pop";
  import { postsService } from "../services/PostsService";
  import { ref } from "@vue/reactivity";
  import { AppState } from "../AppState";
  export default {
    name: 'Home',
    setup() {
      const searchText = ref("");
      let olderPage = AppState.older;

      onMounted(async () => {
        try {
          await postsService.getAll()
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      })

      return {
        searchText,
        // olderPage,
        older: computed(() => AppState.older),
        newer: computed(() => AppState.newer),
        totalPages: computed(() => AppState.totalPages),
        currentPage: computed(() => AppState.page),

        async getNext(page) {
          try {
            let nextPage = page.split('=').map((url) => url.trim())
            let np = nextPage[1]
            await postsService.findPostBySearch("?page=", np)
          } catch (error) {
            logger.error(error)
            Pop.toast(error.message, 'error')
          }
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  /* .home {
    display: grid;
    height: 80vh;
    place-content: center;
    text-align: center;
    user-select: none;

    .home-card {
      width: 50vw;

      >img {
        height: 200px;
        max-width: 200px;
        width: 100%;
        object-fit: contain;
        object-position: center;
      }
    }
  } */
</style>