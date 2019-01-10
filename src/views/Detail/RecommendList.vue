<template>
    <div class="recommend-list">
        <div class="wrapper">
            <Recommend :fetchData="fetchData" v-for="recommend,index in recommendInfo" :key="index" :data="recommend"></Recommend>
        </div>
    </div>
</template>

<script>
    import Recommend from './Recommend.vue';

    export default {
        name: 'recommend-list',
        components: {
            Recommend
        },
        props: {
            recommendInfo: {
                type: Array
            },
            fetchData: {
                type: Function
            }
        },
        computed: {},
        data() {
            return {}
        }
    }
</script>

<style lang="stylus" type="text/stylus" scoped>
    .recommend-list {
        width 100%
        height:2.4rem
        background #fff
        font-size 0
        overflow auto
        white-space nowrap
        overflow-scrolling touch
    }
</style>