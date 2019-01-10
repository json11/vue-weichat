<template>
    <div class="wrapper">
        <SelectList></SelectList>

        <div class="list" v-if="!isEmpty" v-cloak>
            <list-item v-for="(item, index) in carList" :key="index" :data="item" @click.native="toDetail(item)"></list-item>
        </div>
        <div class="empty" v-else v-cloak>
            <img src="../../views/MyBook/assets/empty.png" alt="empty">
            <p>暂未找到你需要的车型</p>
        </div>
    </div>

</template>

<script>
    import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';
    import SelectList from '../SelectList/SelectList.vue';
    import ListItem from './ListItem.vue';
    export default {
        name: 'list',
        components: {
            SelectList,
            ListItem
        },
        computed: {
            ...mapState(['tabShow','carList']),
            isEmpty: function () {
                if(!!this.carList.length) return false
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
