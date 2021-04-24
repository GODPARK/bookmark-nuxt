<template>
    <div>
      <v-container>
      <v-row>
        <v-col>
          <hash-search-comp />
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

export default {
  name: 'Search',
  components: {
    HashSearchComp,
    BookmarkListComp,
    HashInfo
  },
  props: [],
  data () {
    return {
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
    this.$store.commit('view-bookmark/clearBookmarkList')
    this.$store.commit('view-hash/clearSelectedHash')
  },
  methods: {
  }
}
</script>
