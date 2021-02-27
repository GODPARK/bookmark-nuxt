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
                            :elevation="hover ? 8 : 3"
                        >
                            <div class="bookmark-card-title">
                                <v-card-title @click="testB(bookmark)">
                                    <strong>{{ bookmark.bookmarkName }}</strong>
                                </v-card-title>
                                <v-card-text class="bookmark-card-text">
                                    {{ bookmark.bookmarkInfo }}
                                </v-card-text>
                            </div>
                            <v-divider />
                            <v-card-actions>
                                <v-spacer />
                                <v-btn text small>
                                    <v-icon>
                                        mdi-book-edit-outline
                                    </v-icon>
                                </v-btn>
                                <v-btn text small>
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
    </div>
</template>
<script>
export default {
  name: 'Sample',
  components: {
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
            case 'sm': return 12
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
      testB (bookmark) {
          console.log(bookmark)
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
