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
                :error="!validationBookmarkNameComp"
                :success="validationBookmarkNameComp"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="newBookmark.url"
                label="Bookmark Url"
                prepend-icon="mdi-web-box"
                :error="!validationBookmarkUrlComp"
                :success="validationBookmarkUrlComp"
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
  computed: {
    validationBookmarkNameComp () {
      if (this.newBookmark.bookmarkName !== undefined && this.newBookmark.bookmarkName !== '') {
        return true
      }
      return false
    },
    validationBookmarkUrlComp () {
      if (this.newBookmark.url !== undefined && this.newBookmark.url !== '') {
        if (this.newBookmark.url.includes('https://') || this.newBookmark.url.includes('http://')) {
          return true
        }
      }
      return false
    }
  },
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
      if (this.validationBookmarkNameComp && this.validationBookmarkUrlComp) {
        const body = {
          bookmark: this.newBookmark,
          hashKeyList: this.allocateHashKeyList
        }
        const result = await this.$store.dispatch('api-v1-bookmark/saveBookmark', body)
        if (result.error === undefined) {
          this.$store.commit('view-snackbar/setSnackBarTextStringWithSuccess', `${this.newBookmark.bookmarkName} SAVE!`)
          this.clearTextFormatFunc()
        } else {
          this.$store.commit('view-snackbar/setSnackBarTextStringWithError', result.error)
        }
      }
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
