<template>
    <div class="price-select">
        <div v-for="(price, index) in prices" class="price-item">
            <span class="price"
                  :key="price.code"
                  :class="price.code == curValue ? 'active' : '' "
                  @click="handleClick(price)">
                {{price.value}}
            </span>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'price-select',
        components: {},
        props: {
            selectFun: {
                type: Function,
                require: true
            },
            curValue: {
                type: String,
            }
        },
        data() {
            return {
                prices: [{value: '1-5万', code: '1-5'},{value: '5-10万', code: '5-10'},{value: '10-15万', code: '10-15'},{value: '15-20万', code: '15-20'},{value: '20以上万', code: '20'},{value: '20以上万', code: '20'},{value: '20以上万', code: '20'}],
            }
        },
        methods: {
            handleClick(price) {
                this.selectFun && this.selectFun(price);
            }
        }

    }
</script>

<style lang="stylus" type="text/stylus" scoped>
    .price-select {
        width: 100%;
        padding: 0.04rem 0.16rem 0.4rem;
        background: #fff;
        overflow:hidden;
        word-wrap: break-word;
        word-break: normal;
        .price-item {
            float: left;
            margin: 0 0.24rem;
            .price {
                display inline-block
                min-width: 1rem;
                margin: 0.32rem auto 0;
                padding: 0.06rem 0;
                text-align: center;
                font-size: 10px;
                color: #4a4a4a;
                background:#f1f1f1;
                border-radius:0.16rem;
                &.active {
                    background: rgba(255, 247, 178, 0.8);
                }
            }
        }
    }
</style>