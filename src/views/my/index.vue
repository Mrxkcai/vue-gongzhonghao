<template>
    <div class="my">
        <div class="top-container">
            <div class="avator">
                <img src="https://wx.qlogo.cn/mmopen/vi_32/rvx1PxbCJIJKqdmscqnic4jDep3QibDjXYAAYbkibyyxn5EgvFaj2fG4a3HVLqglRKhScicPaMzbmS8W9nOBe1IHrA/132" alt="">
            </div>
            <p class="nickname">我的昵称</p>
            <div class="my-container">
                <cell title="我的个人资料" is-link>
                    <badge></badge>
                    <img slot="icon" width="20" style="display:block;margin-right:13px;" src="../../assets/logo.png">
                </cell>
                <cell title="我的拍卖" is-link>
                    <img slot="icon" width="20" style="display:block;margin-right:13px;" src="../../assets/logo.png">
                </cell>
                <cell title="我的保证金" is-link>
                    <img slot="icon" width="20" style="display:block;margin-right:13px;" src="../../assets/logo.png">
                </cell>
                <cell title="我的提醒" is-link>
                    <img slot="icon" width="20" style="display:block;margin-right:13px;" src="../../assets/logo.png">
                </cell>
                <cell title="客服与帮助" is-link>
                    <img slot="icon" width="20" style="display:block;margin-right:13px;" src="../../assets/logo.png">
                </cell>                
            </div>
        </div>
    </div>
</template>

<script>
    import { Badge , Cell } from 'vux'
    export default {
        name: 'my',
        components: {
            Badge,
            Cell
        },
        data() {
            return {
                
            }
        }
    }
</script>

<style lang="less">
    .my {
        .top-container {
            width: 100%;
            height: 245px;
            background: url(../../assets/images/bg.png) center;
            background-size: cover;
            .avator {
                display: flex;
                justify-content: center;
                margin-bottom: 14px;
                img {
                    width: 79px;
                    height: 79px;
                    margin-top: 44px; 
                    border-radius: 50%;
                }
                
            }
            .nickname {
                text-align: center;
                color: #fff;
                font-size: 17px;
                font-weight: 500;
                line-height: 24px;
                margin-bottom: 26px;
            }

            .my-container {
                width: 313px;
                height: auto;
                box-shadow:0px 2px 15px 0px rgba(81,81,87,0.3);
                border-radius:10px;
                margin: 0 auto;
                padding: 33px 0;
                background: #fff;
                .weui-cell {
                    margin-top: -1px;
                    padding: 15px;
                }
                .weui-cell:before,
                .weui-cells:after {
                    
                    border: 0;
                }
                .vux-no-group-title {
                    margin-top:0;
                }
            }
        }
    }

</style>