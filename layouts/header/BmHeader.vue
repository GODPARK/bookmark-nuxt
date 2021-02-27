<template>
    <div>
        <bm-main-nav ref="mainNav" />
        <bm-sub-nav ref="subNav" />
        <v-app-bar dense>
            <v-app-bar-nav-icon @click="mainNavControlFunc()" />
            <v-toolbar-title v-text="title" />
            <v-spacer />
            <v-btn
                text
                @click.stop="subNavControlFunc()"
            >
                <v-icon>{{ sudNavIcon }}</v-icon>
            </v-btn>
        </v-app-bar>
    </div>
</template>
<script>
import BmMainNav from './BmMainNav'
import BmSubNav from './BmSubNav'

export default {
  name: 'BmHeader',
  components: {
    BmMainNav,
    BmSubNav
  },
  props: [],
  data () {
    return {
        title: 'Bookmark',
        sudNavIcon: 'mdi-account'
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
      mainNavControlFunc () {
          this.$refs.mainNav.navControlFunc()
      },
      mainNavMiniControlFunc () {
          this.$refs.mainNav.navMiniControlFunc()
      },
      subNavControlFunc () {
          this.$refs.subNav.navControlFunc()
      }
  }
}
</script>
