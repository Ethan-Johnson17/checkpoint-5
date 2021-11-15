<template>
  <div class="about row text-center justify-content-center mt-4">
    <div class="col-md-5 text-center">
      <img class="rounded height" :src="account.picture" alt="" />
      <h1>Welcome, {{ account.name }}</h1>
      <div v-if="account.graduated == true"><i class="mdi mdi-school f-20"></i>{{account.class}}</div>
      <p>{{ account.email }}</p>
      <p>{{account.bio}}</p>
      <a :href="account.linkedin" target="_blank"><i class="mdi mdi-linkedin f-24" title="linkedIn"></i></a>
      <a :href="account.github" target="_blank"><i class="mdi mdi-xml f-24" title="github"></i>Github</a>
      <a :href="account.resume" target="_blank"><i class="mdi mdi-file-account f-24" title="Resume"></i></a>
    </div>
  </div>
  <button class="btn btn-round border-dark mb-auto text-end me-2" data-bs-target="#accountModal"
    data-bs-toggle="modal"><i class="mdi mdi-pencil f-24" title="Edit Account"></i>
  </button>
  <div class="row justify-content-center">
    <div class="col-md-6 mt-4">
      <h5>My posts:</h5>
    </div>
  </div>
  <Thread />

  <AccountModal />
</template>

<script>
  import { computed, onMounted, watchEffect } from 'vue'
  import { AppState } from '../AppState'
  import { logger } from "../utils/Logger";
  import { Modal } from "bootstrap";
  import { postsService } from "../services/PostsService";
  import { useRoute } from "vue-router";
  import { accountService } from "../services/AccountService";
  import Pop from "../utils/Pop";
  export default {
    name: 'Account',
    setup() {
      const route = useRoute();
      const account = computed(() => AppState.account)
      watchEffect(async () => {
        try {
          if (route.name == "Profile") {
            // NOTE params comes from router
            await accountService.getAccount(route.params.id);
            await postsService.getAll("?creatorId=" + route.params.id);
          }
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      });
      return {
        account,
        posts: computed(() => AppState.posts),


        // openEdit() {
        //   // NOTE open the details modal using a method
        //   const modalElm = document.getElementById("accountModal");
        //   logger.log(modalElm);
        //   Modal.getOrCreateInstance(modalElm).toggle();
        // },
      }
    }
  }
</script>

<style scoped>
  img {
    max-width: 500px;
  }

  .height {
    height: 400px;
    width: 500px;
    object-fit: cover;
  }
</style>