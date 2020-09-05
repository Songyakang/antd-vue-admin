<template>
  <div @drop='yes' data-target='father' @dragover="oky" class="componentView">
    <div class="scroll-item" data-target='father'>
      {{fmtlist}}
      <div v-for='(item, index) in list' :key='index' class="group">
        <div :class='item.will ? "opactiy":""' :data-target='index' @dragstart='oho(index)' draggable class="div">{{item.title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'componentView',
  computed: {
    fmtlist(){
      return this.willData
    }
  },
  watch:{
    preindex(val){
      this.$emit('preview', val)
    }
  },
  props:{
    list:{
      type: Array
    },
    willData:{
      type: Object
    }
  },
  data(){
    return {
      dropTime: null,
      preindex: -1
    }
  },
  methods:{
    oky(e){
      e.preventDefault()
      if(this.dropTime == null){
        this.dropTime = setTimeout(() => {
          this.preindex = e.toElement.getAttribute('data-target') == 'father' ? this.list.length : e.toElement.getAttribute('data-target')
          this.dropTime = null
        }, 20)
      }
    },
    oho(index){
      this.$emit('changeindex', {index})
    },
    yes(e){
      if('father' == e.toElement.getAttribute('data-target')){
        this.$emit('pushlast', this.list.length)
      }else{
        this.$emit('pushlast', e.toElement.getAttribute('data-target'))
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.componentView{
  width: 375px;
  background: #f2f2f2;
  height: 667px;
  margin: 0 auto;
  overflow: hidden;
  -moz-user-select: none; 
  -khtml-user-select: none; 
  user-select: none;
}
.div{
  height: 100px;
  background: pink;
  margin: 10px
}
.opactiy{
  opacity: 0.5;
}
</style>
