<template>
    <div  class="modal" v-show="modalShow">
        <div class="mask" @click.prevent="hideModal"></div>
        <div class="wrapper" id="modal">
            <div class="content">
                <div class="item">
                    <input id="name" @blur="handleBlur" v-model.prevent="name"  type="text" placeholder="请输入您的姓名">
                    <div class="del" v-show="name" @click="delName">
                        <img src="./assets/del.png" alt="del">
                    </div>
                </div>
                <div class="item">
                    <input id="telephone" @blur="handleBlur" @keyup.13="submitModal" maxlength="11" v-model.trim="telphone" type="text" placeholder="请输入您的手机号">
                    <div class="del" v-show="telphone" @click="delTelephone">
                        <img src="./assets/del.png" alt="del">
                    </div>
                </div>
            </div>
            <i class="del-modal" @click="hideModal">×</i>
            <button class="submit" @click.prevent="submitModal">提 交</button>
        </div>
    </div>

</template>

<script>
    export default {
        name: 'modal',
        props: {
          modalShow: {
              type: Boolean,
              default: false
          },
            hideModal: {
              type: Function,
                require: true
            },
            submit: {
              type: Function,
                require: true
            }
        },
        data() {
            return {
                show: false,
                name: '',
                telphone: ''
            }
        },
        watch: {
            modalShow(newName, oldName) {
                window.scrollTo(0,0);
               if(!!newName) {
                   this.$parent.$el.style.overflow='hidden';
                   this.$parent.$el.style.height='100%';
               } else {
                   this.$parent.$el.style.overflow='auto';
                   this.$parent.$el.style.height='auto';
               }
            }
        },
        computed: {
            getClientType() {
                var u = navigator.userAgent;
                var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
                if(isAndroid) return true
                return false
            }
        },
        mounted() {
            /// 处理安卓键盘
            if(this.getClientType) {
                var h = document.body.scrollHeight;
                window.onresize = function(){
                    if (document.body.scrollHeight < h) {
                        document.getElementById('modal').style.top = '-1.84rem'
                    }else{console.log(22)
                        document.getElementById('modal').style.top = '1.84rem';
                    }
                };
            }
        },
        methods: {
            handleBlur() {
                window.scrollTo(0,0);
            },
            delName() {
                this.name='';
            },
            delTelephone() {
                this.telphone = '';
            },
            submitModal() {
                if(!this.name) {
                    $dialog.notify({mes:'请输入姓名',timeout: 1000});
                    return
                }
                if(!this.telphone) {
                    $dialog.notify({mes:'请输入手机号码', timeout: 1000});
                    return
                }
                this.submit({
                    params: {
                        name:this.name, telphone:this.telphone
                    },
                    successFn: () => {
                        this.name = '';
                        this.telphone = '';
                    }
                })
            }
        }
    }
</script>

<style lang="stylus" type="text/stylus" scoped>
    .modal {
        position: relative
        width 100%
        height 100%
    }
    .mask {
        position: fixed
        top:0
        left: 0;
        bottom 0
        right 0
        background rgba(0,0,0,0.7);
        z-index 9
    }
    .wrapper {
        position: fixed
        top 1.84rem
        left 0
        width 97%
        height: 10.14rem
        background url(./assets/bg-modal.png) no-repeat
        background-size 100% auto
        z-index 10
        .content {
            width 100%
            min-height 10.14rem
            padding-top 3.6rem
            overflow: hidden
            z-index 9999
            .item {
                display flex
                width 5.74rem
                height 0.88rem
                line-height 0.88rem
                margin 0 auto
                padding-left 0.34rem
                background #fff
                border-radius 0.44rem
                &:last-child {
                    margin-top 0.6rem
                }
                input {
                    flex 1
                    border:none
                }
                .del {
                    height 0.88rem
                    padding 0 0.38rem 0.22rem
                    font-size 0
                    img {
                        display: inline-block
                        width:0.24rem
                        margin-top 0.32rem
                    }
                }

            }

        }
        .submit {
            display: block
            background-image:linear-gradient(-143deg, #ffaf20 0%, #f2e7a0 100%);
            box-shadow:0 2px 8px 0 rgba(245,166,35,0.55);
            border-radius:2rem;
            width:90%;
            height:1.08rem;
            line-height 1.08rem
            margin-top 0.26rem
            text-align center
            font-size 20px
            font-weight 500
            color: #000
            border:none
            outline none
            font-weight 500
            position: absolute
            left:0.38rem
            bottom 1.8rem
        }
        .del-modal {
            position: absolute;
            top: 1.5rem;
            right: 0.22rem;
            padding: 0.26rem 0.22rem;
            font-size: 26px;
            color: #fff;
            img {
                display: inline-block
                width:0.24rem
                margin-top 0.32rem
            }
        }
    }
</style>