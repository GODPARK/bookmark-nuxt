export const state = () => ({
    hashList: [],
    selectedHash: {}
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
    },
    getSelectedHash (state) {
        return state.selectedHash
    },
    isEmptySelectedHash (state) {
        if (state.selectedHash === {} || state.selectedHash.hashId === undefined) {
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
    },
    setSelectedHash (state, value) {
        state.selectedHash = value
    },
    clearSelectedHash (state) {
        state.selectedHash = {}
    }
}

export const actions = {
}
