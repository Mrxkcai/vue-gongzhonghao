<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/demo">Demo</router-link>
    </div> -->
    <router-view/>
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

<style>
  html,body,#app {
    width: 100%;
    height: 100%;
    background-color: #F3F4F9;
  }
</style>
