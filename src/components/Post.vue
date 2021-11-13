<template>
  <div class="row">
    <div class="col-md-6 text-start">
      <h5><img :src="post.creator.picture" alt="" class="profile-img rounded-circle">
        {{post.creator.name}}</h5>
    </div>
    <div class="col-md-4">
      <p class="text-grey">{{post.createdAt}}</p>
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
  </div>
</template>


<script>
  import { AppState } from "../AppState";
  import { computed, reactive, onMounted } from "vue";
  import { postsService } from "../services/PostsService";
  import { logger } from "../utils/Logger";
  export default {
    props: { post: { type: Object, required: true } },
    setup(props) {
      return {
        async likePost(id) {
          try {
            await postsService.likePost(id)
          } catch (error) {
            logger.error(error)
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