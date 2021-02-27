<template>
  <v-app>
    <bm-header />
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <bm-footer />
  </v-app>
</template>

<script>
import BmHeader from './header/BmHeader'
import BmFooter from './footer/BmFooter'

  export default {
    components: {
      BmHeader,
      BmFooter
    },

    data () {
      return {
      }
    },
    computed: {
    }
  }
</script>
