<template>
    <div class="carModel">
        <iframe :src="src" frameborder="0"></iframe>
    </div>
</template>

<script>
    import {baseUrl} from '../../assets/js/env';
    export default {
        name: 'CarModel',
        beforeRouteEnter(to, from , next) {
            next(vm => {document.title= '车型参数';})
        },
        data() {
            return {
                src1:'https://www.baidu.com?modelId=1231231'
            }
        },
        computed: {
            src: function () {
                let modelCode = this.$route.query.model.modelCode;
                return `https://www.baidu.com?type=parameterConfiguration&requestUrl=${baseUrl}&modelCode=${modelCode}`
            }
        },
        mounted() {}
    }
</script>

<style lang="stylus" type="text/stylus" scoped>
    .carModel {
        width 100%
        height 100%
        iframe {
            width 100%
            height 100%
        }
    }
</style>