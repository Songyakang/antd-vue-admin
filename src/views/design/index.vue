<template>
  <div class="design">
    <div class="left">
      <component-list @add-data='addData' @addData='setPushData' :list='list'/>
    </div>
    
    <div>
      <component-view 
        @changebind='changebind' 
        :willData='willData' 
        @preview='preview' 
        @pushlast='pushlast' 
        :list='data' 
        @changeindex='changeindex'/>
    </div>
    <div class="right">
      <a-button @click='data = []'>清空</a-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components:{
    componentList: () => import('./components/componentList'),
    componentView: () => import('./components/view')
  },
  data(){
    return{
      list: [
        {
          title: '普通组件', 
          list: [
            {name: 'diydiv',title: '块', pic_url: 'xixixi', draggable: true, id: 1}
          ]
        }
      ],
      data: [],
      willData:{},
      willIndex: -1,
      type: null
    }
  },
  methods:{
    /**
     * 添加数据
     */
    addData(e){
      this.data.push({...e.data, title: `${e.data.title}${this.data.length}`})
    },
    /**
     * 设置即将添加(拖拽)的数据
     */
    setPushData(e){
      this.willData = {...e.data, title: `${e.data.title}${this.data.length}`, will: true}
    },
    /**
     * 更改下标
     */
    changeindex(e){
      this.willData = {...this.data[e.index], will: true}
      this.data[e.index] = this.willData
      this.willIndex = e.index
      this.type = 2
    },
    changebind(){
      this.data = this.data.map(e => {
        delete e.will
        return e
      })
    },
    /**
     * 视图区域移动渲染
     * @param {number} e 指定下标
     */
    preview(e){
      this.data = this.data.filter(o => !o.will)
      console.log(e, this.data.length)
        if(e >= this.data.length){
          this.data.push(this.willData)
          console.log('tianjia')
        }else{
          this.data.splice(e, 0, this.willData)
          console.log('替换')
        }
        this.willIndex = e
    },
    /**
     * 视图区域移动数据
     * @param {number} e 指定下标
     */
    pushlast(e){
      try{
        delete this.data[this.willIndex].will
      }catch(err){
        console.log('下标', this.willIndex, e, this.data)
      }
      
      //初始化参数
      this.willIndex = -1
      this.willData = {}
      this.type = null
    }
  }
}
</script>
<style lang='scss' scoped>
.design{
  display: flex;
  .left, .right{
    width: 350px;
  }
  & :nth-child(2){
    flex: 1;
  }
}
</style>
