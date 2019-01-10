<template>
    <div class="banner">
        <swipe class="my-swipe" ref="mySwipe" :auto="0" :noDragWhenSingle="false" :continuous="false" :show-indicators="true" @change="changeSwipe">
            <swipe-item class="slide" v-for="item,index in picList" :key="index" >
                <img :src="item.picUrl" @click="previewImage(item.picUrl)"/>
            </swipe-item>
        </swipe>
        <div class="tip">{{tip}}</div>
    </div>
</template>

<script>
    import 'vue-swipe/dist/vue-swipe.css';
    import { Swipe, SwipeItem } from 'vue-swipe';

    export default {
        name: 'banner',
        props: {
            picList: {
                type: Array,
                default: ()=> []
            }
        },
        data() {
            return {
                currentIndex: 1,
            }
        },
        components: {
            Swipe,SwipeItem
        },
        computed: {
          tip() {
              return `${this.currentIndex}/${this.picList.length}`
          },
            getPreviewImages() {
                let result = [];
                this.picList.forEach(function (item) {
                    result.push(item.picUrl || '');
                });
                return result
            }
        },
        methods: {
            changeSwipe(newIndex, oldIndex) {
                this.currentIndex = newIndex+1;
            },
            previewImage(url) {
                wx.previewImage({
                    current: url, // 当前显示图片的http链接
                    urls: this.getPreviewImages // 需要预览的图片http链接列表
                });
            }
        }
    }
</script>

<style lang="stylus" type="text/stylus" scoped>
    .banner {
        position: relative
        .tip {
            position: absolute
            bottom:0.38rem
            right:0.24rem
            width:57px;
            height:20px;
            line-height 20px
            text-align center
            background:#d8d8d8;
            border-radius:19px;
            font-size 12px
            color: #fff
            z-index 9
        }
    }
    img {
        width: 100%
        height 3.52rem
        margin: 0 auto
    }
</style>