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
    .weui-cells {
        margin-top: 0!important;
        border-radius: 10px;
    }

    .weui-cells:after {
        border-bottom: none;
    }

    .weui-cell:before {
        left: 0!important;
    }

    .vux-label {
        font-size: 15px;
        font-weight: 400;
        color: #575D6F;
        line-height: 21px;
    }   

    .weui-cell_access .weui-cell__ft, 
    .vux-label-desc {
        font-size:15px;
        font-weight:400;
        color:#192137!important;
        line-height:21px;
        padding-right: 24px!important;
    }

    .weui-cell:nth-child(2) span {
        display:none;
    }

    .popup-container {
        width: 70%;
        padding: 15px;
        background-color:#fff;
        margin:0 auto;
        border-radius: 10px;
    }

    .weui-btn_default {
        font-size: 16px;
        font-weight: 500;
        color:#fff!important;
    }
    .popup-container {
        padding: 34px 0.8rem;
    }

    .popup-container button{
        font-size: 16px;
        font-weight: 500;
        border-radius: 99px;
        margin-top: 26px;
        width: 6rem;
        height: 44px;
    }

    .weui-cells:nth-child(1)::before {
        border: none;
    }

    button.sendcode-btn {
        font-size: 12px!important;
        width: 4.2rem!important;
        height: 40px;
        margin: 0;
    }

    .change-container input {
        font-size: 13px;
    }
    .tips:before {
        content: "*";
        margin-right: 5px;
    }
</style>
