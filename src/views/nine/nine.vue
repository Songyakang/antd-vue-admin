<template>
  <div class="hello">
    <a-form-model layout='inline'>
      <a-form-item label='速度'>
        <a-input v-model='spead' />
      </a-form-item>
      <a-form-item label='初始轮数'>
        <a-input v-model='nums' />
      </a-form-item>
      <a-form-item label='终点'>
        <a-input v-model='ans' />
      </a-form-item>
      <a-button @click.stop='endd'>stop</a-button>
    </a-form-model>
    <div class="luckdraw">
      <div class="panel">
        <template v-for='item in 9'>
          <div v-if='item != 5' :key='item' :class='item == bindindex ? "bind":""' class="panel-item">{{item}}</div>
          <div v-else @click.stop='letsgo' :key='item' class="panel-item">点击开始</div>
        </template>
      </div>
      <div v-for='item in 26' :key='item' :class="'crlice'+item"></div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'login',
  created(){
    
  },
  components:{
  },
  filters:{
  },
  data(){
    return {
      bindindex: 1,
      datalist: [1, 2, 3, 6, 9, 8, 7, 4],
      spead: 10,
      nums: 40,
      ans: 9,
      timeOut: null,
      flag: true
    }
  },
  methods: {
    loop(i){
      return new Promise((reslove) => {
        this.timeOut = setTimeout(() => {
          this.bindindex = this.datalist[i % this.datalist.length]
          reslove('ok')
        }, this.spead + i * 10)
      })
    },
    endd(){
      clearTimeout(this.timeOut)
      this.timeOut = null
    },
    async letsgo(){
      if(this.flag){
        this.flag = false
        let nums = this.nums + this.datalist.indexOf(this.ans) + 1
        for(let i =0; i < nums; i ++){
          await this.loop(i)
        }
        this.flag = true
      }else{
        this.$message.info('请等待档次抽奖结束')
      }
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$width: 530px;
$height: 530px;
.border{
  background: #FFD70D;
  display: inline-block;
  padding: 15px;
  border-radius: 10px;
  position: relative;
  .fa{
    background: red;
    border-radius: 10px;
    padding: 10px;
    width: $width;
    box-sizing: border-box;
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 10px;
    row-gap: 10px;
    div{
      height: calc((500px - 20px) / 3);
      background: pink;
      justify-content: center;
      align-items: center;
      display: flex;
      border-radius: 10px;
    }
  }
} 
  @for $i from 1 through 26 {
    .crlice#{$i}{
      border-radius: 50%;
      width: 8px;
      height: 8px;
      position: absolute;
      @if($i % 2 != 0){
        background: red;
        animation: 1s odd linear infinite;
      }@else{
        background: white;
        animation: 1s even linear infinite;
      }
    }
  }
  .crlice1{
    left: 8px;
    top: 8px;
  }
  @for $i from 2 through 7 {
    .crlice#{$i}{
      left: ($width / 7 ) * ($i - 1);
      top: 3.5px;
    }
  }
  .crlice8{
    right: 8px;
    top: 8px;
  }
  @for $i from 9 through 13 {
    .crlice#{$i}{
      right: 3px;
      top: ($height - 53px) / 5 * ($i - 8);
    }
  }

  .crlice14{
    right: 8px;
    bottom: 7px;
  }

  @for $i from 15 through 20 {
    .crlice#{$i}{
      right: ($width - 53px) / 6 * ($i - 14);
      bottom: 4px;
    }
  }

  .crlice21{
    left: 8px;
    bottom: 10px;
  }

  @for $i from 22 through 26 {
    .crlice#{$i}{
      left: 4px;
      bottom: ($height - 53px) / 5 * ($i - 21);
    }
  }

  @keyframes even {
    0% {
      background: red;
    }

    100% {
      background: #fff;
    }
  }
  @keyframes odd {
    0% {
      background: #fff;
    }

    100% {
      background: red;
    }
  }
  .bind{
    background: yellow !important;
  }
</style>
