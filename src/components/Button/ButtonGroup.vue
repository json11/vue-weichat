<template>
    <div class="button-group">
        <Button actionType="reset" @click.native="resetConfig" :type="type">重置</Button>
        <Button actionType="confirm" @click.native="handleHide" :type="type">确定</Button>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';
    import Button from './Button.vue';

    export default {
        name: 'button-group',
        props: {
            type: {
                type: String,
            },
            resetPriceFn: {
                type: Function
            },
            resetEnduranceFn: {
                type: Function
            }
        },
        computed: {
            ...mapState(['currentTap'])
        },
        components: {
            Button
        },
        methods: {
            ...mapMutations(['hideTab', 'toHideSelector', 'reset', 'resetBrand', 'resetPrice', 'resetEndurance', 'resetUseful', 'resetBattery']),
            ...mapActions(['getCarList']),
            handleHide() {
                this.hideTab();
                this.toHideSelector();
                this.getCarList();
            },
            resetConfig() {
                if(this.type === 'single') {  // 单个重置
                    if(this.currentTap === 'brand') {
                        this.resetBrand();
                    } else if(this.currentTap === 'price') {
                        this.resetPrice();
                        this.resetPriceFn();
                    } else if(this.currentTap === 'endurance') {
                        this.resetEndurance();
                        this.resetEnduranceFn();
                    }
                } else { // 全部重置
                    this.resetBrand();
                    this.resetPrice();
                    this.resetPriceFn();
                    this.resetEndurance();
                    this.resetEnduranceFn();
                    this.resetUseful();
                    this.resetBattery();
                }
                this.hideTab();
                this.toHideSelector();
                this.getCarList();
            }
        }
    }
</script>

<style lang="stylus" type="text/stylus" scoped>
.button-group {
    width: 100%
    font-size 0
}
</style>