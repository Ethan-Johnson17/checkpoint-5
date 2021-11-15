export class Post {
  constructor(data) {
    this.body = data.body
    this.createdAt = data.createdAt
    this.creatorId = data.creatorId
    this.id = data.id
    this.likes = data.likes
    this.likeIds = data.likeIds
  }
}