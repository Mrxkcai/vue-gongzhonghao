<template>
    <div class="myInfo">
        <div v-wechat-title="$route.meta.title"></div>
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
            <popup v-model="showIdentityInfo" is-transparent class="custombottom">
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
        <div class="myInfo-popup">
        <div v-transfer-dom>
            <popup v-model="showTelInfo" is-transparent class="custombottom">
                <div class="popup-container">
                    <div class="change-container">
                        <group>
                            <div style="display:flex;justify-content: space-between;align-items: center;">
                                <x-input title="title" icon-type="clear" placeholder="请输入新手机号" style="padding-right:0;">
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

    .vux-popup-dialog {
        bottom: 35%;
    }

    .custombottom {
        bottom: 35%;
    }
</style>