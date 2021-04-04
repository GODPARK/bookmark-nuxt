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
    deleteBookmarkInList (state, value) {
        const idx = state.bookmarkList.findIndex((element) => {
            return element.bookmarkId === value.bookmarkId
        })
        if (idx !== -1) {
            state.bookmarkList.splice(idx, 1)
        }
    },
    setSelectedBookmark (state, value) {
        state.selectedBookmark = value
    }
}

export const actions = {
}
