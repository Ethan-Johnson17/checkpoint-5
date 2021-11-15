<template>
  <div class="about row  justify-content-center mt-4">
    <div class="col-md-5 text-center">
      <img class="rounded" :src="profile.picture" alt="" />
      <h1>{{ profile.name }}</h1>
      <div v-if="profile.graduated == true"><i class="mdi mdi-school f-20"></i>{{profile.class}}</div>
      <p>{{ profile.email }}</p>
      <p>{{profile.bio}}</p>
      <a :href="profile.linkedin" target="_blank"><i class="mdi mdi-linkedin f-24" title="linkedIn"></i></a>
      <a :href="profile.github" target="_blank" class="mx-3"><i class="mdi mdi-xml f-24" title="github"></i>Github</a>
      <a :href="profile.resume" target="_blank"><i class="mdi mdi-file-account f-24" title="Resume"></i></a>
    </div>
  </div>
  <div class="row justify-content-center mt-2">
    <div class="col-md-6 mt-4">
      <h5>{{profile.name}}'s posts:</h5>
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
  import { profilesService } from "../services/ProfilesService";
  import Pop from "../utils/Pop";
  export default {
    name: 'Profile',
    setup() {
      const route = useRoute();
      const profile = computed(() => AppState.profile)
      watchEffect(async () => {
        try {
          if (route.name == "Profile") {
            // NOTE params comes from router
            await profilesService.getProfile(route.params.id);
            await postsService.getAll("?creatorId=" + route.params.id);
          }
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      });
      return {
        profile,
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
    max-width: 400px;
    object-fit: cover;
  }
</style>