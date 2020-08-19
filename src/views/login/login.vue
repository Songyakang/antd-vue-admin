<template>
  <div class="hello">
    <div class='panel'>
      <div>
        {{type | titlefmt}}
      </div>
      <div v-if='type == 1'>
        <login-panel @change='changetype' />
      </div>
      <div v-else-if='type == 2'>
        <register @change='changetype'/>
      </div>
      <div v-else-if='type == 3'>
        <forgot-password @change='changetype'/>
      </div>
    </div>
  </div>
</template>

<script>
import forgotPassword from './components/forgotPassword'
import loginPanel from './components/login'
import register from './components/register'
export default {
  name: 'login',
  created(){
    this.form.remember = this.$store.state.user.remember
    if(this.$store.state.user.remember){
      this.form.name = this.$store.state.user.name
      this.form.password = this.$store.state.user.password
    }
  },
  components:{
    forgotPassword,
    loginPanel,
    register
  },
  filters:{
    titlefmt(val){
      return ({
        1: '登录',
        2: '注册',
        3: '找回密码',
      })[val]
    }
  },
  data(){
    return {
      type: 1,
      form: {
        name: '',
        password: '',
        remember: false
      }
    }
  },
  methods: {
    changetype(e){
      this.type = e.type
      console.log(e)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.hello{
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('../../assets/loginbackground.jpg');
  background-size: 100% 100%;
  min-width: 900px;
  position: relative;
  .panel{
    width: 350px;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 5px;
    box-shadow: 0px 0px 10px #e2e2e2, 0px 0px 10px #e2e2e2 inset;
    background-color: rgba(255, 255, 255, 0.1);
    position: absolute;
    bottom: 10vh;
    right: 10vh;
  }
}
</style>
