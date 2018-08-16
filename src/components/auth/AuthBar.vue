<template>
    <v-layout class="auth-links" v-if="!token">
        <router-link
                class="title"
                title="Sing in"
                :to="{name: 'login'}"
        >
            Sing in
        </router-link>
        <span class="title"> / </span>
        <router-link
                class="title"
                title="Sing up"
                :to="{name: 'register'}"
        >
            Sing up
        </router-link>
    </v-layout>
    <v-layout v-else>
        <span class="title">{{ name }}</span>
        <a
                class="title"
                title="Log out"
                @click.prevent="logout"
        >
            exit
        </a>
    </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import Auth from '../../tools/Auth'

export default {
  computed: {
    ...mapGetters('auth', ['name', 'token'])
  },
  methods: {
    logout: () => {
      console.log('here')
      Auth.logout()
    }
  }
}
</script>

<style lang="css">
    .auth-links {
        padding: 5px 0;
    }
</style>
