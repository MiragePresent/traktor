<template>
    <v-layout row wrap>
        <v-flex xs4 offset-xs4>
            <auth-form :title="'Sing in'"/>
        </v-flex>
    </v-layout>
</template>

<script>
import AuthForm from '../../components/Auth/AuthForm'
export default {
  components: {
    AuthForm
  }
}
</script>

<style lang="css">
</style>
