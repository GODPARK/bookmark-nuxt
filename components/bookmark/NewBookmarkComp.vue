<template>
    <div>
      <v-card>
        <v-card-title>
          New Bookmark
        </v-card-title>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="newBookmark.bookmarkName"
                label="Bookmark Name"
                prepend-icon="mdi-book"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="newBookmark.url"
                label="Bookmark Url"
                prepend-icon="mdi-web-box"
              />
            </v-col>
            <v-col cols="12">
              <treeselect
                v-model="treeViewHashKeyList"
                :options="hashKeyOptionList"
                :multiple="true"
                @open="totalHashListFunc"
                @select="selectHashInTreeFunc"
                @deselect="deselectHashInTreeFunc"
              />
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="newBookmark.bookmarkInfo"
                label="Bookmark Info"
                outlined
                prepend-inner-icon="mdi-information"
              />
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="saveNewBookmarkFunc()">
            <v-icon> mdi-content-save </v-icon>
            save
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
</template>
<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  name: 'NewBookmarkComp',
  components: {
    Treeselect
  },
  props: [],
  data () {
    return {
      newBookmark: {
        bookmarkName: '',
        bookmarkInfo: '',
        url: '',
        isMain: 0
      },
      treeViewHashKeyList: [],
      allocateHashKeyList: [],
      saveHashKeyList: [],
      hashKeyOptionList: []
    }
  },
  computed: {},
  mounted () {
  },
  methods: {
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
    async totalHashListFunc () {
      const totalHashList = await this.$store.dispatch('api-v1-hash/hashListByUserId')
      if (totalHashList !== undefined && totalHashList.length !== 0) {
          this.hashKeyOptionList = await this.makeTreeSelectFormatFunc(totalHashList)
      } else {
          this.hashKeyOptionList = []
      }
    },
    selectHashInTreeFunc (node) {
      const lowerCaseName = node.hashName.toLowerCase()
      this.allocateHashKeyList.push({
          hashName: lowerCaseName,
          hashId: node.hashId
      })
    },
    deselectHashInTreeFunc (node) {
      const idx = this.allocateHashKeyList.findIndex((element) => { return element.hashId === node.hashId })
      if (idx !== -1) {
          this.allocateHashKeyList.splice(idx, 1)
      }
    },
    async saveNewBookmarkFunc () {
      const body = {
        bookmark: this.newBookmark,
        hashKeyList: this.allocateHashKeyList
      }
      await this.$store.dispatch('api-v1-bookmark/saveBookmark', body)
      this.clearTextFormatFunc()
    },
    clearTextFormatFunc () {
      this.newBookmark.bookmarkName = ''
      this.newBookmark.bookmarkInfo = ''
      this.newBookmark.url = ''
      this.newBookmark.isMain = 0
      this.allocateHashKeyList = []
      this.treeViewHashKeyList = []
    }
  }
}
</script>
