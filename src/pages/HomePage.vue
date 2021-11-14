<template>
  <div class="home align-items-center justify-content-center">
    <CreatePost />
    <!-- <div class="home-card p-5 bg-white rounded elevation-3"> -->
    <Thread />
    <!-- </div> -->
  </div>
</template>

<script>
  import { onMounted } from "@vue/runtime-core";
  import { logger } from "../utils/Logger";
  import Pop from "../utils/Pop";
  import { postsService } from "../services/PostsService";
  export default {
    name: 'Home',
    setup() {
      onMounted(async () => {
        try {
          await postsService.getAll()
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      })
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