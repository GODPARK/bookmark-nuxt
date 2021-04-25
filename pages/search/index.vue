<template>
    <div>
      <v-container>
      <v-row>
        <v-col>
          <v-card
            class="mb-2"
          >
            <v-tabs
              v-model="searchTabNumber"
              fixed-tabs
            >
              <v-tab @click="clearBookmarkAndHash()">
                Hash
              </v-tab>
              <v-tab @click="clearBookmarkAndHash()">
                Bookmark
              </v-tab>
            </v-tabs>
          </v-card>
            <div v-if="searchTabNumber === 0">
              <hash-search-comp />
            </div>
            <div v-else-if="searchTabNumber === 1">
              <bookmark-search-comp />
            </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <hash-info :control-main="true" :control-delete="true" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <bookmark-list-comp />
        </v-col>
      </v-row>
      </v-container>
    </div>
</template>
<script>
import HashSearchComp from '../../components/hash/HashSearchComp'
import HashInfo from '../../components/hash/HashInfo'
import BookmarkListComp from '../../components/bookmark/BookmarkListComp'
import BookmarkSearchComp from '../../components/bookmark/BookmarkSearchComp'

export default {
  name: 'Search',
  components: {
    HashSearchComp,
    BookmarkListComp,
    BookmarkSearchComp,
    HashInfo
  },
  props: [],
  data () {
    return {
      searchTabNumber: 0
    }
  },
  computed: {
    isLoginComp () {
        if (this.$store.getters['auth/getToken']) {
            return false
        } else {
            return true
        }
    }
  },
  mounted () {
    if (this.isLoginComp) {
      this.$router.push('/login')
    }
    this.clearBookmarkAndHash()
  },
  methods: {
    clearBookmarkAndHash () {
      this.$store.commit('view-bookmark/clearBookmarkList')
      this.$store.commit('view-hash/clearSelectedHash')
    }
  }
}
</script>
