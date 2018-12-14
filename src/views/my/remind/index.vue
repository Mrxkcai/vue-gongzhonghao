<template>
    <div class="remind">
        <div v-wechat-title="$route.meta.title"></div>
        <!-- <div class="header-top">
            <tab>
                <tab-item v-for="n in 8" :key="n" :selected="n===1" @on-item-click="tabItem">
                    <div>
                        <span class="time">12-10 12:00</span></br>
                        <span class="status-text">
                            即将开始
                        </span>
                    </div>
                </tab-item>
            </tab>
        </div> -->
        <ul class="remind-list">
            <li>
                <div class="item-lt">
                    <span>A55555</span>
                </div>
                <div class="item-rt">
                    <span>12.12 12:00 即将开始</span>
                    <x-button mini>取消提醒</x-button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem } from 'vux'
    export default {
        name: 'remind',
        components: {
            Tab, 
            TabItem, 
            Sticky, 
            Divider, 
            XButton, 
            Swiper, 
            SwiperItem 
        },
        data() {
            return {
                
            }
        },
        methods: {
            tabItem(i) {
                console.log(i)
            }
        }
    }
</script>

<style lang="less">
    .remind {
        .header-top {
            width: 100%;
            height: 109px;
            background: url('../../../assets/images/img_bg_top@2x.png') no-repeat center;
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
                                font-size: 0.2rem;
                                .status-text {
                                    font-size: 14px;
                                }
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
        .remind-list {
            padding: 15px 17px;
            li {
                display: flex;
                align-items: center;
                width: 100%;
                height: 1.6rem;
                margin-top: 9px;
                background: url('../../../assets/images/img_bg_1.png') no-repeat center;
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
                        color: #fff;
                        height: 28px;
                        line-height: 28px;
                        background-color: #D8DBE0;
                        border-radius: 16px;
                    }
                }
            }
        }
    }
</style>