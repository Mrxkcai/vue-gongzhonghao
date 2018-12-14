<template>
    <div class="index">
        <div v-wechat-title="$route.meta.title"></div>
        <div class="header-top">
            <tab>
                <tab-item v-for="(n,i) in tabItems" :key="i" :selected="i===3" @on-item-click="tabItem">
                    <div>
                        <span class="time">{{ n.time }}</span></br>
                        <span class="status-text">
                            {{ n.status }}
                        </span>
                    </div>
                </tab-item>
            </tab>
        </div>
        <div class="now-action">
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
        <ul class="index-list">
            <li>
                <div class="item-lt">
                    <span>A33333</span>
                </div>
                <div class="item-rt">
                    <span> <span class="focus">980</span> 人已关注</span>
                    <x-button mini type="warn" class="remind-btn">提醒我</x-button>
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
            <li>
                <div class="item-lt">
                    <span>A77777</span>
                </div>
                <div class="item-rt">
                    <span> <span class="focus">980</span> 人已关注</span>
                    <x-button mini type="warn" class="remind-btn">提醒我</x-button>
                </div>
            </li>
            <li>
                <div class="item-lt">
                    <span>A77777</span>
                </div>
                <div class="item-rt">
                    <x-button mini type="warn" class="remind-btn" @click.native="goCompeteList">去竞拍</x-button>
                    <x-button mini type="warn" plain class="buy-btn">直接购买 ￥30000</x-button>
                </div>
            </li>
            <li>
                <div class="item-lt">
                    <span>A55555</span>
                </div>
                <div class="item-rt">
                    <x-button mini style="color:#fff;">￥200</x-button>
                    <span>12-12 12:00</span>
                    <img src="../../assets/images/icon_chengjiao@2x.png">
                </div>
            </li>
        </ul>
        <!-- 验证码 model -->
        <div v-transfer-dom>
            <popup v-model="showTelInfo" is-transparent :hide-on-blur=false class="custombottom">
                <div class="popup-container">
                    <div class="change-container">
                        <group>
                            <div style="display:flex;justify-content: space-between;align-items: center;">
                                <x-input title="title" icon-type="clear" placeholder="请输入新手机号" style="padding-right:0;">
                                    <img slot="label" style="padding-right:10px;display:block;" src="../../assets/images/icon_cellphone@2x.png" width="16" height="18">
                                </x-input>
                                <x-button class="sendcode-btn" mini type="warn">发送验证码</x-button>
                            </div>
                            <x-input title="title" v-model="authCode">
                                <img slot="label" style="padding-right:10px;display:block;" src="../../assets/images/icon_mine_baozhengjin@2x.png" width="16" height="18">
                            </x-input>
                        </group>
                        <p style="color:#F17F1A;margin-top: 10px;"><span class="tips">注：</span>新用户登陆即注册</p>
                    </div>
                    <x-button type="primary">登陆</x-button>
                </div>
            </popup>
        </div>
        <nw-footer isSelected1></nw-footer>
    </div>
</template>  
<script>
    import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem, Grid, GridItem, Cell, Group, Popup, XInput, TransferDomDirective as TransferDom } from 'vux'
    import nwFooter from '../../components/nwFooter'
    import  { login, getAuctionNumber } from '../../service/api'
    export default {
        name: 'index',
        directives: {
            TransferDom
        },
        components: {
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
        },
        data() {
            return {
                showTelInfo: false,
                authCode: '',
                tabItems: [{
                    time: '12-12 08:00',
                    status: '已结束'
                },{
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
                },{
                    time: '12-12 14:00',
                    status: '即将开始'
                }]
            }
        },
        created() {
            login({mobile:123,code:1234}).then(res => {
                console.log(res)
                
            })
            this.getAuctions()
        },
        methods: {
            tabItem(i) {
                console.log(i)
            },
            changeTelInfo() {
                this.showTelInfo = true;
            },
            getAuctions() {
                let params = {
                    status: '',
                    pageNum: 1,
                    pageSize: 100
                };
                getAuctionNumber(params).then(res => {
                    console.log(res)
                    if(res.code !== 401) {
                        this.changeTelInfo();
                    }
                })
            },
            goCompeteList() {
                this.$router.push({ path: '/competeList', query: { id: 123 }})
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
        .index-list {
            padding: 15px 17px;
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
    .custombottom {
        bottom: 35%!important;
    }
</style>