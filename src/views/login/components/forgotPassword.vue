<template>
  <div>
    <div>
      <span>账号: </span>
      <input v-model='form.name'/>
    </div>
    <div>
      <span>密码: </span>
      <input v-model='form.password'/>
    </div>
    <div>
      <div></div>
      <div @click='$emit("change", {type: 1})'>取消</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  created(){
    this.form.remember = this.$store.state.user.remember
    if(this.$store.state.user.remember){
      this.form.name = this.$store.state.user.name
      this.form.password = this.$store.state.user.password
    }
  },
  data(){
    return {
      form: {
        name: '',
        password: '',
        remember: false
      }
    }
  },
  methods: {
    handleSubmit(){
      this.$store.dispatch('user/login',{
        ...this.form
      }).then(() => {
        this.$router.push({path: '/about'})
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-form{
  width: 350px;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 5px;
  box-shadow: 0px 0px 10px #f2f2f2;
}
</style>
