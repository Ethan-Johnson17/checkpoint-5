<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary px-3 sticky">
    <span class="navbar-text me-3">
      <button class="btn selectable text-success lighten-30 text-uppercase my-2 my-lg-0" @click="login"
        v-if="!user.isAuthenticated">
        Login
      </button>

      <div class="dropdown my-2 my-lg-0" v-else>
        <div class="selectable" data-bs-target="#offcanvasExample" data-bs-toggle="offcanvas" aria-expanded="false"
          id="authDropdown">
          <img :src="user.picture" alt="user photo" height="40" class="rounded-circle profile-img" />
          <span class="mx-3 text-white">{{ user.name }}</span>
        </div>
        <div class="dropdown-menu p-0 list-group w-100" aria-labelledby="authDropdown">
          <router-link :to="{ name: 'Account' }">
            <div class="list-group-item list-group-item-action hoverable">
              My Profile
            </div>
          </router-link>
          <div class="list-group-item list-group-item-action hoverable text-danger" @click="logout">
            <i class="mdi mdi-logout"></i>
            logout
          </div>
        </div>
      </div>
    </span>
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex align-items-center mx-3">
        <img alt="logo" src="../assets/img/network-5508173_640.png" height="65" />
        <h1 class="mx-2">The Network</h1>
      </div>
    </router-link>
    <!-- make sure this is conditionally rendered only if they are logged in -->
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <router-link :to="{ name: 'Search' }" class="btn text-white lighten-30 selectable text-uppercase">
        <i class="mdi mdi-magnify">Search</i>
      </router-link>

    </div>
  </nav>
</template>

<script>
  import { AuthService } from '../services/AuthService'
  import { AppState } from '../AppState'
  import { computed } from 'vue'
  export default {
    setup() {
      return {
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

<style scoped>
  .dropdown-menu {
    user-select: none;
    display: block;
    transform: scale(0);
    transition: all 0.15s linear;
  }

  .dropdown-menu.show {
    transform: scale(1);
  }

  .hoverable {
    cursor: pointer;
  }

  a:hover {
    text-decoration: none;
  }

  .nav-link {
    text-transform: uppercase;
  }

  .navbar-nav .router-link-exact-active {
    border-bottom: 2px solid var(--bs-success);
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .profile-img {
    height: 50px;
    width: 50px;
  }

  .sticky {
    position: sticky;
  }
</style>