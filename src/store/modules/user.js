console.log(localStorage)
const state = {
  token: localStorage.getItem('userInfo') ? JSON.parse(localStorage.userInfo).token : '',
  name: localStorage.getItem('userInfo') ? JSON.parse(localStorage.userInfo).name : '',
  password: localStorage.getItem('userInfo') ? JSON.parse(localStorage.userInfo).password : '',
  avatar: localStorage.getItem('userInfo') ? JSON.parse(localStorage.userInfo).avatar : '',
  remember: localStorage.getItem('userInfo') ? JSON.parse(localStorage.userInfo).remember : false
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
  },
  INIT_DATA: (state) => {
    state.token = ''
    state.name = ''
    state.password = ''
    state.avatar = ''
    state.remember = false
  }
}
const actions = {
  login({commit}, userInfo){
    console.log(state.userInfo)
    return new Promise((resolve) => {
      localStorage.userInfo = JSON.stringify(userInfo)
      commit('SET_DATA', userInfo)
      resolve('11111111111')
    })
  },
  logout({commit}){
    return new Promise((resolve) => {
      console.log(state.remember)
      if(!state.remember){
        localStorage.userInfo = '{}'
        commit('INIT_DATA')
      }
      commit('SET_TOKEN', '')
      resolve('11111111111')
    })
  }
}
export default{
  namespaced: true,
  state,
  mutations,
  actions
}