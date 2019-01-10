<template>
    <div class="search">
        <input id="telephone" type="text" maxlength="11" v-model.trim="telphone" placeholder="输入手机号查询结果" @keyup.13="query">
        <div class="btn" @click="query">查询</div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';
    export default {
        name: 'Search',
        beforeRouteEnter(to, from , next) {
            next(vm => {document.title= '门店预约查询';})
        },
        data() {
            return {
                telphone: ''
            }
        },
        computed: {

        },
        mounted() {
        },
        components: {
        },
        methods: {
            ...mapActions(['getBookList']),
            query() {
                if(!this.telphone) {
                    $dialog.notify({mes:'请输入手机号码', timeout: 1000});
                    return
                }
                if(!/^1[0-9]{10}$/.test(this.telphone)) {
                    $dialog.notify({mes:'手机号码格式有误', timeout: 1000});
                    return
                }
                this.getBookList({
                    params: {telphone: this.telphone},
                    successFn:(data)=> {this.$router.push('/myBook')}
                })
            }
        }
    }
</script>

<style lang="stylus" type="text/stylus" scoped>
    .search {
        padding: 0.6rem 0.5rem;
        #telephone {
            display: block;
            margin-top: 0.24rem;
            background: #ffffff;
            border: 1px solid #dedede;
            border-radius: 4px;
            width: 100%;
            height: 0.96rem;
            padding-left: 0.3rem;
            font-size: 14px;
            color: #4a4a4a;
            outline: none;
        }
        .btn {
            background: #FFE540;
            background-image: linear-gradient(-132deg, #ffdc2a 0%, #fff466 100%);
            box-shadow: 0 -2px 12px 0 rgba(255, 230, 0, 0.44);
            border-radius: 4px;
            border-radius: 5px;
            width: 100%;
            height: 44px;
            margin-top: 0.6rem;
            text-align: center;
            line-height: 44px;
            border: none;
            color: #333;
            font-size: 18px;
            outline: none;
        }
    }

</style>