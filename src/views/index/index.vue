<template>
    <div class="index">
        <div v-wechat-title="$route.meta.title"></div>
        <div class="header-top">
            <tab v-model="index">
                <tab-item v-for="(n,i) in tabItems" :key="i" :selected="i===2" @on-item-click="tabItem">
                    <div>
                        <span class="time">{{ n.time }}</span></br>
                        <span class="status-text">
                            {{ n.status }}
                        </span>
                    </div>
                </tab-item>
            </tab>
        </div>
        <!-- endTime -->
        <div class="now-action" v-show="index == 2">
            <div class="action-endtime">
                <img src="../../assets/images/img_bg_title@2x.png">
                <div class="endtime">
                    <span>结束时间：</span>
                    <span style="color: #F17F1A;">2018.12.12 12:00</span>
                </div>
            </div>
            <div class="now-detail">
                <span>起拍价：20</span>
                <span>加价幅度：20元/次</span>
                <span>保证金： 20元 (可退)</span>
            </div>
        </div>
        <div class="tab-container">
            <ul class="index-list">
                <li v-if="index == 0" v-for="(item,i) in content">
                    <div class="item-lt">
                        <span>{{ item.name }}</span>
                    </div>
                    <div class="item-rt">
                        <x-button mini style="color:#fff;">￥{{ item.amount | money }}</x-button>
                        <span>{{ item.createDate | mdformate }}</span>
                        <img v-if="item.status == 0" src="../../assets/images/icon_chengjiao@2x.png">
                    </div>
                </li> 
                <li v-if="index == 1" v-for="(item,i) in content">
                    <div class="item-lt">
                        <span>{{ item.name }}</span>
                    </div>
                    <div class="item-rt">
                        <x-button mini style="color:#fff;">￥{{ item.amount | money }}</x-button>
                        <span>{{ item.createDate | mdformate }}</span>
                        <img v-if="item.status == 0" src="../../assets/images/icon_chengjiao@2x.png">
                    </div>
                </li> 
                <li v-if="index == 2" v-for="(item,i) in content">
                    <div class="item-lt">
                        <span>{{ item.name }}</span>
                    </div>
                    <div class="item-rt" v-if="item.status == 0">
                        <x-button mini type="warn" class="remind-btn" :data-id="item.id" @click.native="goCompeteChat">去竞拍</x-button>
                        <x-button mini type="warn" data-id="123" plain class="buy-btn" @click.native="goBuy">直接购买 ￥30000</x-button>
                    </div>
                    <div class="item-rt" v-else>
                        <x-button mini style="color:#fff;">￥{{ item.amount | money }}</x-button>
                        <span>{{ item.createDate | mdformate }}</span>
                        <img src="../../assets/images/icon_chengjiao@2x.png">
                    </div>
                </li> 
                <li v-if="index == 3" v-for="(item,i) in content">
                    <div class="item-lt">
                        <span>{{ item.name }}</span>
                    </div>
                    <div class="item-rt">
                        <span> <span class="focus">{{ item.subscribeCount }}</span> 人已关注</span>
                        <x-button 
                            v-if="item.remind ? false : true"
                            mini type="warn" 
                            class="remind-btn" 
                            :data-auctionNumberId="item.id" 
                            :data-categoryId="item.categoryId"
                            @click.native="remindMe">
                                提醒我
                        </x-button>
                        <x-button mini class="subscribed-btn" v-else>已订阅</x-button>
                    </div>
                </li> 
                <li v-if="index == 4" v-for="(item,i) in content">
                    <div class="item-lt">
                        <span>{{ item.name }}</span>
                    </div>
                    <div class="item-rt">
                        <span> <span class="focus">{{ item.subscribeCount }}</span> 人已关注</span>
                        <x-button 
                            v-if="item.remind ? false : true"
                            mini type="warn" 
                            class="remind-btn" 
                            :data-auctionNumberId="item.id" 
                            :data-categoryId="item.categoryId"
                            @click.native="remindMe">
                                提醒我
                        </x-button>
                        <x-button mini class="subscribed-btn" v-else>已订阅</x-button>
                    </div>
                </li> 
                <!-- <li>
                    <div class="item-lt">
                        <span>A77777</span>
                    </div>
                    <div class="item-rt">
                        <x-button mini type="warn" class="remind-btn" @click.native="goCompeteChat">去竞拍</x-button>
                        <x-button mini type="warn" data-id="123" plain class="buy-btn" @click.native="goBuy">直接购买 ￥30000</x-button>
                    </div>
                </li>
                <li>
                    <div class="item-lt">
                        <span>A66666</span>
                    </div>
                    <div class="item-rt">
                        <span> <span class="focus">8000</span> 人已关注</span>
                        <x-button mini class="subscribed-btn">已订阅</x-button>
                    </div>
                </li>
                <li >
                    <div class="item-lt">
                        <span>A33333</span>
                    </div>
                    <div class="item-rt">
                        <span> <span class="focus">980</span> 人已关注</span>
                        <x-button 
                            mini type="warn" 
                            class="remind-btn" 
                            data-auctionNumberId="1" 
                            data-categoryId="1"
                            @click.native="remindMe">
                                提醒我
                    </x-button>
                    </div>
                </li> -->
            </ul>
        </div>
        
        <!-- 验证码 model -->
        <div v-transfer-dom>
            <popup v-model="isLogin" is-transparent :hide-on-blur=false class="custombottom">
                <div class="popup-container">
                    <div class="change-container">
                        <group>
                            <div style="display:flex;justify-content: space-between;align-items: center;">
                                <x-input title="title" icon-type="clear" v-model="mobile" placeholder="请输入新手机号" style="padding-right:0;">
                                    <img slot="label" style="padding-right:10px;display:block;" src="../../assets/images/icon_cellphone@2x.png" width="16" height="18">
                                </x-input>
                                <!-- <x-button class="sendcode-btn" mini type="warn" @click.native="getCode">发送验证码</x-button>
                                <Button shape="circle" v-show="!show">{{count}}s后重新获取</Button> -->
                            </div>
                            <x-input title="title" v-model="authCode">
                                <img slot="label" style="padding-right:10px;display:block;" src="../../assets/images/icon_mine_baozhengjin@2x.png" width="16" height="18">
                            </x-input>
                        </group>
                        <p style="color:#F17F1A;margin-top: 10px;"><span class="tips">注：</span>新用户登陆即注册</p>
                    </div>
                    <x-button type="primary" @click.native="logIn">登陆</x-button>
                </div>
            </popup>
        </div>
        <!-- pay model -->
        <div v-transfer-dom>
            <popup v-model="payModel" is-transparent>
                <div class="pay-model-container flex-box">
                    <div class="variable">
                        <div class="pay-model-header">
                            2019年西安国际马拉松 
                            <span class="auctionnumber">A88888</span>  
                            的使用权
                        </div>
                        <div class="pay-model-content">
                            <x-input placeholder="请输入您的姓名">
                                <img slot="label" style="padding-right:15px;display:block;" src="../../assets/images/icon_mine_inform.png" width="16" height="16">
                            </x-input> 
                            <x-input placeholder="请输入您的证件号码">
                                <img slot="label" style="padding-right:15px;display:block;" src="../../assets/images/icon_number@2x.png" width="18" height="16">
                            </x-input>
                            <p class="tips-text">
                                <span class="tips">请注意核对您的身份信息，一旦支付成功不可更改</span>
                            </p>
                            <div>
                                <checklist label-position="right" v-model="checklist001" required :options="commonList"></checklist>
                            </div>
                        </div>
                    </div>
                    <div class="pay-model-footer bottom">
                        <div>
                            <span>直接购买：</span>
                            <span class="price">￥3000.00</span>
                        </div>
                        <div>
                            <x-button type="warn" style="width:4rem;height:1.2rem;border-radius: 0.75rem;">确认购买</x-button>
                        </div>
                    </div>
                </div>
            </popup>
        </div>
        <nw-footer isSelected1></nw-footer>
        <!-- loading -->
        <loading :show="showLoading" text="loading..."></loading>
        <!-- toast -->
        <toast v-model="showToast" position="top" type="text" :time=1500 text="订阅成功"></toast>
    </div>
</template>  
<script>
    import { Toast, Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem, Grid, GridItem, Cell, Group, Popup, XInput, Checklist, Loading, TransferDomDirective as TransferDom } from 'vux'
    import nwFooter from '../../components/nwFooter'
    import  { login, getAuctionNumber, getRemind, verifyCode, send } from '../../service/api'
    import { Storage } from '@/utils/utils'
    export default {
        name: 'index',
        directives: {
            TransferDom
        },
        components: {
            Toast,
            Tab, 
            TabItem, 
            Sticky, 
            Divider, 
            XButton, 
            Swiper, 
            SwiperItem,
            nwFooter,
            Grid, 
            GridItem, 
            Sticky, 
            Divider, 
            Swiper, 
            GridItem, 
            Cell, 
            Group, 
            Popup, 
            XInput,
            Checklist,
            Loading
        },
        data() {
            return {
                showToast: false,
                showLoading: true,
                content: [],
                index: 2,  // DOING
                commonList: [
                    '我同意2019年限国际马拉松参赛号使用权 <span style="color:#F17F1A;text-decoration: underline;">购买协议</span>', 
                    '为确保您顺利参赛，您授权提供以上身份证明信息'
                ],
                isLogin: true,
                show: true,
                count: '',
                timer: null,
                checklist001: [],
                payModel: false,
                authCode: '',
                mobile:'',
                tabItems: [{
                    time: '12-12 09:00',
                    status: '已结束'
                },{
                    time: '12-12 10:00',
                    status: '已结束'
                },{
                    time: '12-12 11:00',
                    status: '进行中'
                },{
                    time: '12-12 12:00',
                    status: '即将开始'
                },{
                    time: '12-12 13:00',
                    status: '即将开始'
                }]
            }
        },
        created() {
            let LoginStatus = Storage.get('isLogin').data;
            if(!LoginStatus){
                this.isLogin = true;
                this.getAuctions('DOING');
                this.showLoading = false;
            }
        },
        methods: {
            logIn() {
                if (this.mobile !=='' || this.authCode !== '') {
                    let params = { mobile:this.mobile,code:this.authCode };
                    login(params).then(res => {
                        if(res.code == 200) {
                            this.isLogin = false;
                            Storage.set('refreshToken', res.data.refreshToken);
                            Storage.set('token', res.data.token)
                            Storage.set('isLogin', false)
                            setTimeout(()=>{
                                this.getAuctions('DOING');
                            },200)
                            
                        } else {
                            this.isLogin = true;
                        }
                    })
                } else {
                    alert('手机号和验证码不能为空')
                }
                
            },
            // getCode() {
            //     let mobile = this.mobile;
            //     send({ mobile: mobile}).then(res => {
            //         if(res.code == 200) {
            //             const TIME_COUNT = 60;
            //             if (!this.timer) {
            //                 this.count = TIME_COUNT;
            //                 this.show = false;
            //                 this.timer = setInterval(() => {
            //                     if (this.count > 0 && this.count <= TIME_COUNT) {
            //                         this.count--;
            //                     } else {
            //                         this.show = true;
            //                         clearInterval(this.timer);
            //                         this.timer = null;
            //                     }
            //                 }, 1000)
            //             }
            //         } else {
            //             console.log(res)
            //         }
            //     })
            // },
            // checkCode() { // 验证码校验
            //     let params = {
            //         mobile: this.mobile,
            //         code: this.authCode,
            //     }
            //     verifyCode(params).then(res => {
            //         if(res.code == 200) {
            //             this.validateCode = true
            //             Storage.set('isLogin',true);
            //         }
            //     })
            // },
            tabItem(i) {
                this.showLoading = true;
                this.index = i;
                switch(i) {
                    case 0:
                        this.getAuctions('LAST_DONE');
                        break; 
                    case 1:
                        this.getAuctions('DONE');
                        break;
                    case 2:
                        this.getAuctions('DOING');
                        break;  
                    case 3:
                        this.getAuctions('DO');
                        break;
                    case 4:
                        this.getAuctions('LAST_DO');
                        break;
                }
            },
            getAuctions(status) {
                let matchId = this.$route.params.matchId;
                let params = {
                    matchId: '1001',
                    status: status,
                    pageNum: 1,
                    pageSize: 100
                };
                getAuctionNumber(params).then(res => {
                    if(res.code == 200) {
                        this.content = res.data.content;
                        this.showLoading = false;
                    }
                })
            },
            goCompeteChat(e) {
                let id = e.target.dataset.id;
                this.$router.push({ path: '/competeChat', query: { id: id }})
            },
            goBuy(e) {
                this.payModel = true;
            },
            remindMe(e) { // 提醒我
                let id = e.target.dataset.auctionnumberid;
                getRemind({auctionNumberId: e.target.dataset.auctionnumberid, categoryId: e.target.dataset.categoryid}).then(res => {
                    if(res.code == 200) {
                        this.content.forEach((item, index) => {
                            if(item.id == id) {
                                item.remind = true;
                                this.showToast = true;
                            }
                        })
                    }
                })
            }
        }
    }
</script>

<style lang="less">
    .index {
        .header-top {
            width: 100%;
            height: 109px;
            background: url('../../assets/images/img_bg_top@2x.png') no-repeat center;
            background-size: cover;
            .vux-tab-container {
                height: 50px;
                top: 65px;
                .vux-tab {
                    background: none;
                    .vux-tab-item {
                        div {
                            height: 100%;
                            line-height: 1.3;
                            span{
                                color: #fff;
                                font-size: 12px;
                            }
                            .status-text {
                                font-size: 14px;
                            }
                        }
                        
                    }
                    .vux-tab-selected {
                        border: none!important;
                        position: relative;
                    }  
                    .vux-tab-ink-bar {
                        width: 0;
                        height: 0;
                        bottom: 7px;
                        margin: 0 auto;
                        border-left: 6px solid transparent;
                        border-right: 6px solid transparent;
                        border-top: 8px solid #0C3881;
                        background-color: transparent;
                    }
                }
                
            }
        }
        .vux-slider {
            overflow-y: visible!important;
            .vux-swiper {
                overflow-y: visible;
                .index-list {
                    padding: 10px 17px;
                    margin-bottom: 50px;
                    li {
                        display: flex;
                        align-items: center;
                        width: 100%;
                        height: 1.6rem;
                        margin-top: 9px;
                        background: url('../../assets/images/img_bg_1.png') no-repeat center;
                        background-size: cover;
                        .item-lt {
                            width: 30%;
                            margin-left: 0.4rem;
                            color: #192137;
                            font-size: 0.45rem;
                            font-weight: bold;
                        }
                        .item-rt {
                            width: 70%;
                            display: flex;
                            justify-content: space-around;
                            padding: 0 0.1rem;
                            align-items: center;
                            img {
                                width: 1.2rem;
                                height: 1.2rem;
                            }
                            span {
                                color: #CBCED5;
                            }
                            .weui-btn {
                                margin: 0;
                                font-size: 0.3rem;
                                
                                height: 28px;
                                line-height: 28px;
                                border-radius: 16px;
                            }
                            .subscribed-btn {
                                color: #fff;
                                background-color: #D8DBE0;
                            }

                            .focus {
                                color: #fff;
                                color: #F0A800;
                                font-size: 18px;
                                font-weight: 500;
                            }
                            .buy-btn {
                                color: #F0A800;
                                border: 1px solid #F0A800;
                            }
                        }
                    }
                }
            }
            
        }

        .tab-container {
            padding: 17px;
            .index-list {
                    margin-bottom: 50px;
                    li {
                        display: flex;
                        align-items: center;
                        width: 100%;
                        height: 1.6rem;
                        margin-top: 9px;
                        background: url('../../assets/images/img_bg_1.png') no-repeat center;
                        background-size: cover;
                        .item-lt {
                            width: 30%;
                            margin-left: 0.4rem;
                            color: #192137;
                            font-size: 0.45rem;
                            font-weight: bold;
                        }
                        .item-rt {
                            width: 70%;
                            display: flex;
                            justify-content: space-around;
                            padding: 0 0.1rem;
                            align-items: center;
                            img {
                                width: 1.2rem;
                                height: 1.2rem;
                            }
                            span {
                                color: #CBCED5;
                            }
                            .weui-btn {
                                margin: 0;
                                font-size: 0.3rem;
                                
                                height: 28px;
                                line-height: 28px;
                                border-radius: 16px;
                            }
                            .subscribed-btn {
                                color: #fff;
                                background-color: #D8DBE0;
                            }

                            .focus {
                                color: #fff;
                                color: #F0A800;
                                font-size: 18px;
                                font-weight: 500;
                            }
                            .buy-btn {
                                color: #F0A800;
                                border: 1px solid #F0A800;
                            }
                        }
                    }
                }
        }
        
        .now-action {
            padding: 23px 0 0 0;
            div {
                display: flex;
                justify-content: space-around;
            }
            .action-endtime {
                position: relative;
                img {
                    width: 6.2rem;
                    height: 1rem;
                }

                .endtime {
                    position: absolute;
                    line-height: 30px;
                }
            }
            .now-detail {
                font-size: 10px;
                color: #192137;
                padding: 0 17px;
            }
        } 
    }

    .pay-model-container {
        height: 10rem;
        background-color: #F9F9FC;
    }

    .pay-model-header {
        font-size: 15px;
        color: #192137;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 0.5rem;
    }

    .pay-model-content {
        padding: 0 0.5rem;
    }
    .pay-model-content .vux-x-input {
        font-size: 15px;
        margin-top: 9px;
        border: none!important;
        border-radius: 22px;
        background-color: #fff;
    }

    .pay-model-content .weui-cell:before {
        border: none;
    }

    .tips-text {
        color: #F17F1A;
        line-height: 4.0;
    }

    .weui-cells {
        background-color: transparent!important;
    }

    .weui-cells .weui-cell {
        padding: 10px 0;
    }

    /* .weui-cells:before,
    .weui-cells:after,
    .weui-cell:before,
    .weui-cell:after{
        border: none!important;
    } */

    .weui-cells_checkbox .weui-check:checked + .weui-icon-checked:before{
        color: #575D6F!important;
    }

    .weui-cells_checkbox .weui-icon-checked:before {
        font-size: 14px!important;
        color: #575D6F!important;
    }

    .weui-cell__bd p{
        font-size: 12px;
        color: #575D6F;
    }
    .pay-model-footer {
        font-size: 14px;
        color: #192137;
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 0.3rem;
        background-color: #fff;
    }
    .price {
        font-size: 0.6rem;
    }

    .auctionnumber {
        font-size: 0.6rem;
        font-weight: bold;
        color: #F0A800;
        padding: 0 4px;
    }
    .custombottom {
        bottom: 35%!important;
    }
</style>