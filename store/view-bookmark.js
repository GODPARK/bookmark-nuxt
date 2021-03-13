export const state = () => ({
    bookmarkList: [],
    selectedBookmark: {}
})

export const getters = {
    getBookmarkList (state) {
        return state.bookmarkList
    },
    getLengthBookmarkList (state) {
        return state.bookmarkList.length
    },
    isEmptyBookmarkList (state) {
        if (state.bookmarkList.length && state.bookmarkList.length > 0) {
            return false
        } else {
            return true
        }
    },
    getSelectedBookmark (state) {
        return state.selectedBookmark
    }
}

export const mutations = {
    setBookmarkList (state, value) {
        state.bookmarkList = value
    },
    pushBookmarkList (state, value) {
        state.bookmarkList.push(value)
    },
    clearBookmarkList (state) {
        state.bookmarkList = []
    },
    setSelectedBookmark (state, value) {
        state.selectedBookmark = value
    }
}

export const actions = {
}
