<template>
    <div class="compete">
        <div class="fixTab">
            <tab :line-width="2" active-color="#575D6F" default-color="#CBCED5" custom-bar-width="50px">
                <tab-item selected @on-item-click="getItem">拍卖中</tab-item>
                <tab-item @on-item-click="getItem">待支付</tab-item>
                <tab-item @on-item-click="getItem">已完成</tab-item>
            </tab>
        </div>
        <p style="height: 44px;"></p>
        
        <div>
            <div class="item" v-for=" i,index in 10 " >
                <p class="inTime">预计结拍时间：<span>12.01 12:00</span></p>
                <div class="clear">
                    <span class="brage">领先</span>
                    <span class="tiemPower">2019年 西安国际马拉松 A99999 的使用权</span><p style="clear: both;"></p>
                </div>
                
                <div class="clear nowMoney">
                    <span>当前价：</span>
                    <span>¥ </span>
                    <span>3000.00</span>
                    <span>查看</span>
                    <span @click="getIndex(index)">
                        <x-switch title="" v-model="show" style="width:70px"></x-switch>
                    </span>
                    
                </div>
            </div>
            
            <div v-transfer-dom>
              <popup v-model="show" @on-hide="log('hide')" @on-show="log('show')">
                <div class="popup0">
                  <div>
                      <span class="brage">领先</span>
                      <span class="tiemPower">2019年 西安国际马拉松 <span class="numberTip">A99999</span> 的使用权</span><p style="clear: both;"></p>
                      
                      <div class="infoItem">
                          <p><span>姓名</span><span>王某某</span></p>
                          <p><span>证件号</span><span>610302199107202062</span></p>
                          <p><span>成交价</span><span><span>¥ </span><span style="font-weight: 600;">3000</span></span></p>
                      </div>
                  </div>
                </div>
              </popup>
            </div>
            
            
        </div>
    </div>
</template>

<script>
    import { Tab, TabItem, Popup, TransferDom, Group, XSwitch } from 'vux'
    export default {
        directives: {
            TransferDom
          },
      components: {
        Tab,
        TabItem,
        Popup,
        TransferDom,
        Group,
        XSwitch
      },
      data(){
          return {
             list:[] ,
             show: false,
             showToast:false
          }
       },
      methods:{
          getItem(index){
              // console.log(index)
          },
          log (str) {
              // console.log(str)
            },
            
        getIndex(index){
            // console.log(index)
        }
            
       },
     }

</script>
<style lang="less" scoped >
    @d:{display: inline-block};
    a,img,button,input,textarea{-webkit-tap-highlight-color:rgba(255,255,255,0);}
    .compete{
        background-color: rgba(222,222,222,0);
    }
   .fixTab{
       width: 100%;
       position: fixed;
       top: 0;
       left: 0;
   }
   .item{
       width: 341px;
       height: 127px;
       background: #fff;
       margin: 18px auto 0;
       border-radius:10px;
       overflow: hidden;
       position: relative;
   }
   .inTime{
       font-size:12px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(241,127,26,1);
        line-height:17px;
        margin: 14px 0 0 20px;
   }
   .brage{
       @d();
       width: 37px;
       height: 15px;
       background:rgba(240,168,0,1);
        border-radius:3px;
        color: #fff;
        line-height: 16px;
        text-align: center;
        margin: 17px 0 0 20px;
        float: left;
   }
   .tiemPower{
       @d();
       color: #192137;
       width: 258px;
       height: 15px;
       line-height: 16px;
       font-size:13px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        float: left;
        margin: 17px 0 0 4px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        .numberTip{
            font-size:24px;
            font-family:DINAlternate-Bold;
            font-weight:bold;
            color:rgba(240,168,0,1);
        }
   }
   .clear{
       clear: both;
   }
   .nowMoney{
       margin: 24px 0 0 20px;
   }
   .nowMoney>span:nth-child(1){
       font-size:13px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(87,93,111,1);
   }
   .nowMoney>span:nth-child(3){
        font-size:15px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(25,33,55,1);
   }
   .nowMoney>span:nth-child(4){
       @d();
   	 width:75px;
   	height:30px;
   	background:rgba(255,255,255,1);
   	border-radius:16px;
   	border:1px solid rgba(87,93,111,1);
    font-size:13px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(87,93,111,1);
    line-height:30px;
    text-align: center;
    float: right;
    margin: 0 20px 0 0 ;
   }
   .nowMoney>span:nth-child(5){
       @d();
       width:75px;
       height:30px;
       background:#eee;
       border-radius:16px;overflow: hidden;
       position: absolute;
       right: 20px;
       opacity: 0;
   }
   .nowMoney>span:nth-child(5) /deep/ .weui-switch:before{
       width: 77px;
   }
   .nowMoney>span:nth-child(5) /deep/ .weui-switch:after{
   	width: 77px;
   }
   .nowMoney>span:nth-child(5) /deep/ .weui-switch{
   	width: 77px;
   }
   .nowMoney>span:nth-child(5)>div{
       width: 100%;
       height: 100%;
       float: left;
       margin-top: -5px;
       // padding-left: 15px;
       overflow: hidden;
   }
   .nowMoney>span:nth-child(5)>div>div{
       float: left;
       margin: 0;
       line-height: 0;
   }
  
  .v-transfer-dom{background: #F9F9FC;}
  .popup0 .brage{
      margin: 25px 2px 0 20px;
  }
  .popup0 .tiemPower{
      height: 100%;
      line-height: 25px;
  }
  .infoItem{
      width: 340px;
      margin: 26px auto 20px;
      background: #fff;
      overflow: hidden;
      border-radius: 10px;
  }
  .infoItem>p{
      height: 30px;
      padding: 0 20px;
      margin: 15px 0 0 0;
  }
  .infoItem>p>span:nth-child(1){
      @d();
      float: left;
      font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(87,93,111,1);
        line-height:20px;
  }
  .infoItem>p>span:nth-child(2){
  	@d();
  	float: right;
  	font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(25,33,55,1);
    line-height:20px;
   }
</style>
