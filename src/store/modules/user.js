console.log(localStorage)
const state = {
  token: localStorage.getItem('userInfo') ? JSON.parse(localStorage.userInfo).token : '',
  name: localStorage.getItem('userInfo') ? JSON.parse(localStorage.userInfo).name : '',
  password: localStorage.getItem('userInfo') ? JSON.parse(localStorage.userInfo).password : '',
  avatar: localStorage.getItem('userInfo') ? JSON.parse(localStorage.userInfo).avatar : ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_PASSWORD: (state, password) => {
    state.password = password
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_DATA: (state, data) => {
    for(let i in data){
      state[i] = data[i]
    }
  }
}
const actions = {
  login({commit}, userInfo){
    return new Promise((resolve) => {
      console.log(userInfo)
      commit('SET_DATA', userInfo)
      resolve('11111111111')
    })
  },
  logout({commit}){
    commit('SET_TOKEN', '')
  }
}
export default{
  namespaced: true,
  state,
  mutations,
  actions
}