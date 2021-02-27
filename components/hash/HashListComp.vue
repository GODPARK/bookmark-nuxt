<template>
    <div>
        <v-container>
            <v-row>
                <v-col
                    v-for="hash in hashList"
                    :key="hash.hashId"
                    :cols="hashCardCols"
                >
                    <v-hover
                        v-slot="{ hover }"
                        close-delay="100"
                    >
                        <v-card
                            :elevation="hover ? 8 : 3"
                            shaped
                            @click="clickHashFunc(hash)"
                        >
                            <v-card-title class="text-subtitle-1">
                                <v-icon class="hash-title-icon">
                                    mdi-pound-box
                                </v-icon>
                                {{ hash.hashName }}
                                <v-spacer />
                                <v-icon small>
                                    mdi-earth
                                </v-icon>
                                <v-icon small>
                                    mdi-lock
                                </v-icon>
                            </v-card-title>
                        </v-card>
                    </v-hover>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
export default {
  name: 'HashListComp',
  components: {
  },
  props: {
  },
  data () {
    return {
    }
  },
  computed: {
      hashCardCols () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 12
          case 'sm': return 12
          case 'md': return 4
          case 'lg': return 12
          case 'xl': return 12
        }
        return 12
      },
      hashList () {
          return this.$store.getters['view-hash/getHashList']
      }
  },
  mounted () {
  },
  methods: {
      async clickHashFunc (hash) {
        const data = await this.$store.dispatch('api-v1-bookmark/bookmarkByHash', hash.hashId)
        this.$store.commit('view-bookmark/setBookmarkList', data)
      }
  }
}
</script>
<style scoped>
.hash-title-icon {
    margin-right: 10px;
}
</style>
