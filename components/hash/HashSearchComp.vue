<template>
    <div>
      <v-card>
          <v-card-title>
              Search
          </v-card-title>
          <v-row>
              <v-col>
                <treeselect
                    v-model="treeViewHashKeyObject"
                    class="mr-2 ml-2 mb-2"
                    :options="hashKeyOptionList"
                    :multiple="false"
                    @open="totalHashListFunc"
                    @select="selectHashInTreeFunc"
                />
              </v-col>
          </v-row>
          <v-card-actions>
            <v-spacer />
            <v-btn text small @click="findUnmappedBookmark()">
            미분류
            </v-btn>
        </v-card-actions>
      </v-card>
    </div>
</template>
<script>
// https://vue-treeselect.js.org/
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  name: 'HashSearchComp',
  components: {
    Treeselect
  },
  props: [],
  data () {
    return {
        treeViewHashKeyObject: null,
        hashKeyOptionList: []
    }
  },
  computed: {},
  mounted () {
  },
  methods: {
    async totalHashListFunc () {
      const totalHashList = await this.$store.dispatch('api-v1-hash/hashListByUserId')
      if (totalHashList !== undefined && totalHashList.length !== 0) {
          this.hashKeyOptionList = await this.makeTreeSelectFormatFunc(totalHashList)
      } else {
          this.hashKeyOptionList = []
      }
    },
    async selectHashInTreeFunc (node) {
    //   const lowerCaseName = node.hashName.toLowerCase()
        console.log(node)
        const data = await this.$store.dispatch('api-v1-bookmark/bookmarkByHash', node.hashId)
        this.$store.commit('view-bookmark/setBookmarkList', data)
        this.$store.commit('view-hash/setSelectedHash', node)
    },
    makeTreeSelectFormatFunc (hashList) {
      const tempHashList = []
      hashList.forEach((element) => {
          const hashKey = element
          hashKey.id = element.hashId
          hashKey.label = element.hashName
          hashKey.children = []
          tempHashList.push(hashKey)
      })
      return tempHashList
    },
    async findUnmappedBookmark () {
      this.$store.commit('view-hash/clearSelectedHash')
      const data = await this.$store.dispatch('api-v1-bookmark/unmappedBookmark')
      console.log(data)
      this.$store.commit('view-bookmark/setBookmarkList', data)
    }
  }
}
</script>
