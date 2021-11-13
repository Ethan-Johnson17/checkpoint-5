<template>
  <div class="component my-2" v-if="!null">
    <img :src="banners[0].tall" alt="Tall Banner" class="my-2">
    <img :src="banners[1].tall" alt="Tall Banner" class="my-2">
  </div>

</template>


<script>
  import { computed, onMounted } from "@vue/runtime-core";
  import { logger } from "../utils/Logger";
  import Pop from "../utils/Pop";
  import { bannersService } from "../services/BannersService";
  import { AppState } from "../AppState";
  export default {
    // props: {
    //   banner: {
    //     type: Object,
    //   }
    // },
    setup(props) {
      onMounted(async () => {
        try {
          await bannersService.getAll()
          // AppState.banners[1].tall
          // logger.log('banner?', banner)
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      })
      return {
        banners: computed(() => AppState.banners)
      }
    }
  }
</script>


<style lang="scss" scoped>

</style>