<template>
    <div class="footer">
        <tabbar style="position: fixed;">
            <tabbar-item link="/" :selected="isSelected1">
                <span slot="label">首页</span>
            </tabbar-item>
            <tabbar-item badge="2" link="/my" :selected="isSelected2">
                <span slot="label">我的</span>
            </tabbar-item>
        </tabbar>
    </div>
</template>

<script>
    import { Tabbar, TabbarItem } from 'vux'
    export default {
        name: 'footer',
        components:{
            Tabbar,
            TabbarItem
        },
        props: {
            isSelected1: {
                type: [Boolean,String],
                default: false
            },
            isSelected2: {
                type: Boolean,
                default: false
            },
        },
        data() {
            return {

            }
        }
    }
</script>
