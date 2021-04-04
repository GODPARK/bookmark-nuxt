<template>
    <div>
      <v-card>
        <v-card-title>
          New Hash
        </v-card-title>
        <v-container>
          <v-row>
            <v-col>
              <v-text-field
                prepend-icon="mdi-pound-box"
              />
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer />
          <v-btn>
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
    }
  },
  computed: {},
  mounted () {
  },
  methods: {
  }
}
</script>
