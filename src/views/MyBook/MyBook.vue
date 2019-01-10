<template>
    <div class="myBook">
        <div class="bookList" v-if="!isEmpty" v-cloak>
            <book-item v-for="(item, index) in bookList" :key="index" :data="item"></book-item>
        </div>
        <div class="empty" v-else v-cloak>
            <img src="./assets/empty.png" alt="empty">
            <p>暂无预约记录</p>
            <button @click="goToHome">立即预约</button>
        </div>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex';
    import BookItem from './BookItem.vue';
    export default {
        name: 'MyBook',
        beforeRouteEnter(to, from , next) {
            next(vm => {document.title= '车型精选';})
        },
        data() {
            return {
                show: false
            }
        },
        computed: {
            ...mapState(['bookList']),
            isEmpty: function () {
                if(!!this.bookList.length) return false
                return true
            }
        },
        mounted() {
        },
        components: {
            BookItem,
        },
        methods: {
            goToHome() {
                this.$router.replace('/')
            }
        }
    }
</script>

<style lang="stylus" type="text/stylus" scoped>
    .myBook {
        background #F8F8F8
    }
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
        button {
            width 6.3rem
            height 1.14rem
            margin-top 0.88rem
            text-align center
            line-height 1.14rem
            background: #FFE540;
            background-image: linear-gradient(-132deg, #ffdc2a 0%, #fff466 100%);
            box-shadow: 0 -2px 12px 0 rgba(255, 230, 0, 0.44);
            border-radius: 2rem;
            font-size 20px
            color: #000
            border none
            outline none
        }
    }
    [v-cloak] {
        display:none;
    }
</style>