<template>
    <div class="headline">
        <div class="leftIcon"></div>
        <div class="title">{{title}}</div>
    </div>
</template>

<script>
    export default {
        name: 'headline',
        props: {
            title: String,
            require: true
        }
    }
</script>

<style lang="stylus" type="text/stylus" scoped>
    .headline{
        width: 100%;
        height 0.44rem
        line-height 0.44rem
        font-size 10px
        color: #4a4a4a
        background #fff
        .leftIcon {
            float left
            width 3px
            height 100%
            background #ffe600;
        }
        .title {
            padding-left 15px
        }
    }

</style>