<template>
    <div>
      <v-row>
        <v-col :cols="mainHashCardCols">
          <v-card
            v-if="!isEmptyMainHashList"
            :height="mainHashCardHeight"
            class="main-card-view"
            :loading="mainHashLoadingBool"
            outlined
          >
            <v-card-actions>
              <v-spacer />
              <v-btn small text @click="getMainHashListFunc()">
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
            </v-card-actions>
            <hash-list-comp />
          </v-card>
        </v-col>
        <v-col>
          <v-card
            v-if="!isEmptyMainBookmarkList"
            :height="mainBookmarkCardHeight"
            class="main-card-view"
            outlined
          >
            <bookmark-list-comp />
          </v-card>
        </v-col>
      </v-row>
    </div>
</template>
<script>
import HashListComp from '../components/hash/HashListComp'
import BookmarkListComp from '../components/bookmark/BookmarkListComp'

export default {
  name: 'Main',
  components: {
    HashListComp,
    BookmarkListComp
  },
  props: [],
  data () {
    return {
      mainHashLoadingBool: false
    }
  },
  computed: {
    isLoginComp () {
      if (this.$store.getters['auth/getToken']) {
        return false
      } else {
        return true
      }
    },
    mainHashCardCols () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 12
        case 'sm': return 12
        case 'md': return 12
        case 'lg': return 3
        case 'xl': return 3
      }
      return 12
    },
    mainHashCardHeight () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 200
        case 'sm': return 200
        case 'md': return 300
        case 'lg': return this.$vuetify.breakpoint.height - 100
        case 'xl': return this.$vuetify.breakpoint.height - 100
      }
      return 300
    },
    mainBookmarkCardHeight () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return undefined
        case 'sm': return undefined
        case 'md': return undefined
        case 'lg': return this.$vuetify.breakpoint.height - 100
        case 'xl': return this.$vuetify.breakpoint.height - 100
      }
      return undefined
    },
    isEmptyMainHashList () {
      return this.$store.getters['view-hash/isEmptyHashList']
    },
    isEmptyMainBookmarkList () {
      return this.$store.getters['view-bookmark/isEmptyBookmarkList']
    }
  },
  mounted () {
    if (this.isLoginComp) {
      this.$router.push('/login')
    } else {
      this.getMainHashListFunc()
    }
  },
  methods: {
    async getMainHashListFunc () {
      this.mainHashLoading = true
      const hashList = await this.$store.dispatch('api-v1-hash/mainHash')
      this.$store.commit('view-hash/setHashList', hashList)
      this.mainHashLoading = false
    }
  }
}
</script>
<style scoped>
.main-card-view {
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
