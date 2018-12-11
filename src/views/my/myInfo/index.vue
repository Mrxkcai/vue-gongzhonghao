<template>
    <div class="myInfo">
        <group>
            <cell 
                title="身份信息" 
                :value="username" 
                is-link 
                :inline-desc='IdentityId'
                @click.native="changeIdentityInfo">
            </cell>
            <cell title="手机号" is-link @click.native="changeTelInfo" :value="telphone"></cell>
        </group>
        <div v-transfer-dom>
            <popup v-model="showIdentityInfo" is-transparent>
                <div class="popup-container">
                    <div class="change-container">
                        <group>
                            <x-input title="title" v-model="username" icon-type="clear">
                                <img slot="label" style="padding-right:10px;display:block;" src="../../../assets/images/icon_mine_inform.png" width="16" height="16">
                            </x-input>
                                
                            <x-input title="title" v-model="IdentityId">
                                <img slot="label" style="padding-right:10px;display:block;" src="../../../assets/images/icon_number@2x.png" width="18" height="16">
                            </x-input>
                        </group>
                    </div>
                    <x-button type="primary">确认修改</x-button>
                </div>
            </popup>
        </div>
        <div v-transfer-dom>
            <popup v-model="showTelInfo" is-transparent>
                <div class="popup-container">
                    <div class="change-container">
                        <group>
                            <div style="display:flex;justify-content: space-between;align-items: center;">
                                <x-input title="title" icon-type="clear" placeholder="请输入新手机号">
                                    <img slot="label" style="padding-right:10px;display:block;" src="../../../assets/images/icon_cellphone@2x.png" width="16" height="18">
                                </x-input>
                                <x-button class="sendcode-btn" mini type="warn">发送验证码</x-button>
                            </div>
                            
                                
                            <x-input title="title" v-model="verifCode">
                                <img slot="label" style="padding-right:10px;display:block;" src="../../../assets/images/icon_mine_baozhengjin@2x.png" width="16" height="18">
                            </x-input>
                        </group>
                    </div>
                    <x-button type="primary">确认修改</x-button>
                </div>
            </popup>
        </div>
    </div>
</template>

<script>
import { Cell, Group, XButton, Popup, XInput, TransferDomDirective as TransferDom } from 'vux'
    export default {
        name: 'myInfo',
        directives: {
            TransferDom
        },
        components: {
            Cell, 
            Group,
            XButton,
            Popup,
            XInput 
        },
        data() {
            return {
                username: '王大锤',
                IdentityId: 610324199103183428,
                telphone: 13409116888,
                verifCode: 1234,  // 验证码
                showIdentityInfo: false,
                showTelInfo:  false,
            }
        },
        methods: {
            changeIdentityInfo() {
                this.showIdentityInfo = true;
            },
            changeTelInfo() {
                this.showTelInfo = true;
            }
        }
    }
</script>

<style>
    .myInfo {
        padding: 11px 17px;
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
    
    .vux-popup-dialog {
        bottom: 35%!important;
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
        font-size: 13px!important;
        width: 5.0rem!important;
        height: 40px;
        margin: 0;
    }

    .change-container input {
        font-size: 15px;
    }
</style>