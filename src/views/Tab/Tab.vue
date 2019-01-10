<template>
    <div class="tab-wrapper">
        <div id="tab">
            <div class="tab-item" :class="[(!!tabShow && currentTap == 'brand') ? 'active' : '']" @click="handleBrandClick">
                <span>品牌</span>
            </div>
            <div class="tab-item" :class="[(!!tabShow && currentTap == 'price') ? 'active' : '']" @click="handlePriceClick">
                <span>价格</span>
            </div>
            <div class="tab-item" :class="[(!!tabShow && currentTap == 'endurance') ? 'active' : '']" @click="handleEnduranceClick">
                <span>续航能力</span>
            </div>
            <div class="tab-item" :class="[(!!selectorShow && currentTap == 'selector') ? 'active' : '']" @click="handleSelectorClick">
                <span>筛选</span>
                <img v-if="!!selectorShow && currentTap == 'selector'" :src="Selected" class="icon-selector" alt="">
                <img v-else :src="Selector" class="icon-selector" alt="">
            </div>
        </div>

        <div id="tab-panel" :class="{tabShow}">
            <div class="content">
                <div v-show="currentTap === 'brand'" class="brand-select">
                    <brand-select :selectFun="selectBrand" :brands="brands" :curValue="curBrand"></brand-select>
                </div>
                <div v-show="currentTap === 'price'" class="price-select">
                    <div class="slider">
                        <Slider ref="priceSlider" :value-fun="selectPrice" :min="price.minPrice" :max="price.maxPrice" :range="rangePrice" :limit="limitPrice"></Slider>
                    </div>
                </div>
                <div v-show="currentTap === 'endurance'" class="endurance-select">
                    <div class="slider">
                        <Slider ref="enduranceSlider" :value-fun="selectEndurance" :min="endurance.minEndurance" :max="endurance.maxEndurance" :range="rangeEndurance" :limit="limitEndurance"></Slider>
                    </div>
                </div>
            </div>
            <div class="button-group">
                <ButtonGroup type="single" :resetPriceFn="resetPriceFn" :resetEnduranceFn="resetEnduranceFn"></ButtonGroup>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';

    import Normal from './assets/normal.png';
    import Up from './assets/up.png';
    import Down from './assets/down.png';
    import Selector from './assets/selector.png';
    import Selected from './assets/selected.png';

    import BrandSelect from '../../components/BrandSelect/BrandSelect.vue';
    import PriceSelect from '../../components/PriceSelect/PriceSelect.vue';
    import Slider from '../../components/Slider/Slider.vue';
    import UsefulSelect from '../../components/UsefulSelect/UsefulSelect.vue';
    import ButtonGroup from '../../components/Button/ButtonGroup.vue';

    export default {
        name: 'tab',
        components: {
            BrandSelect,PriceSelect,Slider,UsefulSelect,ButtonGroup
        },
        computed: {
            ...mapState([
                'selectorShow',
                'carList','tabShow','currentTap',
                'brands','curBrand',
                'minPrice', 'maxPrice', 'limitPrice',
                'minEndurance', 'maxEndurance','limitEndurance'
            ]),
            ...mapGetters(['rangePrice', 'rangeEndurance'])
        },
        data() {
            return {
                show: false,
                brand: {
                    titleBrand: '品牌',
                    curBrand: '',
                },
                price: {
                    titlePrice: '价格',
                    minPrice: 0,  // 初始化时的默认值
                    maxPrice: 0,
                    rangePrice: '不限',
                    limit: 80
                },
                endurance: {
                    titleEndurance: '续航能力',
                    minEndurance: 0,
                    maxEndurance: 0,
                    rangeEndurance: '不限',
                    limit: 500
                }
                ,Normal,Up,Down,Selector,Selected
            }
        },
        watch: {
            currentTap: {
                handler(newName, oldName) {
                    if(newName === 'brand' || newName === 'price' || newName === 'endurance') {
                        this.showTab();
                        this.toHideSelector()
                    } else if(newName === 'selector') {
                        this.hideTab();
                    }
                },
                immediate: true
            },
            tabShow(newName, oldName) {
                this.price.minPrice= this.minPrice;
                this.price.maxPrice= this.maxPrice;
                this.endurance.minEndurance= this.minEndurance;
                this.endurance.maxEndurance= this.maxEndurance;
            }
        },
        methods: {
            ...mapMutations(['showTab','hideTab','toggleTab','toShowSelector', 'toHideSelector','toggleSelector','selectBrand','selectPrice','selectEndurance' ]),
            handleBrandClick() {
                this.toggleTab('brand');
                this.toHideSelector();
            },
            handlePriceClick() {
                this.toggleTab('price');
                this.toHideSelector();
            },
            handleEnduranceClick() {
                this.toggleTab('endurance');
                this.toHideSelector();
            },
            handleSelectorClick() {
                this.toggleSelector('selector')
            },
            toTabHide() {
                this.hideTab();
            },
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
            },
            selectPrice1({min,max,total}) {
                let rate = this.limit / 100;
                if(min==max && max == 0) {
                    this.minPrice = min;
                    this.rangePrice= '不限';
                } else {
                    this.maxPrice= max;
                    this.rangePrice=`${parseInt(min * rate)}-${parseInt(max * rate)}万`;
                }
            }
        }

    }
</script>

<style lang="stylus" type="text/stylus" scoped>
    .tab-wrapper {
        position: fixed
        top:0
        left:0
        /*overflow: hidden*/
        width:100%
        z-index 9999
    }
    #tab {
        position: absolute
        top 0
        background #F8F8F8
        text-align right
        height:44px
        line-height 44px
        text-align center
        width:100%
        z-index:9999
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        font-size 16px
        color: #9b9b9b
        .tab-item  {
            width: 1%;
            -webkit-box-flex: 1;
            -webkit-flex: 1;
            -ms-flex: 1;
            flex: 1;
            &.active {
                 color: #000;
             }
            img {
                display inline-block
                vertical-align middle
            }
            .icon-price {
                width: 0.28rem
            }
            .icon-selector {
                width:0.28rem
            }
        }
    }
    #tab-panel {
        position: relative
        width 6.28rem
        height 4.1rem
        margin -4.1rem auto 0
        padding-bottom 0.8rem
        background #ffffff
        box-shadow: 0 -1px 8px 0 rgba(0,0,0,0.5);
        &.tabShow {
            margin 56px auto 0
            transition all 300ms ease-in-out
        }
        .content {
            height:100%;
            overflow: auto
            overflow-scrolling touch
            .brand-select {
                margin-top 0.5rem
            }
            .price-select {
                margin-top 1.5rem
            }
            .endurance-select {
                margin-top 1.5rem
            }
            .slider {
                background #fff
            }
        }
        .button-group {
            position: absolute;
            width 100%
            height:0.8rem
            bottom:0
            left:0
            z-index 99
        }
    }
</style>