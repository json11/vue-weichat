<template>
    <button :disabled="disabled" class="btn" :class="[actionType, type]" :style="mStyle">
        <span><slot></slot></span>
    </button>
</template>

<script>
    export default {
        name: 'm-button',
        props: {
            disabled: {
                type:Boolean,
                default: false
            },
            actionType: {
                type: String,
                default: 'confirm'
            },
            mStyle: {
                type: String,
            },
            type: {
                type: String,
                default: 'small'
            }
        }
    }
</script>

<style lang="stylus" type="text/stylus" scoped>
    .btn {
        display inline-block
        width 50%
        height 100%
        line-height 100%
        text-align center
        font-size 12px
        outline none
        border none
        &.reset {
            background #ffffff
            -webkit-box-shadow: 0px -2px 10px 0px #f2f2f2
            -moz-box-shadow: 0px -2px 10px 0px #f2f2f2
            box-shadow: 0px -2px 10px 0px #f2f2f2
            color: #9b9b9b
        }
        &.confirm {
            background:#ffe540;
            background-image:linear-gradient(-132deg, rgb(255, 215, 29) 0%, rgb(255, 244, 102) 100%);
            box-shadow:0 -2px 10px 0 rgba(255, 215, 29,0.44);
            color: #000
        }
        &.big {
            font-size 16px
        }

    }
</style>