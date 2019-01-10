<template>
    <div class="list-view">
        <Tab ref="tab"></Tab>
        <transition name="right-slide">
            <Selectors v-show="selectorShow"></Selectors>
        </transition>

        <div class="list">
            <List></List>
        </div>
        <div class="mask" v-show="tabShow" @click="handleClickMask"></div>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';
    import Tab from '../Tab/Tab.vue';
    import Selectors from '../Selectors/Selectors.vue';
    import List from '../../components/List/List.vue';
    export default {
        name: 'ListView',
        beforeRouteEnter(to, from , next) {
            next(vm => {
                vm.hideTab();
                vm.toHideSelector();
            });
        },
        beforeRouteLeave(to, from , next) {
            if(to.path === '/detail') {
                from.meta.keepAlive = true;
            } else {
                from.meta.keepAlive = false;
            }
            next();
        },
        data() {
            return {}
        },
        computed: {
            ...mapState(['selectorShow','currentTap','tabShow','curBrand','curUseful','minEndurance','maxEndurance','minPrice','maxPrice','brands','limitPrice','limitEndurance']),
            ...mapGetters(['rangePrice', 'rangeEndurance'])
        },
        components: {
            Tab,
            Selectors,
            List,
        },
        watch: {
            selectorShow(newName, oldName) {
                if(!!newName) {
                    document.body.style.position= 'fixed';
                    document.body.style.overflow= 'hidden';
                    document.body.style.top='0px';
                }else {
                    document.body.style.position= 'relative';
                }
            }
        },
        mounted() {
            if(!this.brands || !this.brands.length) {
                this.getSearchCondition();
            }

            let {min,max,type} = this.$route.params;
            let ratePrice = 100 / this.limitPrice ;
            let rateEndurance =  100 / this.limitEndurance;

            if(type == 'price') {
                this.selectPrice({min: Math.ceil(min * ratePrice),max: Math.ceil(max * ratePrice)});
            } else if(type == 'endurance') {
                this.selectEndurance({min: Math.ceil(min * rateEndurance),max: Math.ceil(max * rateEndurance)});
            }

            this.getCarList();
        },
        methods: {
            ...mapMutations(['hideTab','toHideSelector','selectPrice','selectEndurance','resetBrand','resetPrice','resetEndurance']),
            ...mapActions(['getCarList','getSearchCondition']),
            handleClickMask() {
                if(this.currentTap === 'brand') {
                    this.resetBrand();
                } else if(this.currentTap === 'price') {
                    this.resetPrice();
                    this.$refs.tab.resetPriceFn();
                } else if(this.currentTap === 'endurance') {
                    this.resetEndurance();
                    this.$refs.tab.resetEnduranceFn();
                }
                this.hideTab();
                this.getCarList();
            }
        }
    }
</script>

<style lang="stylus" type="text/stylus" scoped>
    .list-view {
        height: 100%
        padding-top 44px
    }
    #tab {
        position: fixed
        top:0
        left:0
        background #fff
        text-align right
        height:44px
        width:100%
        z-index:9999
    }
    .list {
        height 100%
        padding-bottom 40px
        overflow: auto
    }
    .mask {
        position fixed
        top:0
        left:0
        width: 100%
        height: 100%
        background rgba(0,0,0,0.1)
    }
    .right-slide-enter,
    .right-slide-leave-active {
        transform: translateX(100%);
    }
    /*.right-slide-leave-active,*/
    .right-slide-enter-active {
        transition: all 0.3s;
    }
</style>