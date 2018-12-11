<template>
    <div class="myInfo">
        <group>
            <cell 
                title="身份信息" 
                value="王某某" 
                is-link 
                inline-desc='610324198904183422'
                @click.native="changeIdentityInfo">
            </cell>
            <cell title="手机号" is-link @click.native="changeTel" value="132546"></cell>
        </group>
        <div v-transfer-dom>
            <popup v-model="showIdentityInfo" is-transparent>
                <div class="popup-container">
                    <div class="change-container">
                        cds
                    </div>
                    <div style="padding:20px 15px;">
                        <x-button style="border-radius:99px;">确认修改</x-button>
                    </div>
                </div>
            </popup>
        </div>
    </div>
</template>

<script>
import { Cell, Group, XButton, Popup, TransferDomDirective as TransferDom } from 'vux'
    export default {
        name: 'myInfo',
        directives: {
            TransferDom
        },
        components: {
            Cell, 
            Group,
            XButton,
            Popup
        },
        data() {
            return {
                showIdentityInfo: false
            }
        },
        methods: {
            changeIdentityInfo() {
                this.showIdentityInfo = true;
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
        width: 80%;
        padding: 15px;
        background-color:#fff;
        margin:0 auto;
        border-radius: 10px;
    }

    .weui-btn_default {
        font-size: 16px!important;
        font-weight: 500;
        color:#fff!important;
    }
</style>