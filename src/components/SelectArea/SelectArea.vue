<template>
    <div class="select-area">
        <div class="brand-area wrapper">
            <div class="brands panel">
                <img v-for="(brand, index) in brands" @click="handleBrandClick(brand)" :src="brand.logoUrl" alt="brand.brandName">
            </div>
            <div class="arrow" @click="toListView">
                <img :src="Arrow" alt="arrow">
            </div>
        </div>
        <div class="price-area wrapper">
            <div class="prices panel">
                <span class="price"
                          v-for="(price, index) in prices"
                          :key="price.code" @click="handlePriceClick(price.code)">
                    {{price.value}}
                </span>
            </div>
            <div class="arrow" @click="toListView">
                <img :src="Arrow" alt="arrow">
            </div>
        </div>
        <div class="endurance-area wrapper">
            <div class="endurances panel">
                <span class="endurance-title">续航里程</span>
                <span class="endurance"
                      v-for="(endurance, index) in endurances"
                      :key="endurance.code" @click="handleEnduranceClick(endurance.code)">
                    {{endurance.value}}
                </span>
            </div>
            <div class="arrow" @click="toListView">
                <img :src="Arrow" alt="arrow">
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';

    import Arrow from './assets/accrow.png';

    export default {
        name: 'select-area',
        data() {
            return {
               Arrow
            }
        },
        computed: {
            ...mapState(['brands','prices','endurances'])
        },
        methods: {
            ...mapMutations(['selectBrand','selectPrice','selectEndurance']),
            handleBrandClick(brand) {
                this.selectBrand(brand);
                this.toListView();
            },
            handlePriceClick(code) {
                let min= code.split('-')[0];
                let max= code.split('-')[1];
                this.$router.push({name: 'ListView', params: {min,max,type: 'price'}});
            },
            handleEnduranceClick(code) {
                let min= code.split('-')[0];
                let max= code.split('-')[1];
                this.$router.push({name: 'ListView', params: {min,max,type: 'endurance'}});
            },
            toListView() {
                this.$router.push('listView');
            }
        }
    }
</script>

<style lang="stylus" type="text/stylus" scoped>
    .select-area {
        padding-top 0.12rem
        background #fff
    }
    .wrapper {
        display flex
        flex 1
        align-items center
        &.brand-area {
            padding-left 0.4rem
        }
        .panel {
            flex 1
            white-space nowrap
            font-size 0
            color: #4a4a4a
            overflow-x: auto
            overflow-scrolling touch
            img {
                display inline-block
                width: 1rem
                height: 1rem
            }
            span {
                display: inline-block
                margin-left 0.4rem
                font-size 13px
                &.endurance-title {
                    color: #000
                    font-weight 500
                }
            }
        }
        .arrow {
            width: 0.6rem
            height:1rem
            line-height 1rem
            text-align center
            img {
                display: inline-block
                width:0.18rem
                vertical-align middle
            }
        }
    }
</style>