<template>
    <div>
        <v-navigation-drawer
        v-model="navControlBool"
        temporary
        :right="navRightBool"
        fixed
        >
            <!-- <v-card class="card-class">
                <v-card-title>
                    <v-icon class="mr-1">mdi-dark-mode</v-icon> Dark Mode.
                </v-card-title>
                <v-card-actions>
                    <v-btn
                        small
                        block
                        @click="changeDarkModeFunc()"
                        :color="darkModeBtn.color"
                        :class="darkModeBtn.class"
                    >
                        {{ darkModeBtn.text }}
                    </v-btn>
                </v-card-actions>
            </v-card> -->
            <bm-auth-comp />
        </v-navigation-drawer>
    </div>
</template>
<script>
import BmAuthComp from '../../components/auth/auth'

export default {
  name: 'BmSubNav',
  components: {
    BmAuthComp
  },
  props: [],
  data () {
    return {
        navControlBool: false,
        navRightBool: true
    }
  },
  computed: {
    darkModeBtn () {
        if (this.$store.getters.getDarkMode) {
            return {
                color: 'grey lighten-4',
                text: 'light mode',
                class: 'black--text'
            }
        } else {
            return {
                color: 'grey darken-3',
                text: 'dark mode',
                class: 'white--text'
            }
        }
    }
  },
  mounted () {
  },
  methods: {
    navControlFunc () {
        this.navControlBool = !this.navControlBool
    },
    navRightFunc () {
        this.navRightBool = !this.navRightBool
    },
    changeDarkModeFunc () {
        this.$store.commit('changeDarkMode')
    }
  }
}
</script>
<style scoped>
.dark-btn-class {
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
}
.card-class {
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>
