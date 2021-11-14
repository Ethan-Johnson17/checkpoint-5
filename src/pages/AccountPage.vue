<template>
  <div class="about row text-center">
    <div class="col-md-8">
      <img class="rounded" :src="account.picture" alt="" />
      <h1>Welcome, {{ account.name }}</h1>
      <p>{{ account.email }}</p>
    </div>
  </div>
  <button class="btn btn-round border-dark mb-auto text-end me-2" @click="openEdit"><i class="mdi mdi-pencil f-24"
      title="Edit Account"></i>
  </button>
  <AccountModal :account="account" />
  <Thread />
</template>

<script>
  import { computed, onMounted, watchEffect } from 'vue'
  import { AppState } from '../AppState'
  import { logger } from "../utils/Logger";
  import { Modal } from "bootstrap";
  import { postsService } from "../services/PostsService";
  import { useRoute } from "vue-router";
  import { accountService } from "../services/AccountService";
  export default {
    name: 'Account',
    setup() {
      const route = useRoute();
      // NOTE watchEffect runs when ever the data used within the watchEffect( route.params.id ) changes
      onMounted(async () => {
        try {
          // NOTE if statement here checks to make sure this only runs on the profile page and not when we leave the profile page
          if (route.name == "Account") {
            // NOTE params comes from router
            await accountService.getAccount(route.params.id);
            logger.log('what?', route.param)
            await postsService.getAll("?creatorId=" + route.params.id);
          }
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      });
      return {
        account: computed(() => AppState.account),


        openEdit() {
          // NOTE open the details modal using a method
          const modalElm = document.getElementById("accountModal");
          logger.log(modalElm);
          Modal.getOrCreateInstance(modalElm).toggle();
        },
      }
    }
  }
</script>

<style scoped>
  img {
    max-width: 100px;
  }
</style>