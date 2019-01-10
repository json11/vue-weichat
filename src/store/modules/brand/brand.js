const brand = {
    namespaced: true,
    state: {brand: null},
    mutations: {
        select(state, data) {
            state.brand = data
        }
    },
    getters: {},
    actions: {}
};

export default brand;