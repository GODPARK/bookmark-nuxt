<template>
    <div>
        <v-footer :fixed="fixed">
            <span>&copy; {{ new Date().getFullYear() }}</span>
        </v-footer>
    </div>
</template>
<script>
export default {
  name: 'BmFooter',
  components: {
  },
  props: [],
  data () {
    return {
        fixed: false
    }
  },
  computed: {},
  mounted () {
  },
  methods: {
  }
}
</script>
