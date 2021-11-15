import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  profile: {},
  posts: [],
  page: {},
  totalPages: [],
  newer: {},
  older: {},
  banner1: [],
  banner2: []
})
