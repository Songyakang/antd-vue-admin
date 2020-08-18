<template>
  <div class="about">
    <h1>1111111111</h1>
  </div>
</template>
<script>
import avatar from '@/assets/timg.jpg'
export default {
  name: 'about',
  created(){
    this.todo()
  },
  methods: {
    todo(){
      this.$store.dispatch('user/login', {name: '11', token: '', password: '', avatar: avatar}).then(res => {
        console.log(res)
      })
    }
  }
}
</script>
