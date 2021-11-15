import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class PostsService {

  async getAll(query = '') {
    const res = await api.get('api/posts' + query)
    logger.log('newer check', res.data)
    AppState.posts = res.data.posts
    AppState.page = res.data.page
    AppState.totalPages = res.data.totalPages
    AppState.newer = res.data.newer
    AppState.older = res.data.older
  }

  async likePost(id) {
    const res = await api.post('api/posts/' + id + '/like')
    logger.log('liked', res.data.posts)
  }

  async createPost(postData) {
    const res = await api.post('api/posts', postData)
    logger.log('post data', res.data)
    AppState.posts.unshift(res.data)
  }

  async remove(id) {
    console.log(id)
    const res = await api.delete('api/posts/' + id)
    logger.log('delete', res.data)
    AppState.posts = AppState.posts.filter(p => p.id !== id)
  }

  async findPostBySearch(query, page) {
    const res = await api.get('api/posts?page=' + page)
    logger.log('page logging', res.data)
  }
}
export const postsService = new PostsService()