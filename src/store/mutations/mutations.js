
export default {
    showTab(state) {
        state.tabShow= true;
    },
    hideTab(state) {
        state.tabShow= false;
    },
    toggleTab(state,type) {
        state.tabShow = !state.tabShow;
        state.currentTap = type;
    },
    toShowSelector(state) {
        state.selectorShow= true;
    },
    toHideSelector(state) {
        state.selectorShow= false;
    },
    toggleSelector(state,type) {
        state.selectorShow = !state.selectorShow;
        state.currentTap = type;
    },
    getBannerList(state, data) {
        state.bannerList= data;
    },
    getBrands(state, data) {
        state.brands= data;
    },
    getUsefuls(state, data) {
        state.usefuls= data;
    },
    getBatterys(state, data) {
        state.batterys= data;
    },
    getHotCarList(state, data) {
        state.hotCarList= data;
    },
    getCarList(state, data) {
        state.carList= data;
    },
    getCarDetail(state, data) {
        state.carDetail= data;
    },

    selectBrand(state, data) {
        if(state.curBrand.indexOf(data.brandName)<0) {
            state.curBrand.push(data.brandName);
        }
    },
    selectUseful(state, data) {
        if(state.curUseful.indexOf(data.id)<0) {
            state.curUseful.push(data.id);
        }
    },
    selectBattery(state, data) {
        if(state.curBattery.indexOf(data.name)<0) {
            state.curBattery.push(data.name);
        }
    },
    selectPrice(state, {min,max,total}) {
        state.minPrice = min;
        state.maxPrice = max;
    },
    selectEndurance(state, {min,max,total}) {
        state.minEndurance = min;
        state.maxEndurance = max;
    },
    resetBrand(state) {
        state.curBrand= [];
    },
    resetPrice(state) {
        state.minPrice= 0;
        state.maxPrice= 0;
    },
    resetEndurance(state) {
        state.minEndurance= 0;
        state.maxEndurance= 0;
    },
    resetBattery(state) {
        state.curBattery= [];
    },
    resetUseful(state) {
        state.curUseful= [];
    },
    delBrand(state,data) {
        let index = state.curBrand.indexOf(data);
        state.curBrand.splice(index,1);
    },
    delBattery(state,data) {
        let index = state.curBattery.indexOf(data);
        state.curBattery.splice(index,1);
    },
    delUseful(state,data) {
        let index = state.curUseful.indexOf(data);
        state.curUseful.splice(index,1);
    },
    reset(state,type) {
        if(type === 'brand') {
            state.curBrand= '';
        } else if(type === 'price') {
            state.minPrice= 0;
            state.maxPrice= 0;
        } else if(type === 'endurance') {
            state.minEndurance= 0;
            state.maxEndurance= 0;
        } else {
            state.curBrand= '';
            state.curUseful= '';
            state.minEndurance= 0;
            state.maxEndurance= 0;
            state.minPrice= 0;
            state.maxPrice= 0;
        }
    },
    getBookList(state, data) {
        state.bookList= data;
    },
    selectModel(state, data) {
        state.curModel = data;
    },
    selectStore(state, data) {
        state.bookStore = data;
    }
}