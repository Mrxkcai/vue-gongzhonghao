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
                    <x-button mini type="warn" data-id="123" plain class="buy-btn" @click.native="goBuy">直接购买 ￥30000</x-button>
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
    </div>
</template>  
<script>
    import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem, Grid, GridItem, Cell, Group, Popup, XInput, Checklist, TransferDomDirective as TransferDom } from 'vux'
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
            Checklist
        },
        data() {
            return {
                commonList: [
                    '我同意2019年限国际马拉松参赛号使用权 <span style="color:#F17F1A;text-decoration: underline;">购买协议</span>', 
                    '为确保您顺利参赛，您授权提供以上身份证明信息'
                ],
                checklist001: [],
                payModel: false,
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
                }]
            }
        },
        mounted() {
            login({mobile:123,code:1234}).then(res => {
                if(res.code == 200) {
                    this.showTelInfo = false;
                    this.getAuctions()
                } else {
                    this.showTelInfo = true;
                }
                
            })
            
        },
        methods: {
            tabItem(i) {
                console.log(i)
            },
            getAuctions() {
                let params = {
                    status: 'LAST_DONE',
                    pageNum: 1,
                    pageSize: 100
                };
                getAuctionNumber(params).then(res => {
                    console.log(res)
                    if(res.code !== 401) {
                    }
                })
            },
            goCompeteList() {
                this.$router.push({ path: '/competeList', query: { id: 123 }})
            },
            goBuy(e) {
                console.log(e.currentTarget.dataset.id)
                this.payModel = true;
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
            padding: 0px 17px;
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
        padding: 5px 0;
    }

    .weui-cells:before,
    .weui-cells:after,
    .weui-cell:before,
    .weui-cell:after{
        border: none!important;
    }

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