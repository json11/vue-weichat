<template>
    <div class="recommend" @click="handleClick">
        <img :src="data.picUrl" :alt="data.smModel">
        <p>{{data.smModel}}</p>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';
    export default {
        name: 'recommend',
        props: {
            data: {
                type: Object,
                require: true
            },
            fetchData: {
                type: Function,
                require: true
            }
        },
        methods: {
            ...mapMutations(['selectModel']),
            handleClick() {
                this.selectModel(this.data);
                this.fetchData();
                document.body.scrollTop = document.documentElement.scrollTop = 0;
            }
        }
    }
</script>

<style lang="stylus" type="text/stylus" scoped>
    .recommend {
        display inline-block
        width 40%
        margin: 0.2rem auto 0
        text-align center
        background #ffffff
        border-radius 0.12rem
        img {
            display: inline-block
            width:2.26rem
            height:1.12rem
        }
        p {
            margin-top 0.28rem
            font-size 12px
            color: #000
        }
    }
</style>