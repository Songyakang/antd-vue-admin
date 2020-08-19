<template>
  <div id="editor">
  </div>
</template>

<script>
import wangeditor from 'wangeditor'
export default {
  name: 'editor',
  props: {
    data: String
  },
  mounted(){
    this.editor = new wangeditor('#editor')
    this.editor.customConfig.onblur = (html) => {
      console.log('onblur', html)
    }
    this.editor.create()
    console.log(this.editor)
  },
  data(){
    return {
      editor: null
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
