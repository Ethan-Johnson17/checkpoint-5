<template>
  <div class="about row text-center">
    <div class="col-md-8">
      <img class="rounded" :src="account.picture" alt="" />
      <h1>Welcome, {{ account.name }}</h1>
      <p>{{ account.email }}</p>
    </div>
  </div>
  <button class="btn btn-round border-dark mb-auto text-end me-2" @click="openDetails"><i class="mdi mdi-pencil f-24"
      title="Edit Account"></i>
  </button>
  <!-- <AccountModal :account="account" /> -->
</template>

<script>
  import { computed } from 'vue'
  import { AppState } from '../AppState'
  import { logger } from "../utils/Logger";
  import { Modal } from "bootstrap";
  export default {
    name: 'Account',
    setup() {
      return {
        account: computed(() => AppState.account),
        openDetails() {
          // NOTE open the details modal using a method
          debugger
          const modalElm = document.getElementById('account-modal');
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