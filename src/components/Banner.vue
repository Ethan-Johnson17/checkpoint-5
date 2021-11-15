<template>
  <div class="component my-2" v-if="banners== null">
    <img :src="banner1.tall" alt="Tall Banner" class="my-2 img-fluid">
    <img :src="banner2.tall" alt="Tall Banner" class="my-2 img-fluid">
  </div>
  <div v-else></div>

</template>


<script>
  import { computed, onMounted } from "@vue/runtime-core";
  import { logger } from "../utils/Logger";
  import Pop from "../utils/Pop";
  import { bannersService } from "../services/BannersService";
  import { AppState } from "../AppState";
  import { Banner } from "../models/Banner";
  export default {
    props: {
      banners: {
        type: Banner,
      }
    },
    setup(props) {

      onMounted(async () => {
        try {
          await bannersService.getAll()
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      })
      return {
        banner1: computed(() => AppState.banner1),
        banner2: computed(() => AppState.banner2)
      }
    }
  }
</script>


<style lang="scss" scoped>

</style>