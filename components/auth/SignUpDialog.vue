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
                <v-card
                    outlined
                    rounded
                    elevation="4"
                    class="mr-2 ml-2 mb-1"
                >
                    <v-card-title>
                        <v-icon color="info">
                            mdi-information
                        </v-icon>
                        안내 사항
                    </v-card-title>
                    <v-card-text>
                        <p>
                            회원 가입 후, 운영자 확인 및 승인 절차 이후 사용 가능합니다.
                        </p>
                        <p>
                            해당 사이트의 경우, 개인적으로 개발중인 웹페이지로 <strong style="color:red">보안이 취약합니다.</strong>
                        </p>
                        <p>
                            따라서, 비밀번호 설정시 평소에 사용하지 않는
                            <strong style="color:red">간단한 비밀번호</strong>로 사용 부탁드립니다.
                        </p>
                        <p>
                            <strong style="color:red"> 또한 해당 사이트에 개인 정보성 데이터는 입력하지 않도록 주의 부탁드립니다.</strong>
                        </p>
                        <p>
                            감사합니다. 개발자 드림.
                        </p>
                        <p style="text-align:right">
                            <strong> contact : rootjh937dev@gmail.com </strong>
                        </p>
                    </v-card-text>
                </v-card>
                <v-checkbox
                    v-model="signUpAgreeBool"
                    color="info"
                    class="ml-2"
                    :label="signUpAgreeStr"
                    required
                />
                <v-text-field
                    v-model="signUpObject.account"
                    class="text-form-class"
                    :counter="10"
                    label="Account"
                    required
                    prepend-icon="mdi-account-circle"
                />
                <v-text-field
                    v-model="signUpObject.name"
                    class="text-form-class"
                    :counter="10"
                    label="Name ( 성함 )"
                    required
                    prepend-icon="mdi-account-circle"
                />
                <v-text-field
                    v-model="signUpObject.f_password"
                    class="text-form-class"
                    :counter="10"
                    label="비밀번호"
                    type="password"
                    required
                    prepend-icon="mdi-lock"
                />
                <v-text-field
                    v-model="signUpObject.s_password"
                    class="text-form-class"
                    :counter="10"
                    label="비밀번호 확인"
                    type="password"
                    required
                    prepend-icon="mdi-lock"
                />
                <v-card-actions>
                    <v-btn @click="closeDialogFunc()">
                        close
                    </v-btn>
                    <v-spacer />
                    <v-btn @click="signUpFunc()">
                        Sign up
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
export default {
  name: 'BmAuthSignUpDialog',
  components: {},
  props: [],
  data () {
    return {
        dialogOptions: {
            title: 'Sign Up',
            controlBool: false,
            maxWidth: 600,
            persistent: true
        },
        signUpAgreeBool: false,
        signUpObject: {
            account: '',
            f_password: '',
            s_password: '',
            name: '',
            agree: 0
        },
        signUpAgreeStr: '위 안내 사항을 충분히 인지하였으며, 해당 사이트를 이용하면서 발생하는 모든 문제는 사용자 본인에게 있는 것에 동의하십니까?'
    }
  },
  computed: {
      // TODO: valid 기능 추가
  },
  mounted () {
  },
  methods: {
      openDialogFunc () {
          this.dialogOptions.controlBool = true
      },
      closeDialogFunc () {
          this.dialogOptions.controlBool = false
      },
      clearDialogFunc () {
          this.signUpObject = {
            account: '',
            f_password: '',
            s_password: '',
            name: '',
            agree: 0
          }
      },
      async signUpFunc () {
        this.signUpObject.agree = await this.signUpAgreeBool ? 1 : 0
          const response = await this.$store.dispatch('api-v1-auth/signUp', this.signUpObject)
          if (!response.error) {
             alert('회원 가입에 성공하셨습니다.')
          }
          await this.clearDialogFunc()
          await this.closeDialogFunc()
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
