<template>
    <div class="wrapper">
        <div class="list" v-if="!isEmpty" v-cloak>
            <yd-list theme="4">
                <list-item v-for="(item, index) in hotCarList" :key="index" :data="item" @click.native="toDetail(item)"></list-item>
            </yd-list>
        </div>
        <div class="empty" v-else v-cloak>
            <img src="../../views/MyBook/assets/empty.png" alt="empty">
            <p>暂无数据</p>
        </div>
    </div>
</template>


<script>
    import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';
    import ListItem from './ListItem.vue';
    export default {
        name: 'hotList',
        components: {
            ListItem
        },
        computed: {
            ...mapState(['tabShow','hotCarList']),
            isEmpty: function () {
                if(!!this.hotCarList.length) return false
                return true
            }
        },
        data() {
            return {}
        },
        methods: {
            ...mapMutations(['hideTab', 'toHideSelector','selectModel']),
            toDetail(data) {
                if(this.tabShow) { // 此时的show 应该是tabShow
                    this.hideTab();
                    this.toHideSelector();
                } else {
                    this.selectModel(data);
                    this.$router.push({path: '/detail'})
                }
            }
        }
    }
</script>

<style lang="stylus" type="text/stylus" scoped>
    .empty {
        text-align center
        img {
            width: 2.2rem
            margin: 1.96rem auto 0
        }
        p {
            margin-top 0.7rem
            font-size 14px
            color: #9b9b9b
        }
    }
    [v-cloak] {
        display:none;
    }
</style>
