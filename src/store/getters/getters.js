/**
 * 由于后台给的数据并不是直接可以用的  需要处理下
 * 这里统一处理 相当于 computed  周期
 */
export default {
    getCarList: function(state) {
        return state.carList
    },
    getCarDetail: function(state) {
        return state.carList
    },
    rangeEndurance: function(state) {
        let {minEndurance, maxEndurance, limitEndurance} = state;
        let rate = limitEndurance / 100;
        if(minEndurance == maxEndurance && maxEndurance == 0) {
            return '不限';
        } else {
            return `${parseInt(minEndurance * rate)}-${parseInt(maxEndurance * rate)}公里`;
        }
    },
    rangePrice: function(state) {
        let {minPrice, maxPrice, limitPrice} = state;
        let rate = limitPrice / 100;
        if(minPrice==maxPrice && maxPrice == 0) {
            return '不限';
        } else {
            return `${parseInt(minPrice * rate)}-${parseInt(maxPrice * rate)}万`;
        }
    },
    getTabShow: function(state) {
        return state.carList
    },
    getSelectorShow: function(state) {
        return state.carList
    }
}