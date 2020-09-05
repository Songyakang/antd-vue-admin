<template>
  <div class="componentList">
    <div v-for='(item, index) in listfmt' :key='index' class="group">
      <div class="group-title">
        <span>{{item.title}}</span>
        <a-icon v-show='item.show' type="up" />
        <a-icon v-show='!item.show' type="down" />
      </div>
      <div class="group-list">
        <div 
          @click.stop='$emit("add-data", {data: child})' 
          @dragstart='oho(child)' 
          :draggable="child.draggable" 
          v-for='(child, cindex) in item.list' 
          :key='cindex'>{{child.title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'componentList',
  computed: {
    listfmt(){
      let data = this.list.map(e => {
        let num = 4 - e.list.length % 4
        if(num != 4){
          for(let i = 0; i < num; i++){
            e.list.push({name: '', pic_url: '', draggable: false})
          }
        }
        return e
      })
      return data
    }
  },
  props:{
    list:{
      type: Array
    }
  },
  data(){
    return {
    }
  },
  methods:{
    oho(e){
      this.$emit('addData', {data: e})
    }
  }
}
</script>
<style lang='scss' scoped>
$itempx: calc(350px / 4);
.componentList{
  .group{
    .group-title{
      font-size: 16px;
      padding: 10px;
    }
    .group-list{
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      div{
        box-sizing: border-box;
        border: 1px solid #f2f2f2;
        height: $itempx;
        text-align: center;
      }
    }
  }
}
</style>
