<template>
    <div class="home">
        <yd-pullrefresh :callback="loadList" ref="pullrefreshDemo">
            <section class="banner">
                <Banner></Banner>
            </section>
            <section class="selector-area">
                <SelectArea></SelectArea>
            </section>
            <section class="list">
                <hot-list></hot-list>
            </section>
        </yd-pullrefresh>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';
    import SelectArea from '../../components/SelectArea/SelectArea.vue';
    import HotList from '../../components/List/HotList.vue';
    import Banner from './Banner.vue';

    export default {
        name: 'Home',
        beforeRouteLeave(to, from , next) {
            window.scrollTo(0,0);
            next();
        },
        data() {
          return {}
        },
        components: {
            HotList,
            SelectArea,
            Banner
        },
        mounted() {
            this.getSearchCondition();
            this.getHotCarList();
        },
        computed: {
            ...mapState(['brands','prices','endurances'])
        },
        methods: {
            ...mapActions(['getSearchCondition', 'getHotCarList']),
            loadList() {
                this.getHotCarList({successFn: ()=> {
                        this.$refs.pullrefreshDemo.$emit('ydui.pullrefresh.finishLoad');
                    }});
            }
        }
    }
</script>

<style lang="stylus" type="text/stylus" scoped>
    .home {

    }
    .banner {
        width: 100%
        img {
            display: block
            width: 100%
        }
    }
    .list {
        padding-bottom 40px
        overflow: auto
    }
</style>