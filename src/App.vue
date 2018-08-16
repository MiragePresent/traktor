<template>
    <v-app>
        <v-toolbar app>
            <v-container>
                <logo class="left"/>
                <auth-bar class="right"/>
            </v-container>
        </v-toolbar>
        <v-content>
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </v-content>
        <v-footer app></v-footer>
    </v-app>
</template>
<script>
import Logo from './components/common/Logo'
import AuthBar from './components/Auth/AuthBar'
import Auth from './tools/Auth'

export default {
  components: {
    Logo,
    AuthBar
  },
  created () {
    Auth.handle()
  }
}
</script>
<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;
    }

    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }
</style>
