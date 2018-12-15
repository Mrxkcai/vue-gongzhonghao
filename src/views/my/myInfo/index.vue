<template>
    <div class="myInfo">
        <div v-wechat-title="$route.meta.title"></div>
        <group>
            <cell 
                title="身份信息" 
                :value="realName" 
                is-link 
                :inline-desc='idCard'
                @click.native="changeIdentityInfo">
            </cell>
            <cell title="手机号" is-link @click.native="changeTelInfo" :value="mobile"></cell>
        </group>
        <div v-transfer-dom>
            <popup v-model="showIdentityInfo" is-transparent class="custombottom">
                <div class="popup-container">
                    <div class="change-container">
                        <group>
                            <x-input title="title" v-model="realName" required icon-type="clear">
                                <img slot="label" style="padding-right:10px;display:block;" src="../../../assets/images/icon_mine_inform.png" width="16" height="16">
                            </x-input>
                                
                            <x-input title="title" required v-model="idCard">
                                <img slot="label" style="padding-right:10px;display:block;" src="../../../assets/images/icon_number@2x.png" width="18" height="16">
                            </x-input>
                        </group>
                    </div>
                    <x-button 
                        type="primary" 
                        :disabled=!canChangeIdentityInfo
                        @click.native="changeIdentityInfoHandle">
                        确认修改
                    </x-button>
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
                                <x-input 
                                    title="title" 
                                    icon-type="clear" 
                                    placeholder="请输入新手机号" 
                                    required 
                                    mask="999 9999 9999" 
                                    :max="13" 
                                    is-type="china-mobile"
                                    style="padding-right:0;">
                                    <img slot="label" style="padding-right:10px;display:block;" src="../../../assets/images/icon_cellphone@2x.png" width="16" height="18">
                                </x-input>
                                <x-button v-if="!show" mini style="width: 4.2rem;height:40px;margin-top:0;">{{count}} s</x-button>
                                <x-button v-else class="sendcode-btn" mini type="warn" @click.native="getCode">发送验证码</x-button>
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
        <toast v-model="toast" :time=2000 type="text" width="auto" :text="toastText"></toast>
    </div>
</template>

<script>
import { Cell, Group, XButton, Popup, XInput, Toast, TransferDomDirective as TransferDom } from 'vux'
    import { send, verifyCode } from '../../../service/api'

    let regList = {
            Mobile: /^1[345789]\d{9}$/,
            regIdNo: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
        }

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
            XInput,
            Toast
        },
        data() {
            return {
                toast: false,
                toastText: '',
                count: '',
                timer: null,
                show: true,
                realName: '',
                idCard: '',
                mobile: '',
                verifCode: 1234,  // 验证码
                showIdentityInfo: false,
                showTelInfo:  false,
            }
        },
        created(opts) {
            this.realName = this.$route.query.realName
            this.idCard = this.$route.query.idCard
            this.mobile = this.$route.query.mobile
            console.log(this.$route.query)
        },
        methods: {
            changeIdentityInfo() {
                this.showIdentityInfo = true;
            },
            changeTelInfo() {
                this.showTelInfo = true;
            },
            changeIdentityInfoHandle() {
                
            },
            getCode() {
                let mobile = this.mobile;
                send({ mobile: mobile}).then(res => {
                    if(res.code == 200) {
                        const TIME_COUNT = 60;
                        if (!this.timer) {
                            this.count = TIME_COUNT;
                            this.show = false;
                            this.timer = setInterval(() => {
                                if (this.count > 0 && this.count <= TIME_COUNT) {
                                    this.count--;
                                } else {
                                    this.show = true;
                                    clearInterval(this.timer);
                                    this.timer = null;
                                }
                            }, 1000)
                        }
                    } else {
                        this.toast = true;
                        this.toastText = res.message
                    }
                })
            }
        },
        computed: {
            canChangeIdentityInfo: function() {
                if(this.idCard == '' || this.realName =='' ) {
                    return false;
                } else {
                    return true;
                }
            }
        }

    }
</script>

<style>
    .myInfo {
        padding: 11px 17px;
    }

    .custombottom {
        bottom: 35%!important;
    }
</style>