<template>
    <div class="demo">
        <x-header></x-header>
        Demo<span>{{tip}}</span>
        <div class="container">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Quaerat nihil incidunt iusto, quo autem est, accusantium assumenda id 
            inventore corrupti veritatis! 
            Omnis ducimus consectetur commodi qui adipisci voluptas, velit aperiam!
        </div>
    </div>
</template>

<script>
import { satinCommentApi } from '../service/api'
import { XHeader } from 'vux'
    export default{
        name: 'home',
        components: {
            XHeader
        },
        data() {
            return {
                tip: 'hello'
            }
        },
        mounted() {
            let params = {
                    type: 'group'
            }
            satinCommentApi(params).then(res => {
                console.log(res)
            })
        },
    }
</script>

<!-- <style scoped lang="less">
    @width: 100%;
    @height: 100%;
    @color: #333;
    @white: #fff;
    @borderH: 1px;
    @left: 15px;

    @images: '../assets/logo.png';

    .bordered {
        border-bottom: solid 1px black;
    }

    .demo {
        width: 100%;
        height: 300px;
        background: url(@images) center;
        background-size: cover;
            .container{
                color: @white;
                width: @width;
                background: @color;
                margin-bottom: 15px;
                .bordered();
            }
        span {
            font-size: 12px;
            color: red;
        }
    }
</style> -->