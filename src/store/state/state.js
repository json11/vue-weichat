export default {
    bannerList: [],
    hotCarList: [] , // 热销爆品车型列表
    carList: [] , // 车型列表
    carDetail: {}, // 车型详情
    brands: [],
    prices: [{value: '1-5万', code: '1-5'},{value: '5-10万', code: '5-10'},{value: '10-15万', code: '10-15'},{value: '15-20万', code: '15-20'},{value: '20以上万', code: '20-80'}],
    endurances: [{value: '100-200', code: '100-200'},{value: '200-300', code: '200-300'},{value: '300-400', code: '300-400'},{value: '400以上', code: '400-500'}],
    usefuls: [],
    batterys: [], // 电池

    currentTap:null, // 当前选中tab

    curBrand: [],
    curPrice:null,
    curBattery: [],
    curUseful: [],
    minEndurance: 0,
    maxEndurance: 0,
    minPrice: 0,
    maxPrice: 0,

    limitPrice: 80,
    limitEndurance: 500,

    tabShow: false,
    selectorShow: false,

    curModel: null, // 当前选择车型
    bookStore: null, // 预约门店
    bookList: [], // 我的预约
}