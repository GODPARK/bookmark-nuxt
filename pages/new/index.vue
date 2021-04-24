<template>
    <div>
        <v-container>
            <v-row>
                <v-col :cols="newCardCols">
                    <new-hash-comp />
                </v-col>
                <v-col :cols="newCardCols">
                    <new-bookmark-comp />
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
import NewBookmarkComp from '../../components/bookmark/NewBookmarkComp'
import NewHashComp from '../../components/hash/NewHashComp'

export default {
  name: 'NewPage',
  components: {
      NewBookmarkComp,
      NewHashComp
  },
  props: [],
  data () {
    return {
    }
  },
  computed: {
    newCardCols () {
    switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 12
        case 'sm': return 12
        case 'md': return 12
        case 'lg': return 6
        case 'xl': return 6
    }
    return 12
    },
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
  },
  methods: {
  }
}
</script>
