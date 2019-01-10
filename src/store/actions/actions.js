import {post,get} from '../../assets/js/http';

const handleError = (err) => {
    console.log('handle error',err);
    $dialog.toast({
        mes: err.msg || '请求失败',
        timeout: 1500
    });
}

export default {
    getSearchCondition({commit}, params) {
        post('/wechat/search/condition').then((data) => {
            commit('getBrands', data.data.brandInfo);
            commit('getUsefuls', data.data.labelInfo);
            commit('getBatterys', data.data.batteryInfo);
        }).catch((err) => {
            handleError(err)
        })
    },
    getBannerList({commit}, params) {
        post('/wechat/banner/list').then((data) => {
            commit('getBannerList', data.data);
        }).catch((err) => {
            handleError(err)
        })
    },
    getHotCarList({commit}, params) {
        post('/wechat/model/hotsale').then((data) => {
            commit('getHotCarList', data.data);
            let successFn = params && params.successFn;
            typeof successFn === 'function' && successFn(data.data);
        }).catch((err) => {
            handleError(err)
        })
    },
    getCarList({commit,state}) {
        let ratePrice = state.limitPrice / 100;
        let rateEndurance = state.limitEndurance / 100;

        post('/wechat/model/list',{
            brandName: state.curBrand,
            labelId: state.curUseful,
            battery: state.curBattery,
            mileage: {
                minMileage: parseInt(state.minEndurance * rateEndurance),
                maxMileage: !!state.maxEndurance ? parseInt(state.maxEndurance * rateEndurance) : state.limitEndurance
            },
            price: {
                minPrice: parseInt(state.minPrice * ratePrice),
                maxPrice: !!state.maxPrice ? parseInt(state.maxPrice * ratePrice) : state.limitPrice
            }
        }).then((data) => {
            commit('getCarList', data.data);
        }).catch((err) => {
            handleError(err)
        })
    },
    getCarDetail({commit}, params) {
        post('/wechat/model/detail',params).then((data) => {
            commit('getCarDetail', data.data);
        }).catch((err) => {
            handleError(err)
        })
    },
    getBookList({commit}, {params, successFn}) {
        return post('/wechat/reservation/list',params).then((data) => {
            commit('getBookList', data.data);
            typeof successFn === 'function' && successFn(data.data);
        }).catch((err) => {
            handleError(err)
        })
    },
    submitBook({commit},{params,successFn}) {
        return post('/wechat/customer/add',params).then((data) => {
            $dialog.toast({
                mes: '预约成功', timeout: 1500, icon: 'success'
            });
            typeof successFn === 'function' && successFn(data.data);
        }).catch((err) => {
            handleError(err)
        })
    }
}