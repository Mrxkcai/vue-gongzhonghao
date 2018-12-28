<template>
  <div class="compete-chat flex-box">
      <!-- 顶部竞拍信息 -->
      <div class="compete-chat-top">
        <div class="now">
          <div>正在进行: <span class="end-time">预计 {{createDate}} 结束</span></div>
          <router-link to="./">购买协议</router-link>
        </div>
        <p class="">
          {{matchName}} <span class="compete-number">{{ name }}</span> 的使用权
        </p>
        <div class="current-content">
          <div>
            <span class="current-price">{{ currentAmount }}</span> 当前价 (元)
          </div>
          <div>
            <p>围观：{{ totalMember }}次</p>
            <p>出价：0人</p>
          </div>
        </div>
      </div>
      <!-- 聊天室 -->
      <view-box ref="chatRome" id="box" style="width:100%;">
        <div class="variable">
          <div class="compete-chat-content" v-for="n in chatLists">
            <!-- 自己 -->
            <div class="me" v-if="username == n.othername">
              <div class="chat-box">
                <p>
                  <span class="chat-time"> {{ n.otherctime | formatDate }}</span>
                  <span class="nickname">{{ username }}</span>
                </p>
                <span class="chat-content">
                  {{ n.othercontent }}
                </span>
              </div>
              <div>
                <img class="avator" src="https://coding.net/static/project_icon/scenery-18.png">
              </div>
            </div>

            <!-- 他人 -->
            <div class="other" v-else>
              <div>
                <img class="avator" src="https://dn-coding-net-production-static.codehub.cn/9568ba84-1469-45b4-aa34-1f1fca86fbf2.jpg">
              </div>
              <div class="chat-box">
                <p>
                  <span class="nickname">{{ n.othername }}</span>
                  <span class="chat-time"> {{ n.otherctime | formatDate }}</span>
                </p>
                <span class="chat-content">
                  {{ n.othercontent }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </view-box>
      <!-- footer -->
      <div class="compete-chat-bottom bottom">
        <div class="comments">
          <x-input title='评论' placeholder="我来说几句" text-align="left" v-model="commentVal" @on-enter="commentHandle" style="font-size:15px;"></x-input>
        </div>
        <div class="offer">
          <div style="width: 60%;">
            <x-input placeholder="每次最低加价20元" :show-clear="false" type="number" v-model="offer" style="font-size:15px;"></x-input>
            <span class="plus-icon" @click="addPrice">+</span>
          </div>
          <div>
            <x-button type="warn" @click.native="nowOffer">立即出价</x-button>
          </div>
        </div>
      </div>
      <loading :show="getRoomData" text="获取信息中..."></loading>
      <toast v-model="showToast" position="top" type="text" :time=1500 :text="toastMsg"></toast>
  </div>
</template>
<script>
  import { ViewBox, XInput, XButton, Toast, Loading } from 'vux';
  import { sign, getChatRoom, getImInfo, getAuctionInfo, getOffer } from '@/service/api'
  import { formatTime, Storage } from '../../utils/utils'
  /* eslint-disable */
  
  let JIM = new JMessage();

  export default {
    name: 'competeChat',
    components: {
      ViewBox,
      XInput,
      XButton,
      Toast,
      Loading
    },
    data() {
      return {
        getRoomData: true,
        me:{},
        toastMsg: '进入房间',            // toast提示
        createDate: '',
        matchName: '',      // 赛事名称 
        currentAmount: '0', // 当前价格
        addAmount: 0,       // 加价幅度
        name: '',           // 号码
        status: 0,          // 状态 0 正常状态 1 锁定状态 2 等待支付状态 3 交易成功状态
        numberExtend: {
        },
        showToast: true,
        appKey: '95d9177779dbbe2d94375e96',
        randomStr: '', // 随机字符串   
        timestamp: '', // 当初时间戳
        signature: '', // 签名
        flag: '1',     // 是否启用消息记录漫游，默认 0 否，1 是
        roomId: '12909551',
        password: '',
        username: '',
        chatLists: [],     // 消息列表
        currentPrice: '10.00',
        commentVal: '',
        commentsList: [],
        offer: 0.00,       // 出价
        totalMember: 0     // 当前聊天室总人数
      }
    },
    created() {
      // this.$router.beforeEach((to, from, next) => {
      //     if(to.name === index) {
      //       this.exitRoom()
      //     }
      //     next();
      // });
      // window.addEventListener('beforeunload', e => {
      //     this.exitRoom()
      // });
    },
    mounted() {
      //this.loginRome()
      getAuctionInfo({auctionNumberId: this.$route.query.id}).then(res => {
        if(res.code == 200) {
          this.addAmount = res.data.addAmount;
          this.amount = res.data.amount;
          this.name = res.data.name;
          this.status = res.data.status;
          this.numberExtend = res.data.numberExtend;
          this.matchName = res.data.numberInfo.matchName
          this.createDate = res.data.createDate;
        }
      })
      sign().then(res => {
        if(res.code == 200) {
          // debugger;
          
          // console.log('Token=='+Storage.get('token'))
          // console.log('Token1=='+Storage.get('refreshToken'))
          // let aaa = Storage.get('token')
          // debugger;
          this.randomStr = res.data.random_str;
          this.signature = res.data.signature;
          this.timestamp = res.data.timestamp;
          this.flag =  res.data.flag;
          this.init()
        }
      })
      getImInfo().then(res => { // 获取当前登录用户的极光im账号
        if(res.code == 200) {
          this.username = res.data.username;
          this.password = res.data.password;
        }
      })
      getChatRoom({auctionNumberId: this.$route.query.id}).then(res => {
      
      })
    },
    updated:function(){
      this.$nextTick(function(){
        // let div = document.getElementById('box');
        // div.scrollTop = div.scrollHeight;  
        // let clientH = document.body.clientHeight;
        // if(clientH < div.offsetHeight) {
        //   div.scrollTop = parseFloat(div.offsetHeight-clientH);
        // }
        document.body.scrollTop = document.body.scrollHeight;
        console.log(document.body.scrollTop);
      })
    },
    destroyed() {
      //this.exitRoom()
    },
    methods: {
      nowOffer() { // 立即出价
        let othercontent = `出价：${this.offer} 元`;
        let otherctime = new Date();
        let othername = this.username;
        let otherItem = { othername, otherctime, othercontent };

        getOffer({auctionNumberId: this.$route.query.id,amount:this.offer}).then(res => {
          console.log(res)
          if(res.code == 200) {
            this.chatLists.push(otherItem)
          } else {
            this.toastMsg = res.message;
            this.showToast = true;
          }
        })
      },
      addPrice() { // 加价
        this.offer = (this.offer*1+this.addAmount).toFixed(2);
      },
      commentHandle() { // 发表评论
        let contentText = this.commentVal;
        if(contentText !=="") {
          this.addRoomText(contentText)
          // this.getConversation()
          // this.commentsList.push(contentText)
          this.commentVal = "";
        }
      },
      loginRome() { // 登录聊天室
        let that = this;
        JIM.login({
            'username': that.username,
            'password': that.password
        }).onSuccess(function (data) { 
            that.getRoomInfo()
            // 聊天室消息监听,监听到进入聊天室之前的所有消息（该事件会被多次调用，每条消息调用一次）
            JIM.onRoomMsg(function (data) {
                console.log('聊天室消息监听  : ' + JSON.stringify(data));
                if(data) {
                  let othername = data.content.from_id;
                  let otherctime = data.content.create_time;
                  let othercontent = data.content.msg_body.text;  // 消息内容
                  let otherItem = { othername:othername, otherctime, othercontent };
                  that.chatLists.push(otherItem);
                }
            });

            // 聊天消息实时监听
            JIM.onMsgReceive(function (data) {
                // some code
                console.log('聊天消息实时监听')
                console.log('聊天消息实时监听  : ' + JSON.stringify(data));
            });

        }).onFail(function (data) {
            console.log('login  error: ' + JSON.stringify(data));
        }).onTimeout(function (data) {
            console.log('login  timeout: ' + JSON.stringify(data));
        });
      },
      init() {
        let that = this;
        let opts = {
          "appkey" : this.appKey,
          "random_str" : this.randomStr,
          "signature" : this.signature,
          "timestamp" : this.timestamp,
          "flag" : 0
        }
        JIM.init(opts).onSuccess(function(data) {
          console.log(data.message)
          if(data.message == "success") { // 登录房间
            that.loginRome()
          }
          }).onFail(function(data) {
            console.log(data.message)
        });
      },
      getRoomInfo() { // 获取房间信息
        let that = this;
        JIM.getChatroomInfo({
            'id': this.roomId
        }).onSuccess(function (data, msg) {
            //data.code 返回码
            //data.message 描述
            //data.info.id 聊天室 id
            //data.info.name 聊天室名字
            //data.info.description 聊天室描述
            //data.info.appkey 聊天室所属 appkey 
            //data.info.total_member_count 当前聊天室人数
            //data.info.max_member_count 聊天室最大容量
            that.totalMember = data.info.total_member_count
            that.enterRoom()
            that.getRoomData = false;
        }).onFail(function (data) {
            console.log('error: ' + JSON.stringify(data));
        }).onTimeout(function (data) {
            console.log('onTimeout:' + JSON.stringify(data));
        });
      },
      enterRoom() { // 进入房间
        let that = this;
        JIM.enterChatroom({'id': this.roomId}).onSuccess(function (data) {
            console.log('加入聊天室 success: ' + JSON.stringify(data));
            this.getConversation()
        }).onFail(function (data) {
            console.log('加入聊天室 error: ' + JSON.stringify(data));
        });
      }, 
      //推出房间
      exitRoom() {
        JIM.exitChatroom({'id': this.roomId}).onSuccess(function (data) {
            console.log('success: ' + JSON.stringify(data));
        }).onFail(function (data) {
            console.log('error: ' + JSON.stringify(data));
        });
      },

      addRoomText(msg) {
        
        let that = this;
        JIM.sendChatroomMsg({
            'target_rname': '接收者的展示名',
            'target_rid': this.roomId,
            'content': msg
        }).onSuccess(function (data, msg) {
            console.log('向聊天室发送消息 success msg:' + JSON.stringify(msg));
            let othername = msg.content.from_id;
            let otherctime = msg.content.create_time;
            let othercontent = msg.content.msg_body.text;  // 消息内容
            let otherItem = { othername:othername, otherctime, othercontent };
            that.chatLists.push(otherItem);
        }).onFail(function (data) {
            console.log('向聊天室发送消息 error:' + JSON.stringify(data));
        });
      },
      getConversation() { // 获取会话列表
          JIM.getConversation().onSuccess(function(data) {
              console.log('success:' + JSON.stringify(data));
        console.log('success: ' +JSON.stringify(data));
          }).onFail(function(data) {
              console.log('error:' + JSON.stringify(data));
        console.log('error: ' +JSON.stringify(data));
          });
      }
    }
  }  
</script>

<style scoped lang="less">
  .compete-chat {
    .compete-chat-top {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 999;
      width: 100%;
      height: 3.8rem;
      color: #FFFFFF;
      background-color: #002F7B;
      .now {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 14px 14px 0 0; 
        div {
          display: inline-block;
          height: 0.8rem;
          line-height: 0.8rem;
          padding: 0 17px;
          background-color: rgba(0,0,0,.3);
          border-radius: 0 13px 13px 0;
          color: #fff;
          .end-time {
            color: #F17F1A;
            padding-left: 5px;
          }
        }
        a {
            font-size: 13px;
            color: #F0A800;
            text-decoration: underline;
            padding-right: 17px;
          }
      }
      p {
        font-size: 13px;
        padding-left: 17px;
        line-height: 1.2rem;
        .compete-number {
          font-size: 18px;
          font-weight: Bold;
          color: #F0A800;
          padding: 0 5px;
        }
      }
      .current-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 17px;
        div {
          p {
            line-height: 0.5rem;
          }
          .current-price {
            font-size: 30px;
            font-weight: 500;
            line-height: 0.8rem;
            margin-right: 10px;
          }
        }
      }
    }
    .weui-tab {
      .variable {
        color: #333;
        padding: 3.8rem 0 100px 0;
        width: 100%;
        height: 100%;
        .compete-chat-content {
          padding: 17px;
          .avator {
            width: 1.0rem;
            height: 1.0rem;
            border-radius: 50%;
          }
          .other{
            display: flex;
            margin: 0 0 20px 0;
            .chat-box {
              padding-left: 17px;
              p {
                margin-bottom: 7px;
              }
              .chat-content {
                position: relative;
                display: inline-block;
                font-size: 14px;
                min-width: 50px;
                color: #fff;
                background-color: #6682B0;
                border-radius: 6px;
                padding: 6px 17px;
                margin-top: 7px;
              }
              .chat-content:before {
                content: "";
                display: inline-block;
                position: absolute;
                top: 0;
                left: -7px;
                border-color: transparent #6682B0;
                border-width: 0 16px 12px 0;
                border-style: solid;
              }
            }
          }

          .me{
            display: flex;
            justify-content: flex-end;
            margin: 0 0 20px 0;
            .chat-box {
              text-align: right;

              padding-right: 17px;
              p {
                text-align: right;
                margin-bottom: 7px;
              }
              .chat-content {
                display: inline-block;
                text-align: right;
                margin-top: 7px;
                position: relative;
                font-size: 14px;
                color: #192137;
                border-radius: 6px;
                padding: 6px 17px;
                background-color: #fff;
              }
              .chat-content:before {
                content: "";
                display: inline-block;
                position: absolute;
                top: 0;
                right: -7px;
                border-color: transparent #fff;
                border-width: 0 0 16px 12px;
                border-style: solid;
                background-color: transparent;
              }
            }
          }
        }
        
      }
    }
    .bottom{
      height: auto;
    }
    .compete-chat-bottom {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      .comments {
        width: 100%;
        height: 1.2rem;
        background-color: #F3F4F9;
        border-top: 1px solid #dedede;
      }

      .offer {
        width: 100%;
        background-color: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
        div {
          display: flex;
          align-items: center;
          .plus-icon {
            display: inline-block;
            min-width: 50px;
            height: 50px;
            color: #fff;
            font-size: 30px;
            text-align: center;
            background-color: #002F7B;
            border-radius: 50%;
          }
          button {
            width: 3.6rem;
            height: 1.5rem;
            border-radius: 0.7rem;
          }
        }
      }
    }
  }
</style>
