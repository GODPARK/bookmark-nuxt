<template>
    <div>
      <client-only>
        <v-card
          v-if="accountComp.login"
          class="card-class"
        >
          <v-card-title>
            <v-icon class="mr-1">
              mdi-account
            </v-icon>
            User
          </v-card-title>
          <v-card-actions>
            <v-row>
              <v-col>
            <v-btn
              small
              block
              @click="openLoginDialogFunc()"
            >
              login
            </v-btn>
              </v-col>
              <v-col>
            <v-btn
              small
              block
              @click="openSignUpDialogFunc()"
            >
              sign up
            </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
        <v-card
          v-if="!accountComp.login"
          class="card-class"
        >
          <v-card-title>
            <v-icon class="mr-1">
              mdi-account
            </v-icon>
            {{ this.$store.getters['auth/getAccount'] }}
          </v-card-title>
          <v-card-actions>
            <v-btn
              block
              small
              @click="logoutFunc()"
            >
              logout
            </v-btn>
          </v-card-actions>
        </v-card>
      </client-only>
      <bm-auth-login-dialog ref="login" />
      <bm-auth-sign-up-dialog ref="signUp" />
    </div>
</template>
<script>
import BmAuthLoginDialog from './LoginDialog'
import BmAuthSignUpDialog from './SignUpDialog'

export default {
  name: 'BmAuthComp',
  components: {
    BmAuthLoginDialog,
    BmAuthSignUpDialog
  },
  props: [],
  data () {
    return {
    }
  },
  computed: {
    accountComp () {
      if (this.$store.getters['auth/getAccount']) {
        return {
          login: false,
          account: this.$store.getters['auth/getAccount']
        }
      } else {
        return {
          login: true,
          account: ''
        }
      }
    }
  },
  mounted () {
  },
  methods: {
    openLoginDialogFunc () {
      this.$refs.login.openDialogFunc()
    },
    openSignUpDialogFunc () {
      this.$refs.signUp.openDialogFunc()
    },
    async logoutFunc () {
      await this.$store.dispatch('api-v1-auth/logout')
      this.$store.commit('auth/setAccount', { account: '' })
      this.$store.commit('auth/setToken', { token: '' })
    }
  }
}
</script>
<style scoped>
.card-class {
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>
