export const state = () => ({
})

export const getters = {
}

export const mutations = {
}

export const actions = {
    async bookmarkByHash (context, hashId) {
        let data = {}
        try {
            await this.$axios.setHeader('auth_token', context.rootGetters['auth/getToken'])
            data = await this.$axios.$get(`/api/v1/bookmark/hash?hashId=${hashId}`)
        } catch (err) {
            data.error = 'get bookmark by hash fail'
        }
        return data
    },
    async frequencyBookmark (context, bookmarkId) {
        try {
            await this.$axios.setHeader('auth_token', context.rootGetters['auth/getToken'])
            await this.$axios.$get(`/api/v1/bookmark/freq?bookmarkId=${bookmarkId}`)
        } catch (err) {
            console.log('bookmark freqeucy api is fail')
        }
    }
}
