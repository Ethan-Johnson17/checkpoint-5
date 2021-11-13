import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class PostsService {

  async getAll(query = '') {
    const res = await api.get('api/posts' + query)
    logger.log('get all posts', res.data)
    AppState.posts = res.data.posts
    AppState.page = res.data.page
    AppState.totalPages = res.data.totalPages
  }

  async likePost(id) {
    const res = await api.post('api/posts/' + id + '/like')
    logger.log('liked', res.data.posts)
  }

}
export const postsService = new PostsService()