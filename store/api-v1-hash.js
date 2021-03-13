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
    },
    async hashListByBookmarkId (context, bookmarkId) {
        let data = {}
        try {
            await this.$axios.setHeader('auth_token', context.rootGetters['auth/getToken'])
            data = await this.$axios.$get(`/api/v1/hash/bookmark?bookmarkId=${bookmarkId}`)
        } catch (err) {
            data.error = 'get hash by bookmarkid fail'
        }
        return data
    },
    async hashListByUserId (context) {
        let data = {}
        try {
            await this.$axios.setHeader('auth_token', context.rootGetters['auth/getToken'])
            data = await this.$axios.$get('/api/v1/hash/user')
        } catch (err) {
            data.error = 'get hash by user id fail'
        }
        return data
    },
    async hashEditInBookmark (context, body) {
        const data = {}
        try {
            await this.$axios.setHeader('auth_token', context.rootGetters['auth/getToken'])
            await this.$axios.$patch('/api/v1/hash/map', body)
        } catch (err) {
            data.error = 'edit hash is fail'
        }
        return data
    }
}
