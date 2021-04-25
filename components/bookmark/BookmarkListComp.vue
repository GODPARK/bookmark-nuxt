<template>
    <div>
        <v-container>
            <v-row>
                <v-col
                    v-for="bookmark in bookmarkList"
                    :key="bookmark.bookmarkId"
                    :cols="bookmarkCardCols"
                >
                    <v-hover
                        v-slot="{ hover }"
                        close-delay="100"
                    >
                        <v-card
                            :elevation="hover ? 10 : 4"
                            :color="hover ? 'lime lighten-5' : ''"
                            outlined
                        >
                            <div class="bookmark-card-title">
                                <v-card-title @click="clickBookmark(bookmark)">
                                    <strong>{{ bookmark.bookmarkName }}</strong>
                                </v-card-title>
                                <v-card-text class="bookmark-card-text">
                                    {{ bookmark.bookmarkInfo }}
                                </v-card-text>
                            </div>
                            <v-divider />
                            <v-card-actions>
                                <v-spacer />
                                <v-btn text small @click="clickEditBookmark(bookmark)">
                                    <v-icon>
                                        mdi-book-edit-outline
                                    </v-icon>
                                </v-btn>
                                <v-btn text small @click="clickDeleteBookmark(bookmark)">
                                    <v-icon>
                                        mdi-trash-can
                                    </v-icon>
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-hover>
                </v-col>
            </v-row>
        </v-container>
        <div>
            <bookmark-dialog-comp ref="bookamrkDialog" />
        </div>
    </div>
</template>
<script>
import BookmarkDialogComp from './BookmarkDialogComp'

export default {
  name: 'BookmarkListComp',
  components: {
    BookmarkDialogComp
  },
  props: [],
  data () {
    return {
    }
  },
  computed: {
      bookmarkList () {
          return this.$store.getters['view-bookmark/getBookmarkList']
      },
      bookmarkCardCols () {
        switch (this.$vuetify.breakpoint.name) {
            case 'xs': return 12
            case 'sm': return 6
            case 'md': return 6
            case 'lg': return 4
            case 'xl': return 4
        }
        return 12
      }
  },
  mounted () {
  },
  methods: {
      clickBookmark (bookmark) {
          window.open(bookmark.url, '_blank')
          this.$store.dispatch('api-v1-bookmark/frequencyBookmark', bookmark.bookmarkId)
      },
      clickEditBookmark (bookmark) {
          this.$store.commit('view-bookmark/setSelectedBookmark', bookmark)
          this.$refs.bookamrkDialog.openBookmarkDialogFunc()
      },
      async clickDeleteBookmark (bookmark) {
          if (confirm(`${bookmark.bookmarkName} 를 삭제하시겠습니까?`)) {
            const result = await this.$store.dispatch('api-v1-bookmark/deleteBookmark', bookmark.bookmarkId)
            if (result.error === undefined) {
                this.$store.commit('view-snackbar/setSnackBarTextStringWithSuccess', `${bookmark.bookmarkName} DELETE!`)
                this.$store.commit('view-bookmark/deleteBookmarkInList', bookmark)
            } else {
                this.$store.commit('view-snackbar/setSnackBarTextStringWithError', result.error)
            }
          }
      }
  }
}
</script>
<style scoped>
.bookmark-card-title {
    cursor: pointer;
}
.bookmark-card-text {
    height: 80px;
    overflow-y: scroll;
    white-space: pre-line;
}
</style>
