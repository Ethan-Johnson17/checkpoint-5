<template>
  <div class="modal fade" id="accountModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="edit">
            <div class="mb-3 d-flex justify-content-between">
              <div>
                <label for="picture" class="form-label">Picture</label>
                <input type="url" class="form-control" name="picture" id="picture" aria-describedby="picture"
                  placeholder="picture..." v-model="editable.picture" />
              </div>
              <div>
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" name="name" id="name" aria-describedby="name"
                  placeholder="Name..." v-model="editable.name" />
              </div>
            </div>
            <div class="mb-3">
              <div>
                <label for="bio" class="form-label">Bio</label>
                <textarea type="text" class="form-control" name="bio" id="bio" aria-describedby="bio"
                  placeholder="Bio..." min="5" max="250" required v-model="editable.bio"></textarea>
              </div>
            </div>
            <div class="mb-3 d-flex justify-content-between">
              <div>
                <label for="graduated" class="form-label">Graduated</label>
                <input type="checkbox" class="form-check-input" name="graduated" id="graduated"
                  aria-describedby="graduated" placeholder="graduated..." v-model="editable.graduated" />
              </div>
              <div>
                <label for="class" class="form-label">Class</label>
                <input type="text" class="form-control" name="class" id="class" aria-describedby="class"
                  placeholder="class..." v-model="editable.class" />
              </div>

            </div>
            <div class="mb-3">
              <div>
                <label for="github" class="form-label">Github</label>
                <input type="url" class="form-control" name="github" id="github" aria-describedby="github"
                  v-model="editable.github" />
              </div>
              <div>
                <label for="linkedin" class="form-label">LinkedIn</label>
                <input type="url" class="form-control" name="linkedin" id="linkedin" aria-describedby="linkedin"
                  placeholder="linkedin..." v-model="editable.linkedin" />
              </div>
              <div>
                <label for="resume" class="form-label">Resume</label>
                <input type="url" class="form-control" name="resume" id="resume" aria-describedby="resume"
                  placeholder="Resume..." v-model="editable.resume" />
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="submit" class="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import { ref } from '@vue/reactivity'
  import { logger } from '../utils/Logger'
  import { accountService } from '../services/AccountService'
  import Pop from '../utils/Pop'
  import { Modal } from 'bootstrap'
  import { useRouter } from 'vue-router'
  import { AppState } from '../AppState'
  import { Account } from '../Models/Account'
  import { watchEffect } from '@vue/runtime-core'
  export default {
    props: {
      account: {
        type: Account,
      }
    },
    setup(props) {
      const router = useRouter()
      const editable = ref({})
      watchEffect(() => {
        editable.value = { ...props.account }
      })
      return {
        editable,
        async edit() {
          try {
            await accountService.edit(editable.value)
            Modal.getOrCreateInstance(document.getElementById('accountModal')).hide()
          } catch (error) {
            logger.error(error)
            Pop.toast('Failed to Edit', 'error')
          }
        }
      }
    }
  }
</script>


<style lang="scss" scoped>

</style>