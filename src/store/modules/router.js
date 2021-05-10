const state = {
  router: localStorage.getItem('router') ? JSON.parse(localStorage.router) : [
    { path: '/login', name: 'login', icon: 'account-book', hidden: true },
    { path: '/404', name: '无页面', hidden: true, icon: 'setting' }
  ]
}

const mutations = {
  SET_ROUTER: (state, router) => {
    state.router = router
  },
}
const actions = {
  //用户登录
  setRouter({ commit }, router) {
    return new Promise((resolve) => {
      localStorage.router = JSON.stringify(router)
      commit('SET_ROUTER', router)
      resolve('ok')
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
