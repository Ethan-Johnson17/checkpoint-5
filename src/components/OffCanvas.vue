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
    <div class="offcanvas-header bg-grey darken-30">
      <div class="text-center">
        <h5 class="offcanvas-title" id="offcanvasExampleLabel"><img :src="account.picture" alt=""
            class="rounded-circle profile-img me-2">{{account.name}}</h5>
        <router-link :to="{ name: 'Account' }">
          <div class="list-group-item-action hoverable">
            My Profile
          </div>
        </router-link>
        <div class="list-group-item-action hoverable text-danger" @click="logout">
          <i class="mdi mdi-logout"></i>
          logout
        </div>
      </div>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <div>
        {{account.bio}}
      </div>
      <div class="dropdown mt-3" v-if="account.github">
        <ul>
          <li><a class="dropdown-item" href="#">{{account.github}}</a></li>
          <li><a class="dropdown-item" href="#">{{account.linkedin}}</a></li>
          <li><a class="dropdown-item" href="#">{{account.resume}} </a></li>
        </ul>
      </div>
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
  import { useRoute } from "vue-router";
  import { postsService } from "../services/PostsService";
  import { AuthService } from '../services/AuthService'
  export default {
    name: "Profile",
    setup() {
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
        }
      }
    }
  }
</script>


<style lang="scss" scoped>
  .profile-img {
    height: 50px;
    width: 50px;
  }
</style>