<template>
    <div class="selectList">
        <span v-show="resetShow" @click="resetConfig">重置<img src="./assets/refresh.png" alt="del"></span>
        <span v-for="(item, index) in curBrand" @click="_delBrand(item)">{{item}}<img src="./assets/del.png" alt="del"></span>
        <span v-for="(item, index) in curBattery" @click="_delBattery(item)">{{item}} <img src="./assets/del.png" alt="del"></span>
        <span v-for="(item, index) in curUsefulList" :key="index.id" @click="_delUseful(item.id)">{{item.name}}<img src="./assets/del.png" alt="del"></span>
        <span v-show="curRangePrice" @click="_resetPrice">{{`价格${curRangePrice}`}} <img  src="./assets/del.png" alt="del"></span>
        <span v-show="curRangeEndurance" @click="_resetEndurance">{{`续航${curRangeEndurance}`}}<img src="./assets/del.png" alt="del"></span>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';
    export default {
        name: 'SelectLsit',
        components: {},
        props: {},
        data() {
            return {}
        },
        computed: {
            ...mapState(['curBrand','curBattery','curUseful','usefuls']),
            ...mapGetters(['rangePrice','rangeEndurance']),
            curUsefulList: function () {
                return this.usefuls.filter((item) => this.curUseful.indexOf(item.id) > -1)
            },
            curRangePrice() {
                if(this.rangePrice == '不限') {
                    return false
                }
                return this.rangePrice
            },
            curRangeEndurance() {
                if(this.rangeEndurance == '不限') {
                    return false
                }
                return this.rangeEndurance
            },
            resetShow() {
                if(this.rangePrice != '不限' || this.rangeEndurance != '不限') {
                    return true
                }
                if(this.curBrand && !!this.curBrand.length) {
                    return true
                }
                if(this.curBattery && !!this.curBattery.length) {
                    return true
                }
                if(this.curUseful && !!this.curUseful.length) {
                    return true
                }
                return false
            }
        },
        methods: {
            ...mapMutations(['delBrand','delBattery','delUseful','resetBrand', 'resetPrice', 'resetEndurance', 'resetUseful', 'resetBattery']),
            ...mapActions(['getCarList']),
            _delBrand(item) {
                this.delBrand(item);
                this.getCarList();
            },
            _delBattery(item) {
                this.delBattery(item);
                this.getCarList();
            },
            _delUseful(id) {
                this.delUseful(id);
                this.getCarList();
            },
            _resetPrice() {
                this.resetPrice();
                this.getCarList();
            },
            _resetEndurance() {
                this.resetEndurance();
                this.getCarList();
            },
            resetConfig() {
                this.resetBrand();
                this.resetPrice();
                this.resetEndurance();
                this.resetUseful();
                this.resetBattery();
                this.getCarList();
            }
        }

    }
</script>

<style lang="stylus" type="text/stylus" scoped>
    .selectList {
        background #F8F8F8
        overflow: hidden
        span {
            display inline-block
            position: relative
            padding: 3px 10px
            background #ffffff
            border-radius 5px
            margin 10px
            img {
                display inline-block
                width: 0.2rem
                margin-left 3px
            }
        }
    }
</style>