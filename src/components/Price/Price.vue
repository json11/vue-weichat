<template>
    <div class="price">
        <div class="headline">
            <Headline :title="title"></Headline>
        </div>
        <div class="price-select">
            <price-select :selectFun="selectFun" :curValue="curValue" ></price-select>
        </div>
        <div class="slider">
            <Slider :value-fun="valueFun" :min="0" :max="100" :range="range"></Slider>
        </div>
    </div>

</template>

<script>
    /**
     *  * 组件内部不写业务逻辑
     *  该组件对外暴露两个参数
     *
     */
    import PriceSelect from '../PriceSelect/PriceSelect.vue';
    import Slider from '../Slider/Slider.vue';
    import Headline from '../Headline/Headline.vue';

    export default {
        name: 'price',
        components: {
            Slider,
            PriceSelect,
            Headline
        },
        props: {
            /// slider
            "valueFun":{
                type:Function,
                required: true,
            },
            "max":{
                type:Number,
                default:100
            },
            "min":{
                type:Number,
                default:0
            },
            "range": {
                type: String,
                default: null
            },

            /// priceSelect
            "selectFun": {
                type: Function,
                required: true
            },
            "curValue": {
                type: String,
            },

            /// 品牌
            "title": {
                type: String,
                require: true
            }
        },
        data() {
            return {

            }
        },
        methods: {

        }
    }
</script>

<style lang="stylus" type="text/stylus" scoped>
    .price {
        padding-bottom 0.4rem
        background #fff
    }
    .price-select {

    }
    .slider {
        margin-top: 0.4rem;
    }
</style>