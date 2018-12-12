<template>
    <div class="index">
        <div v-wechat-title="$route.meta.title"></div>
        fsdkfhsl
        <nw-footer isSelected1></nw-footer>
    </div>
</template>  
<script>
    import { Tabbar, TabbarItem } from 'vux'
    import nwFooter from '../../components/nwFooter'
    export default {
        name: 'index',
        components: {
            nwFooter
        },
        data() {
            return {

            }
        },
    }
</script>

