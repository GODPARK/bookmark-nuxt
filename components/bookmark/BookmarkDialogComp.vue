<template>
    <div>
      <v-dialog
        v-model="bookmarkDialogBool"
        width="600"
      >
        <v-card
            max-height="700"
        >
            <v-card-title>
                EDIT
                <v-spacer />
                <v-btn text @click="closeBookmarkDialogFunc()">
                    <v-icon>
                        mdi-close
                    </v-icon>
                </v-btn>
            </v-card-title>
            <v-divider />
            <v-card-text>
                <treeselect
                    v-model="allocatedHashKeyList"
                    class="edit-hash-tree"
                    :multiple="true"
                    :maxHeight="350"
                    :options="hashListOptionList"
                    @select="selectHashInTreeFunc"
                    @deselect="deselectHashInTreeFunc"
                    @open="totalHashListFunc"
                />
                <v-text-field
                    v-model="editBookmark.bookmarkName"
                    label="Bookmark Name"
                    class="edit-text-field"
                />
                <v-text-field
                    v-model="editBookmark.url"
                    label="Bookmark Url"
                    class="edit-text-field"
                />
                <v-textarea
                    v-model="editBookmark.bookmarkInfo"
                    class="edit-text-field"
                    label="Bookmark Info"
                    outlined
                    prepend-inner-icon="mdi-info-circle"
                />
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn @click="saveEditBookmarkFunc()">
                    <v-icon>mdi-content-save</v-icon>
                    SAVE
                </v-btn>
            </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
</template>
<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  name: 'BookmarkDialogComp',
  components: {
      Treeselect
  },
  props: [],
  data () {
    return {
        bookmarkDialogBool: false,
        editBookmark: {},
        allocatedHashKeyList: [],
        allocatedHashList: [],
        hashListOptionList: []
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
      async openBookmarkDialogFunc () {
          await this.clearDataFunc()
          await this.initEditBookmarkFunc()
          await this.totalHashListFunc()
          await this.hashListByBookmarkFunc(this.editBookmark.bookmarkId)
          this.bookmarkDialogBool = true
      },
      initEditBookmarkFunc () {
          const selectedBookmark = this.$store.getters['view-bookmark/getSelectedBookmark']
          this.editBookmark.bookmarkId = selectedBookmark.bookmarkId
          this.editBookmark.bookmarkName = selectedBookmark.bookmarkName
          this.editBookmark.url = selectedBookmark.url
          this.editBookmark.bookmarkInfo = selectedBookmark.bookmarkInfo
          this.editBookmark.frequency = selectedBookmark.frequency
      },
      clearDataFunc () {
          this.allocatedHashKeyList = []
          this.allocatedHashList = []
          this.hashListOptionList = []
      },
      closeBookmarkDialogFunc () {
          this.bookmarkDialogBool = false
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
      async totalHashListFunc () {
          const totalHashList = await this.$store.dispatch('api-v1-hash/hashListByUserId')
          if (totalHashList !== undefined && totalHashList.length !== 0) {
              this.hashListOptionList = await this.makeTreeSelectFormatFunc(totalHashList)
          } else {
              this.hashListOptionList = []
          }
      },
      selectHashInTreeFunc (node) {
          const lowerCaseName = node.hashName.toLowerCase()
          this.allocatedHashList.push({
              hashName: lowerCaseName,
              hashId: node.hashId
          })
      },
      deselectHashInTreeFunc (node) {
          const idx = this.allocatedHashList.findIndex((element) => { return element.hashId === node.hashId })
          if (idx !== -1) {
              this.allocatedHashList.splice(idx, 1)
          }
      },
      async hashListByBookmarkFunc (bookmarkId) {
          const hashKeyList = await this.$store.dispatch('api-v1-hash/hashListByBookmarkId', bookmarkId)
          hashKeyList.forEach((element) => {
              this.allocatedHashKeyList.push(element.hashId)
              this.allocatedHashList.push(element)
          })
      },
      async saveEditBookmarkFunc () {
          const bookmarkBody = {
              bookmark: {
                  bookmarkId: this.editBookmark.bookmarkId,
                  bookmarkName: this.editBookmark.bookmarkName,
                  url: this.editBookmark.url,
                  bookmarkInfo: this.editBookmark.bookmarkInfo
              }
          }
          await this.$store.dispatch('api-v1-bookmark/editBookmark', bookmarkBody)
          const hashBody = {
              bookmarkId: this.editBookmark.bookmarkId,
              hashKeyList: this.allocatedHashList
          }
          await this.$store.dispatch('api-v1-hash/hashEditInBookmark', hashBody)
          const selectedHash = this.$store.getters['view-hash/getSelectedHash']
          if (selectedHash.hashId !== undefined) {
              const refreshList = await this.$store.dispatch('api-v1-bookmark/bookmarkByHash', selectedHash.hashId)
              this.$store.commit('view-bookmark/setBookmarkList', refreshList)
          }
          this.closeBookmarkDialogFunc()
      }
  }
}
</script>
<style scoped>
.edit-text-field {
    margin-bottom: 10px;
    margin-left: 10px;
    margin-right: 10px;
}
.edit-hash-tree {
    margin-top: 20px;
    margin-bottom: 30px;
    margin-left: 10px;
    margin-right: 10px;
}
</style>
