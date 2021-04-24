<template>
    <div>
      <v-toolbar v-if="isEmptySeletedHashComp">
          <v-toolbar-title class="selected-hash-title">
            <h3> {{ selectedHashComp.hashName }} </h3>
          </v-toolbar-title>
          <v-spacer />
          <v-btn
            v-if="controlMain"
            small
            text
            :color="selectedHashColorComp"
            @click="editHashMainFunc()"
          >
            <v-icon>mdi-star</v-icon>
          </v-btn>
          <v-btn
            v-if="controlDelete"
            small
            text
            @click="deleteHashFunc()"
          >
            <v-icon>mdi-trash-can</v-icon>
          </v-btn>
      </v-toolbar>
    </div>
</template>
<script>
export default {
  name: 'HashInfo',
  components: {
  },
  props: {
      controlMain: {
          type: Boolean,
          default: false
      },
      controlDelete: {
          type: Boolean,
          default: false
      }
  },
  data () {
    return {
    }
  },
  computed: {
    selectedHashComp () {
      return this.$store.getters['view-hash/getSelectedHash']
    },
    isEmptySeletedHashComp () {
      return this.$store.getters['view-hash/isEmptySelectedHash']
    },
    selectedHashColorComp () {
      if (this.$store.getters['view-hash/getSelectedHash'].hashMain === 1) {
          return 'amber'
      } else {
          return 'indigo'
      }
    }
  },
  mounted () {
  },
  methods: {
    async editHashMainFunc () {
      const body = {
        hashId: this.selectedHashComp.hashId,
        hashName: this.selectedHashComp.hashName,
        hashMain: 0
      }
      if (this.selectedHashComp.hashMain === 1) {
        body.hashMain = 0
      } else if (this.selectedHashComp.hashMain === 0) {
        body.hashMain = 1
      }
      const result = await this.$store.dispatch('api-v1-hash/editHash', body)
      const hashList = await this.$store.dispatch('api-v1-hash/mainHash')
      this.$store.commit('view-hash/setHashList', hashList)
      this.$store.commit('view-hash/setSelectedHash', result)
    },
    async deleteHashFunc () {
      if (confirm(`${this.selectedHashComp.hashName} 를 삭제하시겠습니까?`)) {
        await this.$store.dispatch('api-v1-hash/deleteHash', this.selectedHashComp.hashId)
        this.$store.commit('view-hash/clearSelectedHash')
        const hashList = await this.$store.dispatch('api-v1-hash/mainHash')
        this.$store.commit('view-hash/setHashList', hashList)
        this.$store.commit('view-bookmark/clearBookmarkList')
      }
    }
  }
}
</script>
<style scoped>
.selected-hash-title {
    margin-left: 20px;
    margin-right: 10px;
}
</style>
