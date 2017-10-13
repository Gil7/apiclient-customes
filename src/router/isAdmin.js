import { store } from '../store/store'

export default (to, from, next) => {
  const user = store.getters.user
  if (user.isAdmin === 1) {
    next()
  }
  else {
    next('/sales')
  }
}
