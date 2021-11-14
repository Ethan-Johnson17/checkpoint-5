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
                  placeholder="picture..." />
              </div>
              <div>
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" name="name" id="name" aria-describedby="name"
                  placeholder="Name..." />
              </div>
            </div>
            <div class="mb-3">
              <div>
                <label for="class" class="form-label">Class</label>
                <textarea type="text" class="form-control" name="class" id="class" aria-describedby="class"
                  placeholder="class..."></textarea>
              </div>
            </div>
            <div class="mb-3 d-flex justify-content-between">
              <div>
                <label for="bio" class="form-label">Bio</label>
                <input type="text" class="form-control" name="bio" id="bio" aria-describedby="bio" placeholder="bio..."
                  min="5" max="250" required />
              </div>
              <div>
                <label for="github" class="form-label">Github</label>
                <input type="url" class="form-control" name="github" id="github" aria-describedby="github" />
              </div>
              <div>
                <label for="linkedin" class="form-label">LinkedIn</label>
                <input type="url" class="form-control" name="linkedin" id="linkedin" aria-describedby="linkedin"
                  placeholder="linkedin..." />
              </div>
            </div>
            <div class="mb-3">
              <div>
                <label for="resume" class="form-label">Resume</label>
                <input type="url" class="form-control" name="resume" id="resume" aria-describedby="resume"
                  placeholder="Resume..." />
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
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
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
    // props: {
    //   account: {
    //     type: Account,
    //   }
    // },
    setup(props) {
      // const router = useRouter()
      // const editable = ref({})
      // watchEffect(() => {
      //   editable.value = { ...props.account }
      // })
      return {
        // editable,
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