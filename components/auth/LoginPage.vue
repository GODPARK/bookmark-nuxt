<template>
    <div>
      <v-card class="login-card-class" elevation="0">
        <v-text-field
            v-model="account"
            class="text-form-class"
            :counter="12"
            label="Account"
            required
        />
        <v-text-field
            v-model="password"
            class="text-form-class"
            :counter="12"
            label="Password"
            type="password"
            required
        />
        </v-card>
    </div>
</template>
<script>

export default {
  name: 'LoginPage',
  components: {
  },
  props: [],
  data () {
    return {
        title: 'Login',
        account: '',
        password: '',
        loginErrorAlertBool: false
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
      clearLoginInfoFunc () {
          this.account = ''
          this.password = ''
      },
      async loginFunc () {
          const response = await this.$store.dispatch('api-v1-auth/signIn', { account: this.account, password: this.password })
          if (response) {
              if (response.token !== undefined && response.account !== undefined) {
                  await this.$store.commit('auth/setToken', response)
                  await this.$store.commit('auth/setAccount', response)
                  alert(`${response.account} 님 환영합니다.`)
              } else if (response.error !== undefined) {
                  alert('로그인 정보를 다시 확인 부탁드립니다.')
              }
              return true
          } else {
              this.loginErrorAlertBool = true
              return false
          }
      }
  }
}
</script>
<style scoped>
.text-form-class {
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
}
.login-card-class {
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>
