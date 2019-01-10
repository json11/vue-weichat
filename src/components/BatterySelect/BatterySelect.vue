<template>
    <div class="battery-select">
        <div v-for="(battery, index) in batterys" class="battery-item">
            <span class="battery"
                  :key="index"
                  :class="curBattery.indexOf(battery.name) > -1 ? 'active' : '' "
                  @click="handleClick(battery)">
                {{battery.name}}
            </span>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'BatterySelect',
        components: {},
        props: {
            selectFun: {
                type: Function,
                require: true
            },
            curBattery: {
                type: Array,
            },
            batterys: {
                type: Array
            }
        },
        data() {
            return {}
        },
        methods: {
            handleClick(battery) {
                this.selectFun && this.selectFun(battery);
            }
        }

    }
</script>

<style lang="stylus" type="text/stylus" scoped>
    .battery-select {
        width: 100%;
        padding: 0.06rem 0.44rem 0.16rem;
        background: #fff;
        overflow-x:hidden;
        word-wrap: break-word;
        word-break: normal;
        .battery-item {
            float: left;
            text-align center
            .battery {
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