<template>
  <!-- <a class="btn btn-primary" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button"
  aria-controls="offcanvasExample">
  Link with href
</a>
<button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample"
  aria-controls="offcanvasExample">
  Button with data-bs-target
</button> -->
  <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
    <div class="offcanvas-header bg-primary container">
      <div class="row d-flex">
        <div class="col-md-3 pe-0 text-center"><img :src="account.picture" alt=""
            class="rounded-circle profile-img me-2">
        </div>
        <div class="col-md-7 p-0">
          <h5 class="offcanvas-title" id="offcanvasExampleLabel">{{account.name}}</h5>
          <p class="">{{ account.email }}</p>
        </div>
        <div class="col-md-2 text-end"><button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"
            aria-label="Close"></button></div>
        <div class="row text-center">
          <!-- <router-link :to="{ name: 'Profile' }"> -->
          <div class="col-md-8 list-group-item-action selectable" data-bs-target="#offcanvasExample"
            data-bs-toggle="offcanvas" @click="routeTo">
            My Profile
          </div>
          <!-- </router-link> -->
          <div class="col-md-8 list-group-item-action selectable text-danger" @click="logout">
            <i class="mdi mdi-logout"></i>
            logout
          </div>
        </div>

      </div>
    </div>
    <div class="offcanvas-body">
      <div>
        <h6>Bio:</h6>
        {{account.bio}}
      </div>
      <div v-if="account.graduated == true"><i class="mdi mdi-school f-20"></i>{{account.class}}</div>
      <a :href="account.linkedin" target="_blank"><i class="mdi mdi-linkedin f-24" title="linkedIn"></i></a>
      <a :href="account.github" target="_blank"><i class="mdi mdi-xml f-24" title="github"></i>Github</a>
      <a :href="account.resume" target="_blank"><i class="mdi mdi-file-account f-24" title="Resume"></i></a>
    </div>
  </div>
</template>


<script>
  import { computed } from "vue";
  import { AppState } from "../AppState";
  import { onMounted, watchEffect } from "@vue/runtime-core";
  import { logger } from "../utils/Logger";
  import Pop from "../utils/Pop";
  import { profilesService } from "../services/ProfilesService";
  import { useRouter } from "vue-router";
  import { postsService } from "../services/PostsService";
  import { AuthService } from '../services/AuthService'
  import { Modal } from "bootstrap";
  export default {
    name: "Profile",
    setup() {
      const router = useRouter();
      return {
        user: computed(() => AppState.user),
        account: computed(() => AppState.account),
        profile: computed(() => AppState.profile),

        user: computed(() => AppState.user),
        async login() {
          AuthService.loginWithPopup()
        },
        async logout() {
          AuthService.logout({ returnTo: window.location.origin })
        },

        routeTo() {
          // NOTE close the details modal using a method before we router push
          router.push({
            name: "Profile",
            params: { id: AppState.account.id },
          });
        },
      }
    }
  }
</script>


<style lang="scss" scoped>
  .profile-img {
    height: 60px;
    width: 60px;
    object-fit: cover;
  }
</style>