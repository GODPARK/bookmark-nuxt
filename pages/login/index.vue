<template>
    <div>
        <v-container>
            <v-row justify="center" align="center">
                <v-col align-self="center">
                    <v-card>
                        <v-card-title>
                            Login
                        </v-card-title>
                        <v-alert
                            class="alert-info-class"
                            :type="loginAlertOptions.type"
                            :outlined="loginAlertOptions.outlined"
                            :dense="loginAlertOptions.dense"
                        >
                            {{ loginAlertOptions.text }}
                        </v-alert>
                        <login-page ref="login" />
                        <v-card-actions>
                            <v-btn
                                @click="openSignUpDialogFunc()"
                            >
                                sign up
                            </v-btn>
                            <v-spacer />
                            <v-btn @click="loginActionFunc()" @keydown.enter="loginActionFunc()">
                                login
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <bm-auth-sign-up-dialog ref="signUp" />
    </div>
</template>
<script>
import LoginPage from '../../components/auth/LoginPage'
import BmAuthSignUpDialog from '../../components/auth/SignUpDialog'

export default {
  name: 'Login',
  components: {
      LoginPage,
      BmAuthSignUpDialog
  },
  props: [],
  data () {
    return {
        loginAlertOptions: {
            text: '로그인이 필요합니다.',
            type: 'warning',
            outlined: true,
            dense: true
        }
    }
  },
  computed: {},
  mounted () {
  },
  methods: {
      async loginActionFunc () {
          const result = await this.$refs.login.loginFunc()
          if (result) {
            await this.$router.push('/')
          }
      },
      openSignUpDialogFunc () {
        this.$refs.signUp.openDialogFunc()
      }
  }
}
</script>
<style scoped>
.alert-info-class {
    margin-left: 15px;
    margin-right: 15px;
    margin-bottom: 20px;
    margin-top: 20px;
}
</style>
