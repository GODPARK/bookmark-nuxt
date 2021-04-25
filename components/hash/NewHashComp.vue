<template>
    <div>
      <v-card
        outlined
        elevation="4"
      >
        <v-card-title>
          New Hash
        </v-card-title>
        <v-container>
          <v-row>
            <v-col>
              <v-text-field
                v-model="newHash.hashName"
                :error="!validationHashNameComp"
                :success="validationHashNameComp"
                prepend-icon="mdi-pound-box"
              />
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer />
          <v-btn
            small
            text
            :color="selectedHashColorComp"
            @click="selectNewHashMain()"
          >
            <v-icon>mdi-star</v-icon>
          </v-btn>
          <v-btn @click="saveNewHashFunc()">
            <v-icon> mdi-content-save </v-icon>
            save
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
</template>
<script>
export default {
  name: 'NewHashComp',
  components: {
  },
  props: [],
  data () {
    return {
      newHash: {
        hashName: '',
        hashMain: 0
      }
    }
  },
  computed: {
    selectedHashColorComp () {
      if (this.newHash.hashMain === 1) {
          return 'amber'
      } else {
          return 'indigo'
      }
    },
    validationHashNameComp () {
      if (this.newHash.hashName !== undefined && this.newHash.hashName !== '') {
        return true
      }
      return false
    }
  },
  mounted () {
  },
  methods: {
    selectNewHashMain () {
      if (this.newHash.hashMain === 1) {
        this.newHash.hashMain = 0
      } else if (this.newHash.hashMain === 0) {
        this.newHash.hashMain = 1
      }
    },
    clearNewHash () {
      this.newHash.hashName = ''
      this.newHash.hashMain = 0
    },
    async saveNewHashFunc () {
      if (this.validationHashNameComp) {
        const result = await this.$store.dispatch('api-v1-hash/saveHash', this.newHash)
        if (result.error === undefined) {
          this.$store.commit('view-snackbar/setSnackBarTextStringWithSuccess', `${this.newHash.hashName} is SAVE!`)
          this.clearNewHash()
        } else {
          this.$store.commit('view-snackbar/setSnackBarTextStringWithError', result.error)
        }
      }
    }
  }
}
</script>
