<template>
    <div class="brand-select">
        <div
            class="brand-item"
            v-for="(brand, index) in brands"
            :key="index"
            :class="curValue.indexOf(brand.brandName) > -1  ? 'active' : '' "
            @click="handleClick(brand)">
            <img :src="brand.logoUrl" :alt="brand.brandName">
            <p class="brand">{{brand.brandName}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'brand-select',
        components: {},
        props: {
            selectFun: {
                type: Function,
                require: true
            },
            curValue: {
                type: Array,
            },
            brands: {
                type: Array
            }
        },
        data() {
            return {}
        },
        methods: {
            handleClick(brand) {
                this.selectFun && this.selectFun(brand);
            }
        }

    }
</script>

<style lang="stylus" type="text/stylus" scoped>
    .brand-select {
        width: 100%;
        padding: 0 0.16rem 0.4rem;
        background: #fff;
        overflow-x:hidden;
        word-wrap: break-word;
        word-break: normal;
        .brand-item {
            float: left;
            min-height : 1.3rem;
            text-align center
            font-size 0;
            &.active {
                img {
                    border: 1px solid #ffe600;
                    border-radius: 100%;
                }
            }
            img {
                display: block
                width:1rem
                height 1rem
                margin:0 0.24rem
            }
            p {
                font-size 10px;
                color: #4a4a4a;
            }
        }
    }
</style>