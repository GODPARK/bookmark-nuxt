<template>
    <div>
      <v-card>
          <v-card-title>
              Search Bookmark
          </v-card-title>
          <v-row>
              <v-col>
                <v-text-field
                    v-model="searchTextString"
                    label="Bookmark Name"
                    append-icon="mdi-book-search"
                    class="mr-2 ml-2 mb-2"
                    outlined
                    dense
                    clearable
                    @click:append="searchBookmarkByName"
                    @keydown="enterEventFunc"
                />
              </v-col>
          </v-row>
      </v-card>
    </div>
</template>
<script>
export default {
  name: 'BookmarkSearchComp',
  components: {
  },
  props: [],
  data () {
    return {
        searchTextString: ''
    }
  },
  computed: {},
  mounted () {
  },
  methods: {
      enterEventFunc (key) {
          if (key.code === 'Enter') {
              this.searchBookmarkByName()
          }
      },
      async searchBookmarkByName () {
          if (this.searchTextString !== undefined && this.searchTextString !== null) {
              const data = await this.$store.dispatch('api-v1-bookmark/searchBookmarkByName', this.searchTextString)
              this.$store.commit('view-bookmark/setBookmarkList', data)
          }
      }
  }
}
</script>
