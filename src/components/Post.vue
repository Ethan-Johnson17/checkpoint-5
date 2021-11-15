<template>
  <div class="row">
    <router-link :to=" '/Profile/' + post.creator.id">
      <div class="col-md-6 text-start">
        <h6><img :src="post.creator.picture" alt="" class="profile-img rounded-circle">
          {{post.creator.name}}</h6>
      </div>
    </router-link>
    <div class="col-md-4">
      <p class="text-grey darken-20">{{post.createdAt}}</p>
    </div>
    <div class="col-md-2 text-end">
      <p>{{post.likes.length}}<i class="mdi mdi-star-box-outline f-20 pt-0 selectable h-25"
          @click="likePost(post.id)"></i></p>
    </div>
    <div class="col-md-11">
      <p>{{post.body}}</p>
      <!-- <center><img :src="post.imgUrl" alt="Image" class="m-4"></center> -->
    </div>
    <!-- <div class="col-md-11" v-else>
      <p>{{post.body}}</p>
    </div> -->
    <div v-if="post.creatorId == account.id">
      <button class="btn mdi mdi-delete p-0 m-0 f-16 text-danger" title="delete post"
        @click=" remove(post.id)"></button>
    </div>
  </div>
</template>


<script>
  import { AppState } from "../AppState";
  import { computed, reactive, onMounted } from "vue";
  import { postsService } from "../services/PostsService";
  import { logger } from "../utils/Logger";
  import Pop from '../utils/Pop'
  export default {
    props: { post: { type: Object, required: true } },
    setup(props) {

      const account = computed(() => AppState.account)

      return {
        account,
        async likePost(id) {
          try {
            await postsService.likePost(id)
          } catch (error) {
            logger.error(error)
          }
        },

        async remove(id) {
          try {
            if (await Pop.confirm()) {
              await postsService.remove(id)
            }
          } catch (error) {
            logger.error(error)
            Pop.toast('Failed to Delete', 'error')
          }
        }

      }
    }
  }
</script>


<style lang="scss" scoped>
  .profile-img {
    height: 70px;
    width: 70px;
    object-fit: cover;
  }
</style>