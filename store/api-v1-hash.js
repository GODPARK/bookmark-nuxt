export const state = () => ({
})

export const getters = {
}

export const mutations = {
}

export const actions = {
    async mainHash (context) {
        let data = {}
        try {
            await this.$axios.setHeader('auth_token', context.rootGetters['auth/getToken'])
            data = await this.$axios.$get('/api/v1/hash/main')
        } catch (err) {
            data.error = 'get main hash fail'
        }
        return data
    }
}
