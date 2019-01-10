<template>
    <div class="list-item">
        <img v-show="data.markFlag" class="hot" src="./assets/hot.png" alt="hot">
        <div class="left">
            <img :src="data.picUrl" :alt="data.smModel">
        </div>
        <div class="right">
            <p class="model">{{data.smModel}}</p>
            <p class="m-labels">续航里程{{mileage}}km</p>
            <p class="price">零售参考：<span class="icon-rmb">￥</span><span class="amt">{{data.retailGuidePrice}}</span></p>
            <p class="count" v-show="!!data.salesNum">已销售 {{data.salesNum}} 量</p>
            <p class="c-labels">
                <span v-for="(cLabel, index) in data.modelLabel" :key="index">{{cLabel}}</span>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'list-item',
        data() {
            return {}
        },
        props: {
            data: {
                type: Object,
                require: true
            }
        },
        computed: {
            mileage() {
              if(this.data.minMileage === this.data.maxMileage) {
                return this.data.minMileage
              }
              return  `${this.data.minMileage} - ${this.data.maxMileage}`
            }
        }
    }
</script>

<style lang="stylus" type="text/stylus" scoped>
    .list-item {
        position: relative
        width 6.72rem
        min-height:2.52rem
        margin 0.26rem auto 0
        background:#ffffff;
        box-shadow:0 2px 4px 0 rgba(155,155,155,0.33);
        border-radius:7px;
        .hot {
            position: absolute
            top: -0.14rem
            left: -0.18rem
            width:0.9rem
        }
        .left {
            float: left
            width:2rem
            heigh 100%
            min-height  2.52rem
            display flex
            align-items center
            justify-content center
            img {
                display: inline-block
                width:1.8rem
            }
        }
        .right {
            overflow: hidden
            margin-right 0.12rem
            padding-bottom 0.24rem
            font-size 12px
            color: #4a4a4a
            .model {
                margin-top 0.2rem
                font-size 14px
                color: #000
                font-weight 500
            }
            .m-labels {
                margin-top 0.1rem
                font-size 10px
                color: #4a4a4a
                span {
                    &:not(:first-child) {
                        margin-left 5px
                    }
                }
            }
            .price {
                margin-top 0.2rem
                .icon-rmb {
                    font-size 14px
                    color: #d4493b
                }
                .amt {
                    font-size 20px
                    color: #d4493b
                    font-weight 500
                }
            }
            .count {
                margin-top 0.2rem
            }
            .c-labels {
                margin-top 0.24rem
                font-size 0
                color: #9b9b9b
                span {
                    display: inline-block
                    min-width: 0.8rem
                    text-align center
                    padding 3px 5px
                    font-size 8px
                    color: #9b9b9b
                    background:#f1f1f1;
                    border-radius:140px;
                    margin-right 0.1rem
                    margin-top 3px
                }
            }
        }
    }
</style>