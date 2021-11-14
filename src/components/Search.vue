<template>
  <div class="search row px-5 pt-3">
    <div class="col-12">
      <!-- NOTE submits searches when the form is submitted -->
      <form @submit.prevent="searchPosts" class="input-group">
        <!-- NOTE keypress submits on each keypress, ideally you don't want both of these on your search bar but can be helpful -->
        <input @keypress="searchPosts" v-model="searchText" class="form-control" placeholder="search posts" type="text"
          name="search" />
        <button class="btn btn-outline-primary" type="submit">search</button>
      </form>
    </div>
  </div>
  <div class="mt-2" v-if="pages > 0">
    <button class="btn me-1 text-white selectable" :class="{
        'btn-primary': page === currentPage,
        'btn-dark': page !== currentPage,
      }" :disabled="page === currentPage" v-for="page in pages" :key="page" @click="getPage(page)">
      {{ page }}
    </button>
  </div>
</template>


<script>
  import { AppState } from "../AppState";
  import { computed, reactive, onMounted } from "vue";
  import { logger } from "../utils/Logger";
  import Pop from "../utils/Pop";
  import { postsService } from "../services/postsService"
  import { ref } from "@vue/reactivity";
  export default {
    setup() {
      const searchText = ref("");
      return {
        searchText,
        totalPages: computed(() => AppState.totalPages),
        currentPage: computed(() => AppState.page),
        async searchPosts() {
          try {
            await postsService.getAll("?query=" + searchText.value);
          } catch (error) {
            logger.error(error);
            Pop.toast(error.message, "error");
          }
        },

        async getPage(page) {
          try {
            await postsService.findPostBySearchText(searchText.value, page)
          } catch (error) {
            logger.error(error)
            Pop.toast(error.message, 'error')
          }
        }
      };
    },
  };
</script>


<style scoped>
</style>