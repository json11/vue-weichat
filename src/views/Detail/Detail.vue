<template>
    <div class="detail" :class="[getClientType ? 'android' : '']">
        <div class="baseInfo">
            <div class="banner">
                <Banner :picList="carDetail.picList"></Banner>
            </div>
            <div class="model">
                <div class="modelIcon" @click="goToCarModel">
                    <img :src="IconConfig" alt="iconConfig">
                    <p>车型参数</p>
                </div>
                <div class="modelName">
                    {{carDetail.smModel}}
                </div>
            </div>
            <div class="guidancePrice">
                零售参考  {{`￥${carDetail.minRetailPrice || ''} - ${carDetail.maxRetailPrice || ''}`}}
            </div>
            <div class="config">
                <div class="left">
                    <div class="up">
                        <img :src="IconKC" alt="icon_kc">
                        <div class="line"></div>
                    </div>
                    <p>快充<span>&nbsp;{{carDetail.chargingTime || '-'}}&nbsp;</span>min</p>
                </div>
                <div class="center">
                    <div class="up">
                        <img :src="IconXH" alt="icon_ms">
                        <div class="line"></div>
                    </div>
                    <p>续航<span>&nbsp;{{carDetail.maxMileage || '-'}}&nbsp;</span>km</p>
                </div>
                <div class="right">
                    <div class="up">
                        <img :src="IconMS" alt="icon-ms">
                        <div class="line"></div>
                    </div>
                    <p>最高车速<span>&nbsp;{{carDetail.maxSpeed || '-'}}&nbsp;</span>km/h</p>
                </div>
            </div>
        </div>

        <div class="nearbyMechat">
            <div class="headline">
                <div class="leftIcon"></div>
                附近商家
            </div>
            <StoreList :showModal="showModal" :storeInfo="carDetail.storeInfo"></StoreList>
        </div>

        <div class="aboutRecomm">
            <div class="headline">
                <div class="leftIcon"></div>
                相关推荐
            </div>
            <RecommendList :recommendInfo="carDetail.recommendInfo" :fetchData="fetchData"></RecommendList>
        </div>

        <div class="modal">
            <Modal :submit="submit" :modalShow="modalShow" :hideModal="hideModal"></Modal>
        </div>

    </div>
</template>

<script>
    import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';
    import IconConfig from './assets/iconConfig.png';
    import IconKC from './assets/icon_kc.png';
    import IconMS from './assets/icon_ms.png';
    import IconXH from './assets/icon_xh.png';

    import Banner from './Banner.vue';
    import StoreList from './StoreList.vue';
    import RecommendList from './RecommendList.vue';
    import Modal from './Modal.vue';
    export default {
        name: 'detail',
        beforeRouteLeave(to, from , next) {
            if(to.path === '/listView') {
                to.meta.keepAlive = true;
            } else {
                to.meta.keepAlive = false;
            }
            next();
        },
        data() {
            return {
                IconConfig,IconKC,IconMS,IconXH,
                modalShow: false
            }
        },
        created() {
            document.title = this.curModel && this.curModel.smModel || '车辆详情';
        },
        computed: {
            ...mapState(['carDetail','curModel','bookStore']),
            getClientType() {
                var u = navigator.userAgent;
                var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
                if(isAndroid) return true
                return false
            }
        },
        mounted(){
            if(!this.curModel) {
                window.history.back();
                return;
            }
            this.fetchData();
            window.scrollTo(0,0);
        },
        components: {
            Banner,
            StoreList,
            RecommendList,
            Modal
        },
        methods: {
            ...mapActions(['getCarDetail','submitBook']),
            fetchData() {
                if(process.env.NODE_ENV === 'production') {
                    wx.getLocation({
                        type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                        success: (response) => {
                            console.log('response--', response);
                            let params = {
                                modelId: this.curModel.modelId,
                                latitude: response.latitude, // 纬度，浮点数，范围为90 ~ -90
                                longitude: response.longitude // 经度，浮点数，范围为180 ~ -180。
                            };
                            this.getCarDetail(params);
                        },
                        fail: (res) => {
                            $dialog.toast({
                                mes: '未获取到你的定位，请授权获取定位！',
                                timeout: 2000
                            });
                        }
                    });
                } else {
                    let params = {
                        modelId: this.curModel.modelId || '',
                        latitude:'31.224676',
                        longitude:'121.34748'
                    };
                    this.getCarDetail(params);
                }
            },
            showModal() {
                this.modalShow= true;
            },
            hideModal() {
              this.modalShow= false;
            },
            submit({params,successFn}) {
                console.log(name, telephone);
                this.hideModal();
                Object.assign(params, {storeName: this.bookStore.storeName,storeId: this.bookStore.storeId,storeTelphone:this.bookStore.telphone, modelId: this.curModel.modelId,});
                this.submitBook({params,successFn});
            },
            goToCarModel() {
                this.$router.push({path: '/carModel',query: {model:this.curModel}});
            }
        }
    }
</script>

<style lang="stylus" type="text/stylus" scoped>
    .detail {
        background #f6f6f6
    }
    .android { // 为了兼容安卓键盘
        height 100%
        overflow auto
        overflow-scrolling touch
    }
    .baseInfo {
        background #fff
    }
    .banner {
        position: relative
        height: 3.52rem
        border-bottom 1px solid #f6f6f6
        overflow: hidden

    }
    .model {
        height: 1rem
        padding-left 0.4rem
        border-bottom 1px solid #f6f6f6
        .modelIcon {
            display flex
            flex-direction column
            float: right
            height: 1rem
            align-items center
            justify-content center
            padding-right 0.36rem
            font-size 8px
            color: #4a4a4a
            img  {
                display: block
                width: 0.3rem
            }
        }
        .modelName {
            overflow: hidden
            height: 1rem
            line-height 1rem
            font-size 20px
            color: #000
            font-weight 500
        }
    }
    .guidancePrice {
        height: 0.66rem
        line-height 0.66rem
        padding: 0 0.46rem
        font-size 12px
        color: #4a4a4a
        border-bottom 1px solid #f6f6f6
    }
    .config {
        display: flex
        flex: 3
        height:1.56rem
        justify-content center
        align-items:center
        border-bottom 1px solid #f6f6f6
        &>div {
            flex:1
            .up {
                position: relative
                text-align center
                .line {
                    position: absolute
                    top: 10px
                    right:0
                    width:1px
                    height: 14px
                    background:rgba(155,155,155,0.30);
                }
                img {
                    display: inline-block
                    margin: 0 auto
                }
            }
            p {
                text-align center
                font-size 8px
                color: #000
                span {
                    font-size 20px
                    font-weight 500
                    vertical-align sub
                }
            }
        }
        .left,.center {
            img {
                width: 0.5rem
            }
        }
        .right {
            img {
                width:0.54rem
            }
        }
    }

    .headline {
        position: relative
        display: flex
        align-items center
        height: 36px
        line-height 36px
        background #ffffff
        font-size 14px
        color: #000
        font-weight 500
        .leftIcon {
            display: inline-block
            width: 3px
            height: 22px
            background #ffe600
            border-radius 21px
            margin-right 7px
        }
    }
    .nearbyMechat {
        background #f6f6f6
    }
    .aboutRecomm {
        width: 100%
        padding-bottom 0.4rem
        background #fff
        overflow hidden
    }
</style>