<template>
    <div class="store">
        <a :href="'tel:' + data.telphone" class="storeName">{{data.storeName}}<img src="../MyBook/assets/icon_orangephone@2x.png" alt="tel"></a>
        <p class="count">在售{{data.modelNum}}款车型</p>
        <p class="distance"><img src="./assets/icon-location.png" alt="icon-location">距离<span>{{data.distance}}</span></p>
        <button class="book" @click="book">预约试驾</button>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex';
    export default {
        name: 'store',
        props: {
            data: {
                type: Object,
                require: true
            },
            showModal: {
                type: Function,
                require: true
            }
        },
        methods: {
            ...mapMutations(['selectStore']),
            book() {
                this.selectStore(this.data);
                this.showModal()
            }
        }
    }
</script>

<style lang="stylus" type="text/stylus" scoped>
    .store {
        position: relative
        padding-left 0.3rem
        padding-bottom 0.3rem
        overflow: hidden
        background #ffffff
        .storeName{
            display block
            margin-top 0.5rem
            font-size 14px
            color: #000
            img {
                margin-left 0.44rem
                width:12px
            }
        }
        .count {
            margin-top 0.2rem
            font-size 14px
            color: #4a4a4a
        }
        .distance {
            margin-top 0.2rem
            font-size 14px
            color: #9b9b9b
            img {
                display: inline-block
                vertical-align: middle
                width: 0.28rem
            }
            span {
                color: rgb(63, 113,170)
            }
        }
        .book {
            position: absolute
            bottom:0.2rem
            right:0.1rem
            background:#ffe540;
            background-image:linear-gradient(90deg, rgb(255, 244, 101) 0%, rgb(255, 214, 28) 100%);
            box-shadow:0 -2px 2px 0 rgba(255,230,0,0.44);
            border-radius:2rem;
            width:1.8rem;
            color: #000
            font-size 14px
            border none
            outline:none
            height:0.48rem
            font-weight 500
        }
        .activity {
            position: absolute
            top:0
            left:0
            width:0.6rem
            left: 0.16rem;
            top:-0.1rem
        }
    }
</style>