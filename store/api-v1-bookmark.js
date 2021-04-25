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
            data = await this.$axios.$get(`/api/v1/bookmark/hash/${hashId}`)
        } catch (err) {
            data.error = 'get bookmark by hash fail'
        }
        return data
    },
    async frequencyBookmark (context, bookmarkId) {
        const data = {}
        try {
            await this.$axios.setHeader('auth_token', context.rootGetters['auth/getToken'])
            await this.$axios.$get(`/api/v1/bookmark/${bookmarkId}/freq`)
        } catch (err) {
            data.error = 'bookmark freqeucy api is fail'
        }
    },
    async deleteBookmark (context, body) {
        let data = {}
        try {
            await this.$axios.setHeader('auth_token', context.rootGetters['auth/getToken'])
            data = await this.$axios.$delete(`/api/v1/bookmark/${body}`)
        } catch (err) {
            data.error = 'delete bookmark is fail'
        }
        return data
    },
    async editBookmark (context, body) {
        let data = {}
        try {
            await this.$axios.setHeader('auth_token', context.rootGetters['auth/getToken'])
            data = await this.$axios.$patch('/api/v1/bookmark', body)
        } catch (err) {
            data.error = 'edit bookmark is fail'
        }
        return data
    },
    async saveBookmark (context, body) {
        let data = {}
        try {
            await this.$axios.setHeader('auth_token', context.rootGetters['auth/getToken'])
            data = await this.$axios.$post('/api/v1/bookmark', body)
        } catch (err) {
            data.error = 'save new bookmark is fail'
        }
        return data
    },
    async unmappedBookmark (context) {
        let data = {}
        try {
            await this.$axios.setHeader('auth_token', context.rootGetters['auth/getToken'])
            data = await this.$axios.$get('/api/v1/bookmark/unmapped')
        } catch (err) {
            data.error = 'save new bookmark is fail'
        }
        return data
    },
    async searchBookmarkByName (context, bookmarkName) {
        let data = {}
        try {
            await this.$axios.setHeader('auth_token', context.rootGetters['auth/getToken'])
            data = await this.$axios.$get(`/api/v1/bookmark/search?bookmark=${bookmarkName}`)
        } catch (err) {
            data.error = 'save new bookmark is fail'
        }
        return data
    }
}
