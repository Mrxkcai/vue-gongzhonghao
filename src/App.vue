<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/demo">Demo</router-link>
    </div> -->
    <router-view/>
    <!-- 底部选项卡 -->
    <tabbar style="position: fixed;">
      <tabbar-item selected link="/" selected>
          <span slot="label">首页</span>
        </tabbar-item>
        <tabbar-item badge="2" link="/my">
          <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>
<script>
// 引入 vux tabbar 组件
  import { Tabbar, TabbarItem } from 'vux'

  export default {
    name: 'app',
    components:{
      Tabbar,
      TabbarItem
    },
    data() {
      return {
        select: "index"
      }
    }
  }
</script>
