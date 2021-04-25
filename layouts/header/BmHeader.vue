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
        <v-snackbar
            v-model="snackBarControlBool"
            :timeout="snackBarTimeoutNumber"
            outlined
            :color="snackBarColorComp"
        >
            {{ snackBarTextStringComp }}
        </v-snackbar>
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
        sudNavIcon: 'mdi-account',
        snackBarControlBool: false,
        snackBarTimeoutNumber: 2000
    }
  },
  computed: {
      snackBarColorComp () {
          return this.$store.getters['view-snackbar/getSnackBarResultString']
      },
      snackBarTextStringComp () {
          return this.$store.getters['view-snackbar/getSnackBarTextString']
      }
  },
  watch: {
      snackBarTextStringComp (before, after) {
          if (before !== after) {
              this.snackBarControlBool = true
          }
      }
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
