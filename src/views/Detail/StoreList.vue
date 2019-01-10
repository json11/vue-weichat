<template>
    <div class="store-list">
        <div class="store" v-if="!isEmpty" v-cloak>
            <Store v-for="store,index in storeInfo" :key="index" :data="store" :showModal="showModal"></Store>
        </div>
        <div class="empty" v-else v-cloak>
            <p>附近暂无售此车的门店，请查看其它车型试试！</p>
        </div>
    </div>
</template>

<script>
    import Store from './Store.vue';

    export default {
        name: 'store-list',
        components: {
            Store
        },
        props: {
            showModal: {
                type: Function,
                require: true
            },
            storeInfo: {
                type: Array,
                default: () => []
            }
        },
        computed: {
            isEmpty: function () {
                if(!!this.storeInfo.length) return false
                return true
            }
        },
        data() {
            return {}
        }
    }
</script>

<style lang="stylus" type="text/stylus" scoped>
    .store-list {
        background #f6f6f6
        padding-bottom 0.2rem
    }
    .store {
        width:6.9rem
        margin: 0.2rem auto 0
        border-radius 0.12rem
    }
    .empty {
        min-height:0.8rem
        line-height 0.8rem
        text-align center
        font-size 14px
        color: #4a4a4a
        background #ffffff
    }
</style>