<template>
  <div v-if="user.isAuthenticated">
    <form @submit.prevent="createPost" class="row rounded bg-dark justify-content-center elevation-3 p-2 m-5">
      <h5>New Post:</h5>
      <div class="col-md-12 mb-2">
        <label for="" class="form-label">Post Body</label>
        <textarea v-model="state.editable.body" required min="5" max="400" type="text" class="form-control"
          aria-describedby="helpId"></textarea>
      </div>
      <div class="col-md-12 mb-2">
        <label for="" class="form-label">Image url</label>
        <input v-model="state.editable.imgUrl" type="url" class="form-control" aria-describedby="helpId" />
      </div>
      <div class="col-12 d-flex justify-content-end">
        <button class="btn btn-primary">Post</button>
      </div>
    </form>
  </div>
  <div v-else disabled>
    <form class="row bg-grey darken-20 justify-content-center elevation-3 p-2 m-5">
      <h5><i class="mdi mdi-pencil me-3"></i>Please Sign in to Create a New Post <i class="mdi mdi-pencil ms-3"></i>
      </h5>
      <span hidden>
        <div class="col-md-12 mb-2">
          <label for="Body" class="form-label">Post Body</label>
          <textarea v-model="state.editable.body" required min="5" max="400" type="text" class="form-control"
            aria-describedby="helpId"></textarea>
        </div>
        <div class="col-md-12 mb-2">
          <label for="ImgUrl" class="form-label">Image url</label>
          <input v-model="state.editable.imgUrl" type="url" class="form-control" aria-describedby="helpId" />
        </div>
        <div class="col-12 d-flex justify-content-end">
          <button class="btn btn-primary">Post</button>
        </div>
      </span>
    </form>
  </div>
</template>


<script>
  import { AppState } from "../AppState";
  import { computed, reactive, onMounted } from "vue";
  import { logger } from "../utils/Logger";
  import Pop from "../utils/Pop";
  import { postsService } from "../services/postsService"
  import { AuthService } from '../services/AuthService'
  export default {
    setup() {
      const state = reactive({
        editable: {},
      })
      return {
        user: computed(() => AppState.user),
        state,
        async createPost() {
          try {
            state.editable.body
            await postsService.createPost(state.editable)
            state.editable = {}
          } catch (error) {
            logger.error(error);
            Pop.toast(error.message, "error");
          }
        }
      }
    }
  }
</script>


<style lang="scss" scoped>

</style>