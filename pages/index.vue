<template>
    <div>
      <v-row>
        <v-col :cols="mainHashCardCols">
          <v-card
            v-if="!isEmptyMainHashList"
            :height="mainHashCardHeight"
            class="main-card-view"
            :loading="mainHashLoadingBool"
            elevation="2"
            outlined
          >
            <hash-list-comp />
          </v-card>
        </v-col>
        <v-col>
          <hash-info class="hash-card-class" :control-main="true" />
          <v-card
            v-if="!isEmptyMainBookmarkList"
            :height="mainBookmarkCardHeight"
            class="main-card-view"
            elevation="0"
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
import HashInfo from '../components/hash/HashInfo'

export default {
  name: 'Main',
  components: {
    HashListComp,
    BookmarkListComp,
    HashInfo
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
        case 'xs': return 300
        case 'sm': return 400
        case 'md': return 400
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
    this.$store.commit('view-bookmark/clearBookmarkList')
    this.$store.commit('view-hash/clearSelectedHash')
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
.hash-card-class {
  margin-top: 10px;
  margin-bottom: 15px;
}
</style>
