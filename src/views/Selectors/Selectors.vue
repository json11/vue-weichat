


<template>
    <div class="selectors">
        <div class="wrapper">
            <!--品牌选择器-->
            <div class="brand">
                <div class="headline">
                    <Headline :title="brand.titleBrand"></Headline>
                </div>
                <div class="brand-select">
                    <brand-select :selectFun="selectBrand" :brands="brands" :curValue="curBrand"></brand-select>
                </div>
            </div>
            <!--价格选择器-->
            <div class="price">
                <div class="headline">
                    <Headline :title="price.titlePrice"></Headline>
                </div>
                <div class="slider">
                    <Slider ref="priceSlider" :value-fun="selectPrice" :min="price.minPrice" :max="price.maxPrice" :range="rangePrice" :limit="limitPrice"></Slider>
                </div>
            </div>
            <!--电池类型-->
            <div class="battery">
                <div class="headline">
                    <Headline :title="battery.titleUseful"></Headline>
                </div>
                <div class="useful-select">
                    <battery-select :selectFun="selectBattery" :batterys="batterys" :curBattery="curBattery"></battery-select>
                </div>
            </div>
            <!--用途-->
            <div class="useful">
                <div class="headline">
                    <Headline :title="useful.titleUseful"></Headline>
                </div>
                <div class="useful-select">
                    <useful-select :selectFun="selectUseful" :usefuls="usefuls" :curValue="curUseful"></useful-select>
                </div>
            </div>
            <!--续航能力-->
            <div class="endurance">
                <div class="headline">
                    <Headline :title="endurance.titleEndurance"></Headline>
                </div>
                <div class="slider">
                    <Slider ref="enduranceSlider" :value-fun="selectEndurance" :min="endurance.minEndurance" :max="endurance.maxEndurance" :range="rangeEndurance" :limit="limitEndurance"></Slider>
                </div>
            </div>
        </div>
        <div class="button-group">
            <ButtonGroup type="all" :resetPriceFn="resetPriceFn" :resetEnduranceFn="resetEnduranceFn"></ButtonGroup>
        </div>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';
    /**
     *  页面级组件 用 $emit  父子传值
     *  如果是组件就用props callback
     */
    import BrandSelect from '../../components/BrandSelect/BrandSelect.vue';

    import PriceSelect from '../../components/PriceSelect/PriceSelect.vue';
    import Slider from '../../components/Slider/Slider.vue';
    import Headline from '../../components/Headline/Headline.vue';

    import UsefulSelect from '../../components/UsefulSelect/UsefulSelect.vue';
    import BatterySelect from '../../components/BatterySelect/BatterySelect.vue';

    import ButtonGroup from '../../components/Button/ButtonGroup.vue';

    export default {
        name: 'Selectors',
        components: {
            BrandSelect,
            PriceSelect,
            Headline,
            Slider,
            BatterySelect,
            UsefulSelect,
            ButtonGroup
        },
        computed: {
            ...mapState([
                'brands','curBrand', 'usefuls','curUseful','batterys','curBattery',
                'selectorShow', 'minPrice', 'maxPrice', 'limitPrice',
                'minEndurance', 'maxEndurance','limitEndurance'
            ]),
            ...mapGetters(['rangePrice', 'rangeEndurance'])
        },
        data() {
            return {
                brand: {
                    titleBrand: '品牌',
                    curBrand: '',
                },
                price: {
                    titlePrice: '价格',
                    minPrice: 0,
                    maxPrice: 0,
                    rangePrice: '不限',
                    limit: 80
                },
                battery: {
                    titleUseful: '电池类型',
                    curUseful: '',
                },
                useful: {
                    titleUseful: '用途',
                    curUseful: '',
                },
                endurance: {
                    titleEndurance: '续航能力',
                    minEndurance: 0,
                    maxEndurance: 0,
                    rangeEndurance: '不限',
                    limit: 500
                }
            }
        },
        watch: {
            selectorShow(newName, oldName) {
                this.price.minPrice= this.minPrice;
                this.price.maxPrice= this.maxPrice;
                this.endurance.minEndurance= this.minEndurance;
                this.endurance.maxEndurance= this.maxEndurance;
            }
        },
        methods: {
            ...mapMutations(['toHideSelector','selectBrand','selectPrice','selectBattery', 'selectUseful','selectEndurance']),
            /// 重置
            _resetSlider(ref) {
                let propo = ref.$refs.propo;
                let rightBtn = ref.$refs.rightBtn;
                let leftBtn = ref.$refs.leftBtn;
                propo.style.width = 0;
                propo.style.left =0;
                leftBtn.style.left=0;
                rightBtn.style.left=0;
            },
            resetPriceFn() {
                let priceSlider = this.$refs.priceSlider;
                this._resetSlider(priceSlider)
            },
            resetEnduranceFn() {
                let enduranceSlider = this.$refs.enduranceSlider;
                this._resetSlider(enduranceSlider)
            }
        }
    }
</script>

<style lang="stylus" type="text/stylus" scoped>
    .selectors {
        position: relative
        width 100%
        padding-bottom 30px
        box-shadow:-11px 4px 8px 0 rgba(0,0,0,0.09);
        .wrapper {
            width 100%
            height 11.86rem
            padding-bottom 2rem
            overflow: auto
            overflow-scrolling touch
            -webkit-overflow-scrolling touch
        }
    }
    .slider {
        margin-top: 0.6rem;
        background #fff
    }
    .price {
        padding-bottom 0.4rem
        background #fff
    }
    .endurance {
        padding-bottom 0.4rem
        background #fff
    }
    .button-group {
        position: fixed
        width 100%
        height:30px
        bottom:0
        left:0
        z-index 9999
    }
</style>