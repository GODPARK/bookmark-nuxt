<template>
    <div>
      <v-toolbar v-if="isEmptySeletedHashComp">
          <v-toolbar-title class="selected-hash-title">
            <h3> {{ selectedHashComp.hashName }} </h3>
          </v-toolbar-title>
          <v-spacer />
          <v-btn v-if="controlMain" small text :color="selectedHashColorComp">
            <v-icon>mdi-star</v-icon>
          </v-btn>
          <v-btn v-if="controlDelete" small text>
            <v-icon>mdi-trash-can</v-icon>
          </v-btn>
      </v-toolbar>
    </div>
</template>
<script>
export default {
  name: 'HashInfo',
  components: {
  },
  props: {
      controlMain: {
          type: Boolean,
          default: false
      },
      controlDelete: {
          type: Boolean,
          default: false
      }
  },
  data () {
    return {
    }
  },
  computed: {
      selectedHashComp () {
        return this.$store.getters['view-hash/getSelectedHash']
      },
      isEmptySeletedHashComp () {
        return this.$store.getters['view-hash/isEmptySelectedHash']
      },
      selectedHashColorComp () {
          if (this.$store.getters['view-hash/getSelectedHash'].hashMain === 1) {
              return 'amber'
          } else {
              return 'indigo'
          }
      }
  },
  mounted () {
  },
  methods: {
  }
}
</script>
<style scoped>
.selected-hash-title {
    margin-left: 20px;
    margin-right: 10px;
}
</style>
