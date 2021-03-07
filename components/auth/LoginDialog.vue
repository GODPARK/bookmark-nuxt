<template>
    <div>
        <v-dialog
          v-model="dialogOptions.controlBool"
          :max-width="dialogOptions.maxWidth"
          :persistent="dialogOptions.persistent"
        >
            <v-card>
                <v-card-title>
                    {{ dialogOptions.title }}
                </v-card-title>
                <login-page ref="login" />
                <v-card-actions>
                    <v-btn text @click="closeDialogFunc()">
                        cancel
                    </v-btn>
                    <v-spacer />
                    <v-btn @click="loginActionFunc()" @keydown.enter="loginActionFunc()">
                        login
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import LoginPage from './LoginPage'

export default {
  name: 'BmAuthLoginDialog',
  components: {
    LoginPage
  },
  props: [],
  data () {
    return {
        dialogOptions: {
            title: 'Login',
            controlBool: false,
            maxWidth: 500,
            persistent: true
        }
    }
  },
  computed: {},
  mounted () {
  },
  methods: {
      openDialogFunc () {
          this.dialogOptions.controlBool = true
      },
      closeDialogFunc () {
          this.dialogOptions.controlBool = false
          this.$refs.login.clearLoginInfoFunc()
      },
      async loginActionFunc () {
          await this.$refs.login.loginFunc()
          this.closeDialogFunc()
      }
  }
}
</script>
<style scoped>
</style>
