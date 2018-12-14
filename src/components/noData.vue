<template>
    <div class="no-data" :style="{color:fontColor,height: containerHeight}">
        <p>{{ explain }}</p>
    </div>
</template>

<script>
    export default {
        name: 'nodata',
        data() {
            return {}
        },
        props: {
            /**
            * 字体颜色
            */
            fontColor: {
                type: String,
                default: '#333' 
            },
            /**
             * 高度
            */
            containerHeight:{
                type: String,
                default: ''
            },
            explain: {
                type: String,
                default: '暂无数据' 
            }
        }
    }
</script>

<style scoped lang="less">
    .no-data  {
        position: relative;
        width: 100%;
        height: 60%; 
        text-align: center;
        background: url('../assets/images/img_emptystate@3x.png') no-repeat center;
        background-size: 4.5rem;
        p {
            position: absolute;
            bottom: 1rem;
            width: 100%;
            text-align: center;
            font-size: 13px;
            font-weight: 400;
            line-height: 18px;
        }
    }
</style>