<template>
    <div class="banner">
        <yd-lightbox>
            <yd-slider paginationActiveColor="#ffe600" :callback="callback" speed= 800>
                <yd-slider-item v-for="item,index in bannerList" :key="index" >
                    <img :src="item.imgPath" @click="handleClick(item)"/>
                </yd-slider-item>
            </yd-slider>
        </yd-lightbox>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex';
    export default {
        name: 'banner',
        data() {
            return {}
        },
        computed: {
            ...mapState(['bannerList'])
        },
        mounted() {
            this.getBannerList();
        },
        methods: {
            ...mapActions(['getBannerList']),
            handleClick(data) {
                if(data.type != '2') {
                    location.href= data.path;
                }
            },
            callback(index) {
                console.log('当前滑动到'+index);
            }
        }
    }
</script>

<style lang="stylus" type="text/stylus" scoped>
    .banner {
        position: relative
    }
    img {
        display block
        height 2.88rem
        margin: 0 auto
    }
</style>