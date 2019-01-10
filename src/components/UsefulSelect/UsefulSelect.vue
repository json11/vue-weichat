<template>
    <div class="useful-select">
        <div v-for="(useful, index) in usefuls" class="useful-item">
            <span class="useful"
                  :key="useful.id"
                  :class="curValue.indexOf(useful.id) > -1  ? 'active' : '' "
                  @click="handleClick(useful)">
                {{useful.name}}
            </span>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'useful-select',
        components: {},
        props: {
            selectFun: {
                type: Function,
                require: true
            },
            curValue: {
                type: Array,
            },
            usefuls: {
                type: Array
            }
        },
        data() {
            return {
                // usefuls: [{value: '入门代步', code: '1'},{value: '操作简单', code: '2'},{value: '舒适性好', code: '3'},{value: '安全性高', code: '4'},{value: '大空间', code: '5'},{value: '居家旅行', code: '6'},{value: '动感时尚', code: '7'},{value: '硬派越野', code: '8'},{value: '经济适用', code: '9'},{value: '超长续航', code: '10'},{value: '动力强劲', code: '11'},{value: '商务行政', code: '12'}],
            }
        },
        methods: {
            handleClick(useful) {
                this.selectFun && this.selectFun(useful);
            }
        }

    }
</script>

<style lang="stylus" type="text/stylus" scoped>
    .useful-select {
        width: 100%;
        padding: 0.06rem 0.44rem 0.16rem;
        background: #fff;
        overflow-x:hidden;
        word-wrap: break-word;
        word-break: normal;
        .useful-item {
            float: left;
            text-align center
            .useful {
                display inline-block
                white-space nowrap
                margin: 0.18rem 0.16rem;
                padding: 0.06rem 0.1rem;
                font-size: 10px;
                color: #4a4a4a;
                border-radius:0.16rem;
                &.active {
                    background: rgba(255, 247, 178, 0.8);
                }
            }
        }
    }
</style>