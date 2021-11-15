export class Account {
  constructor(accountData = {}) {
    this.id = accountData.id
    this.email = accountData.email
    this.name = accountData.name
    this.picture = accountData.picture
    this.bio = accountData.bio
    this.github = accountData.github
    this.linkedin = accountData.linkedin
    this.resume = accountData.resume
    this.class = accountData.class
    this.graduated = accountData.graduated || false
  }
}