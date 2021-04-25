<template>
    <div>
        <v-navigation-drawer
            v-model="navControlBool"
            :mini-variant.sync="navMiniBool"
            app
        >
            <v-btn
                icon
                @click.stop="navMiniControlFunc()"
            >
                <v-icon>
                    {{ navMiniBool ? 'mdi-chevron-right' : 'mdi-chevron-left' }}
                </v-icon>
            </v-btn>
            <v-list>
                <v-list-item
                    v-for="(item, i) in navItemList"
                    :key="i"
                    :to="item.to"
                    router
                    exact
                >
                    <v-list-item-action>
                        <v-icon>{{ item.icon }} </v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.title" />
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>
<script>
import mainNavItemList from './BmMainNavItem'

export default {
  name: 'BmMainNav',
  components: {},
  props: [],
  data () {
    return {
        navControlBool: false,
        navMiniBool: false,
        navItemList: mainNavItemList
    }
  },
  computed: {},
  mounted () {
  },
  methods: {
      navControlFunc () {
          this.navControlBool = !this.navControlBool
      },
      navMiniControlFunc () {
          this.navMiniBool = !this.navMiniBool
      }
  }
}
</script>
