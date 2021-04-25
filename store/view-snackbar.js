export const state = () => ({
    snackBarTextString: '',
    snackBarResultString: 'primary'
})

export const getters = {
    getSnackBarTextString (state) {
        return state.snackBarTextString
    },
    getSnackBarResultString (state) {
        return state.snackBarResultString
    }
}

export const mutations = {
    setSnackBarTextStringWithSuccess (state, text) {
        state.snackBarTextString = text
        state.snackBarResultString = 'success'
    },
    setSnackBarTextStringWithError (state, text) {
        state.snackBarTextString = text
        state.snackBarResultString = 'error'
    }
}
