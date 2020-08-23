<template>
  <div class="goodsList">
    <a-button @click='$router.push({path: "/goodsDetail"})'>商品列表</a-button>
    1
    <threejs/>
  </div>
</template>

<script>
export default {
  name: 'goodsList',
  created(){
  },
  components:{
    threejs: () => import('@/components/three.vue')
  },
  filters:{
  },
  data(){
    return {
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.goodsList{}
</style>
