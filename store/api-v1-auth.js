export const state = () => ({
})

export const actions = {
    async signIn (context, body) {
        let data = {}
        try {
            data = await this.$axios.$post('/api/v1/auth/sign-in', body)
        } catch (err) {
            alert(err)
        }
        return data
    },

    async signUp (context, body) {
        let data = {}
        try {
            data = await this.$axios.$post('/api/v1/auth/sign-up', body)
        } catch (err) {
            data.error = 'sign up fail'
        }
        return data
    },

    async logout (context) {
        let data = {}
        try {
            this.$axios.setHeader('auth_token', context.rootState.auth.tokenStr)
            data = await this.$axios.$post('/api/v1/auth/logout')
        } catch (err) {
            console.log(err)
        }
        return data
    }
}
