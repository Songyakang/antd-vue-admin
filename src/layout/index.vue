<template>
  <div id="app">
    <a-layout id="components-layout-demo-custom-trigger">
      <a-layout-sider collapsible :trigger="null" v-model="collapsed">
        <div style="width: 200px; overflow: hidden;">
          <div class="logo">
            <img />
            <div v-show="!collapsed"></div>
          </div>
          <a-menu
            theme="dark"
            style="height: calc(100vh - 64px)"
            mode="inline"
            :openKeys="openKeys"
            :selectedKeys="selectedKeys"
            @click="bindPath"
            @openChange="openChange"
          >
            <template v-for="item in routesfmt">
              <a-sub-menu
                :key="item.name"
                v-if="item.children && item.children.length != 0"
              >
                <div class="menu-item" slot="title" @click="go(item)">
                  <a-icon :type="item.icon" v-if="item.icon" />
                  <span v-show="!collapsed">{{ item.name }}</span>
                </div>
                <a-menu-item
                  :key="chitem.name"
                  v-for="chitem in item.children"
                  @click="go(chitem)"
                >
                  <a-icon v-if="chitem.icon" :type="chitem.icon" />
                  <span>{{ chitem.name }}</span>
                </a-menu-item>
              </a-sub-menu>
              <a-menu-item :key="item.name" v-else @click="go(item)">
                <a-icon :type="item.icon" v-if="item.icon" />
                <span>{{ item.name }}</span>
              </a-menu-item>
            </template>
          </a-menu>
        </div>
        
      </a-layout-sider>
      <a-layout>
        <a-layout-header class="header">
          <div class="right-group">
            <div>
              <a-badge dot>
                <a-icon type="bell" />
              </a-badge>
            </div>
            <div>
              <a-icon
                class="fullscreen"
                :type="fullScreen ? 'fullscreen-exit' : 'fullscreen'"
                @click="doFull"
              />
            </div>
            <div>管理员：{{ $store.state.user.real_name }}</div>
            <div>账号：{{ name }}</div>
          </div>
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
          />
          <a-popover trigger="hover">
            <div style="position: absolute; right: 0px; padding: 0 40px">
              <a-icon type="down" />
            </div>
            <template slot="content">
              <p @click.stop="cancellation">注销</p>
            </template>
          </a-popover>
        </a-layout-header>
        <a-layout-content
          style="max-height: calc(100vh - 64px); overflow-y: scroll"
        >
          <div class="content">
            <app-main v-if="show" />
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
import appMain from "./components/appMain"

export default {
  name: "app",
  components: {
    appMain
  },
  computed: {
    routesfmt() {
      let route = this.$store.state.router.router.map((e) => {
        let data = {
          icon: "",
          ...e
        }
        if (Object.prototype.hasOwnProperty.call(e, "children")) {
          data.children = e.children.filter((i) => !i.hidden).map((i) => {
            return {
              icon: "",
              ...i
            }
          })
        }
        return data
      }).filter((e) => !e.hidden)
      return route
    },
    avatar() {
      if (this.$store.state.user.avatar) {
        return this.$store.state.user.avatar
      } else {
        return require("@/assets/logo2.png")
      }
    },
    name() {
      return this.$store.state.user.name
    },
  },
  data() {
    return {
      collapsed: false,
      openKeys: [""],
      selectedKeys: [""],
      show: true,
      fullScreen: false
    }
  },
  created() {
    for (let i of this.routesfmt) {
      if (i.children.find((e) => e.path == this.$route.path)) {
        this.openKeys = [i.name]
        this.selectedKeys = [
          i.children.find((e) => e.path == this.$route.path).name
        ]
        return false
      }
    }
  },
  methods: {
    cancellation() {
      this.$store.dispatch("user/logout").then(() => {
        this.$router.push({ path: "/login" })
      })
    },
    /**
     * 路由跳转
     * @date 2020/8/19
     * @author 咸鱼康宝宝
     */
    go(e) {
      console.log(e)
      if (e.children) {
        this.selectedKeys = [e.name]
      }
      if (e.path == this.$route.path) {
        this.show = false
        setTimeout(() => {
          this.show = true
        }, 100)
      } else {
        this.$router.push({ path: e.path })
      }
    },
    openChange(e) {
      if (e.length !== 0) {
        this.openKeys = [e[1]]
        this.selectedKeys = [this.routesfmt.find((a) => a.name == e[1]).children[0].name]
      } else {
        this.openKeys = [""]
      }
    },
    bindPath(e) {
      this.selectedKeys = [e.key]
    },
    doFull() {
      let element = document.documentElement
      if (this.fullScreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen()
        }
      }
      this.fullScreen = !this.fullScreen
    }
  }
}
</script>
<style scoped>
.logo {
  height: 64px;
  line-height: 64px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo > img {
  width: 40px;
  border-radius: 50%;
}

.logo > div {
  margin-left: 10px;
}

.menu-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.ant-menu-submenu{
  width: 200px;
}
.ant-menu{
  width: 220px;
  padding-right: 20px;
  overflow-y: auto;
  overflow-x: hidden;
}
.ant-layout-sider{
  overflow: hidden;
}
.ant-menu-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
#components-layout-demo-custom-trigger{
  height: 100vh;
  overflow: hidden;
}

.header {
  background: #fff;
  border-bottom: 1px solid #f2f2f2;
  padding: 0 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
}

.content {
  margin: 24px 16px;
  padding: 24px;
  background: #fff;
  min-height: 280px;
}

.right-group {
  position: absolute;
  right: 50px;
  display: flex;
}

.right-group div {
  margin-right: 20px;
}

.right-group .fullscreen {
  cursor: pointer;
}
</style>
