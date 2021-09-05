export const state = () => ({
})

export const actions = {
    async wakeUpApi (context) {
        let data = {}
        try {
            data = await this.$axios.$get('/api/v1/statistics/wake-up')
        } catch (err) {
            data.error = 'get wake up fail'
        }
        return data
    }
}
