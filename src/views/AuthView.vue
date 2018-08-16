<template>
    <v-layout row wrap>
        <v-flex xs4 offset-xs4>
            <component
                :is="authComponent"
                :title="authTitle"
            />
        </v-flex>
    </v-layout>
</template>

<script>
import AuthRegister from '../components/Auth/AuthRegister'
import AuthLogin from '../components/Auth/AuthLogin'
import AuthForgot from '../components/Auth/AuthForgotPassword'

import { strToTitleCase } from '../tools/helpers'
export default {
  computed: {
    authComponent () {
      let route = this.$route.name
      return `Auth${route[0].toUpperCase()}${route.substr(1)}`
    },
    authTitle () {
      return strToTitleCase(this.$route.name)
    }
  },
  components: {
    AuthRegister,
    AuthLogin,
    AuthForgot
  }
}
</script>

<style lang="css">
</style>
