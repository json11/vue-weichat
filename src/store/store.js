import Vuex from 'vuex';

import defaultState from './state/state';

import getters from './getters/getters';

import mutations from './mutations/mutations';

import actions from './actions/actions';

import brand from './modules/brand/brand';
import endurance from './modules/endurance/endurance';
import price from './modules/price/price';
import useful from './modules/useful/useful';

const  isDev = process.env.NODE_ENV === 'development'

export default () => {
    const store= new Vuex.Store({
        strict: isDev, // 这个属性  修改数据源 必须要 用mutations  否则报错  正式环境  不要使用这个属性
        state: defaultState,
        mutations,
        getters,
        actions,
        modules: {
            brand,endurance,price,useful
        }
    });
    
    if (module.hot) {
        module.hot.accept([
            './state/state.js',
            './mutations/mutations.js',
            './getters/getters.js',
            './actions/actions.js'
        ], () => {
            const newState = require('./state/state.js').default
            const newMutations = require('./mutations/mutations.js').default
            const newGetters = require('./getters/getters.js').default
            const newActions = require('./actions/actions.js').default


            /**
             *  只有以下几个模块具有热重载的功能
             */
            store.hotUpdate({
                state: newState,
                mutations: newMutations,
                actions: newActions,
                getters: newGetters
            })
        })
    }


    return store
}