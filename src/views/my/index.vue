<template>
    <div class="my">
        <div class="top-container">
            <div class="avator">
                <img src="https://wx.qlogo.cn/mmopen/vi_32/rvx1PxbCJIJKqdmscqnic4jDep3QibDjXYAAYbkibyyxn5EgvFaj2fG4a3HVLqglRKhScicPaMzbmS8W9nOBe1IHrA/132" alt="">
            </div>
            <p class="nickname">我的昵称</p>
            <div class="my-container">
                <group>
                    <cell title="我的个人资料" is-link link="/myInfo">
                        <img slot="icon" width="20" style="display:block;margin-right:13px;" src="../../assets/logo.png">
                    </cell>
                    <cell title="我的拍卖" is-link link="/compete">
                        <img slot="icon" width="20" style="display:block;margin-right:13px;" src="../../assets/logo.png">
                    </cell>
                    <cell title="我的保证金" is-link link="/deposit">
                        <img slot="icon" width="20" style="display:block;margin-right:13px;" src="../../assets/logo.png">
                    </cell>
                    <cell title="我的提醒" is-link link="/remind">
                        <badge style="margin: -2px 5px 0 0;"></badge>
                        <img slot="icon" width="20" style="display:block;margin-right:13px;" src="../../assets/logo.png">
                    </cell>
                    <cell title="客服与帮助" is-link link="/customerService">
                        <img slot="icon" width="20" style="display:block;margin-right:13px;" src="../../assets/logo.png">
                    </cell> 
                </group>
            </div>
        </div>
        <nw-footer isSelected2></nw-footer>
    </div>
</template>

<script>
    import { Badge, Group, Cell } from 'vux'
    import nwFooter from '../../components/nwFooter'
    export default {
        name: 'my',
        components: {
            nwFooter,
            Badge,
            Group,
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
            height: 6.304rem;
            background: url(../../assets/images/bg.png) center;
            background-size: cover;
            .avator {
                display: flex;
                justify-content: center;
                margin-bottom: .29rem;
                img {
                    width: 2rem;
                    height: 2rem;
                    margin-top: 1.833333rem; 
                    border-radius: 50%;
                }
                
            }
            .nickname {
                text-align: center;
                color: #fff;
                font-size: .354rem;
                font-weight: 500;
                line-height: 24px;
                margin-bottom: 0.54rem;
            }

            .my-container {
                width: 8rem;
                height: auto;
                box-shadow:0px 2px 15px 0px rgba(81,81,87,0.3);
                border-radius:10px;
                margin: 0 auto;
                padding: 0.685rem 0;
                background: #fff;
                .weui-cell {
                    margin-top: -1px;
                    .vux-cell-primary {
                        height: 30px!important;
                    }
                }
                .weui-cell:before,
                .weui-cell:after,
                .weui-cells:before,
                .weui-cells:after {
                    border: 0;
                }
                .vux-no-group-title {
                    margin-top:0;
                }
                .vux-label  {
                    font-size: 15px;
                    color: #192137;
                }
            }
        }
    }

</style>