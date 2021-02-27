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
            <v-text-field
                v-model="account"
                class="text-form-class"
                :counter="10"
                label="Account"
                required
            />
            <v-text-field
                v-model="password"
                class="text-form-class"
                :counter="10"
                label="Password"
                type="password"
                required
            />
            <v-card-actions>
                <v-btn text @click="closeDialogFunc()">
                    cancel
                </v-btn>
                <v-spacer />
                <v-btn @click="loginFunc()">
                    login
                </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
    </div>
</template>
<script>
export default {
  name: 'BmAuthLoginDialog',
  components: {
  },
  props: [],
  data () {
    return {
        dialogOptions: {
            title: 'Login',
            controlBool: false,
            maxWidth: 500,
            persistent: true
        },
        account: '',
        password: '',
        loginErrorAlertBool: false
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
          this.clearDialogFunc()
          this.dialogOptions.controlBool = false
      },
      clearDialogFunc () {
          this.account = ''
          this.password = ''
      },
      async loginFunc () {
          const response = await this.$store.dispatch('api-v1-auth/signIn', { account: this.account, password: this.password })
          if (response) {
              await this.$store.commit('auth/setToken', response)
              await this.$store.commit('auth/setAccount', response)
              alert(`${response.account} 님 환영합니다.`)
              this.closeDialogFunc()
          } else {
              this.loginErrorAlertBool = true
          }
      }
  }
}
</script>
<style scoped>
.text-form-class {
    margin-left: 20px;
    margin-right: 20px;
}
</style>
