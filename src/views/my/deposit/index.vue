<template>
    <div class="deposit">
        <div v-wechat-title="$route.meta.title"></div>
        <div class="top">
            <p style="color:#fff;">保证金 (元)</p>
            <div class="deposit-container">
                <span class="deposit-money">{{ amount }}</span>
                <div class="deposit-btn-group">
                    <!-- // 状态 0 可提现 1 冻结中 2 已提现 -->
                    <x-button mini type="warn" v-if="statusCode == 0">提现</x-button>
                    <x-button mini disabled v-if="statusCode == 1">冻结中</x-button>
                    <x-button mini disabled v-if="statusCode == 2">已提现</x-button>
                </div>
            </div>
            <div class="deposit-tips">
                <span class="tips">注：</span>
                未提现保证金会于所有拍卖结束后统一退回原支付渠道
            </div>
            <div class="deposit-detail-container">
                <div>
                    <x-button class="deposit-detail-btn">保证金明细</x-button>
                </div>
                <ul class="deposit-detail-list" v-if="!ishasData">
                    <li v-for="n in marginList" :key="n.id">
                        <div>
                            <span class="action-text">{{ n.desc }}</span>
                            <span class="money">-￥ {{ n.amount }}</span>
                        </div>
                        <div>
                            <span class="time">
                                {{ n.createDate }}
                            </span>

                            <span class="status" v-if="n.type ==0">
                                [余额支付]
                            </span>
                            <span class="status" v-if="n.type ==1">
                                [微信支付]
                            </span>
                        </div>
                    </li>
                    
                </ul>
                <no-data explain="暂无相关记录" fontColor="#A5A8B4" containerHeight="9rem" v-else></no-data>
            </div>
        </div>
    </div>
</template>

<script>
    import { XButton } from 'vux'
    import noData from '../../../components/noData'
    import { getMargin, getMarginLog } from '../../../service/api'

    export default {
        name: 'deposit',
        components: {
            XButton,
            noData
        },
        data() {
            return {
                ishasData: false,
                amount: '0.00',  // 保证金
                statusCode: '',  // 状态 0 可提现 1 冻结中 2 已提现
                marginList: []   // 保证金列表
            }
        },
        created() {
            let opts = {
                pageNum: 1,
                pageSize: 100
            }
            getMargin(opts).then(res => {
                if(res.code == 200) {
                    this.amount = res.data.amount.toFixed(2)
                    this.statusCode = res.data.status
                    console.log(this.statusCode)
                }
            })
            this.marginLog(opts)
        },
        methods: {
            marginLog(params) {
                getMarginLog(params).then(res => {
                    this.marginList = res.data.content
                })
            }
        }
    }
</script>

<style lang="less">
    .deposit {
        width: 100%;
        height: 100%;
        .top {
            height: 4.8rem;
            padding: 1.2rem 0.8rem 0 0.8rem;
            background: url('../../../assets/images/bg.png') center;
            background-size: cover;
            p {
                font-size:11px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                line-height:16px;
            }
            .deposit-container {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                padding: 0.2rem 0;
                .deposit-money {
                    color: #fff;
                    font-size: 0.8rem;
                    font-weight: 500;
                    line-height: 42px;
                }
                .deposit-btn-group {
                    align-items: center;
                    margin-left: 21px;
                    button {
                        font-size: 12px;
                        color: #fff;
                        height: 26px;
                        margin: 7px 2px;
                        border-radius: 13px;
                    }
                }
            }
            .deposit-tips {
                font-size: 11px;
                font-weight: 400;
                color:#F17F1A;
                line-height: 16px;
            }
            .deposit-detail-container {
                width: 100%;
                margin: 0 auto;
                margin: 0.7rem 0 0 0;
                padding: 23px 0;
                background:#fff;
                box-shadow: 0px 2px 15px 0px rgba(81,81,87,0.3);
                border-radius: 10px;
                button {
                    font-size:15px;
                    font-weight: 500;
                    color: #ffffff;
                    line-height: 21px;
                    width: 141px;
                    height: 36px;
                    background: #CBCED5;
                    border-radius: 21px;
                }

                .deposit-detail-list {
                    margin: 20px 0;
                    li {
                        padding: 17px 28px;
                        border-bottom: 1px solid #D8DBE0;
                        div {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            .action-text,.money {
                                font-size: 15px;
                                font-weight: 400;
                                color: #192137;
                                line-height: 21px;
                            }
                            .money {
                                font-weight: 600;
                            }
                            .time,.status {
                                font-size: 11px;
                                font-weight:400;
                                color: #575D6F;
                                line-height: 16px;
                                padding-top: 5px;
                            }
                        }
                    }
                }
                
            }
        }
    }
</style>