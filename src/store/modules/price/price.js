const price = {
    namespaced: true,
    state: {min: null, max: null},
    mutations: {
        select(state, {min, max}) {
            state.min = min
            state.max = max
        }
    },
    getters: {},
    actions: {}
};

export default price;