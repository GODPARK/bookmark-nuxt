<template>
    <div>
      <v-card>
        <v-card-title>
          New Bookmark
        </v-card-title>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field />
            </v-col>
            <v-col cols="12">
              <v-text-field />
            </v-col>
            <v-col cols="12">
              <v-text-field />
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </div>
</template>
<script>
export default {
  name: 'NewBookmarkComp',
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
