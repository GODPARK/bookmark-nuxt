export const state = () => ({
    hashList: []
})

export const getters = {
    getHashList (state) {
        return state.hashList
    },
    getLengthHashList (state) {
        return state.hashList.length
    },
    isEmptyHashList (state) {
        if (state.hashList.length && state.hashList.length > 0) {
            return false
        } else {
            return true
        }
    }
}

export const mutations = {
    setHashList (state, value) {
        state.hashList = value
    },
    pushHashList (state, value) {
        state.hashList.push(value)
    },
    clearHashList (state) {
        state.hashList = []
    }
}

export const actions = {
}
