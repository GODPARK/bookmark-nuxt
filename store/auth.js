import Cookie from 'js-cookie'

export const state = () => ({
    tokenStr: '',
    accountStr: ''
})

export const getters = {
    getToken (state) {
        if (state.tokenStr === '') {
            // const value = document.cookie.match('(^|;) ?auth_token=([^;]*)(;|$)')
            return Cookie.get('auth_token')
          }
          return state.tokenStr
    },
    getAccount (state) {
        if (state.accountStr === '') {
          // const value = document.cookie.match('(^|;) ?bookmark_account=([^;]*)(;|$)')
          return Cookie.get('bookmark_account')
        }
        return state.accountStr
      }
}

export const mutations = {
    setToken (state, authData) {
        state.tokenStr = authData.token
        const expireDate = new Date()
        expireDate.setDate(expireDate.getDate() + 1)
        const cookieExpire = `expires=${expireDate.toUTCString()}`
        document.cookie = `auth_token=${authData.token};${cookieExpire}`
      },

    setAccount (state, authData) {
        state.accountStr = authData.account
        const expireDate = new Date()
        expireDate.setDate(expireDate.getDate() + 1)
        const cookieExpire = `expires=${expireDate.toUTCString()}`
        document.cookie = `bookmark_account=${authData.account};${cookieExpire}`
    }
}
