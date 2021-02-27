export const state = () => ({
  darkModeBool: false
})

export const getters = {
  getDarkMode (state) {
    return state.darkModeBool
  }
}

export const mutations = {
  changeDarkMode (state) {
    state.darkModeBool = !state.darkModeBool
  }
}
