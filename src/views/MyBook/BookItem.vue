<template>
    <div class="bookItem">
        <a :href="'tel:'+ data.storeTelphone" class="storeTelephone">预约门店：<span>{{data.storeName}}</span><img src="./assets/icon_orangephone@2x.png" alt="telephone"></a>
        <p class="bookTime">预约提交时间：<span>{{data.createdTimeStr}}</span></p>
        <p class="telephone">电话号码：<span>{{data.telphone}}</span></p>
        <p class="telephone" v-show="data.smModel">预约车型：<span>{{data.smModel}}</span></p>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';
    import Tab from '../Tab/Tab.vue';
    import Selectors from '../Selectors/Selectors.vue';
    import List from '../../components/List/List.vue';
    export default {
        name: 'BookItem',
        props: {
            data: {
                type: Object
            }
        }
    }
</script>

<style lang="stylus" type="text/stylus" scoped>
    .bookItem {
        width 7rem
        min-height 2.4rem
        margin 0.2rem auto 0
        padding 0.4rem 0.54rem
        background:#ffffff;
        box-shadow:0 2px 4px 0 #c8c8c8;
        border-radius: 0.2rem;
        font-size 14px
        color: #9b9b9b
        p {
            margin-top 0.2rem
        }
        span {
            color: #4a4a4a
        }
        img {
            display inline-block
            width 0.24rem
            margin-left 0.4rem
            vertical-align middle
        }
    }
</style>