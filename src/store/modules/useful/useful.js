const useful = {
    namespaced: true,
    state: {useful: null},
    mutations: {
        select(state, data) {
            state.useful = data
        }
    },
    getters: {},
    actions: {}
};

export default useful;