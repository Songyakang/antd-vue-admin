<template>
  <div ref='three' id="three">
  </div>
</template>

<script>
import * as three  from 'three'
export default {
  name: 'three',
  props: {
    width: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 500
    },
    s:{
      type: Number,
      default: 100
    }
  },
  computed: {
    /**
     * 计算窗口宽高比
     */
    k(){
      return this.width / this.height
    }
  },
  mounted(){
    this.init()
    this.rotateX(0.01, 33)
    this.controls()
  },
  beforeDestroy(){
    for(let i of this.Inter){
      clearInterval(i)
    }
  },
  data(){
    return {
      scene: null,
      geometry: null,
      material: null,
      mesh: null,
      point: null,
      ambient: null,
      renderer: null,
      camera: null,
      Inter: []
    }
  },
  methods: {
    //初始化thireejs
    init(){
      //创建场景对象Scene
      this.scene = new three.Scene() 
      //创建网格模型
      this.geometry = new three.BoxGeometry(100, 100, 100) //创建一个立方体几何对象Geometry
      //this.geometry = new three.SphereGeometry(100, 100, 100) //创建一个球体几何对象Geometry
      this.material = new three.MeshLambertMaterial({ //材质对象Material
        color: 0xff8844
      })
      this.mesh = new three.Mesh(this.geometry,  this.material) //网格模型对象Mesh
      this.scene.add(this.mesh) //网格模型添加到场景中

      //光源设置
      this.point = new three.PointLight(0xffffff) //点光源
      this.point.position.set(100, 100, 100)
      this.scene.add(this.point)

      this.ambient = new three.AmbientLight(0x000000) //环境光
      this.scene.add(this.ambient)


      //相机设置
      //创建相机对象
      this.camera = new three.OrthographicCamera(-this.s * this.k, this.s * this.k, this.s, -this.s, 1, 1000) 
      this.camera.position.set(200, 200, 200) //设置相机位置
      this.camera.lookAt(this.scene.position) //设置相机方向
      
      //创建渲染器对象
      this.renderer = new three.WebGLRenderer()
      this.renderer.setSize(this.width, this.height)//设置渲染区域尺寸
      this.renderer.setClearColor(0xb9d3ff, 1)//设置背景颜色

      this.$refs.three.appendChild(this.renderer.domElement)//body元素中插入canvas对象
      //执行渲染操作
      this.renderer.render(this.scene, this.camera)
    },
    /**
     * @params {Number} radian 弧度
     * @params {Number} time 时间
     */
    rotateX(radian = 0.02, time = 33){
      this.Inter.push(setInterval(() => {
        this.renderer.render(this.scene, this.camera)
        this.mesh.rotateX(radian)
      }, time))
    },
    /**
     * @params {Number} radian 弧度
     * @params {Number} time 时间
     */
    rotateY(radian = 0.02, time = 33){
      this.Inter.push(setInterval(() => {
        this.renderer.render(this.scene, this.camera)
        this.mesh.rotateY(radian)
      }, time))
    },
    /**
     * @params {Number} radian 弧度
     * @params {Number} time 时间
     */
    rotateZ(radian = 0.02, time = 33){
      this.Inter.push(setInterval(() => {
        this.renderer.render(this.scene, this.camera)
        this.mesh.rotateZ(radian)
      }, time))
    },
    /**
     * @params {Number} radian 弧度
     * @params {Number} time 时间
     */
    controls(){
      
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#three{
  background: rgba(0,0,0,0.5);
  line-height: 0;
}
</style>
