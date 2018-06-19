<template>
    <v-form
        v-model="valid"
        @submit="singUp"
    >
        <v-card>
            <v-card-title class="title">{{ title }}</v-card-title>
            <v-container>
                <v-text-field
                    v-model="name"
                    label="Enter your name"
                />
                <v-text-field
                    v-model="email"
                    label="Enter your E-Mail"
                    required
                />
                <v-text-field
                    v-model="phone"
                    label="Enter your phone number"
                    required
                />
                <v-text-field
                    v-model="password"
                    label="Password"
                    type="password"
                    required
                />
            </v-container>
            <v-card-actions>
                <v-btn
                    dark
                    class="blue right"
                    type="submit"
                >
                    Sing Up
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
</template>

<script>
import Auth from '../../tools/Auth'
import { only } from '../../tools/helpers'
export default {
  props: {
    title: {
      type: String,
      default: 'Login'
    }
  },
  data () {
    return {
      valid: false,
      email: '',
      phone: '',
      name: '',
      password: '',
    }
  },
  methods: {
    singUp (event) {
      event.preventDefault();
      Auth.register(only(this, ['name','email', 'phone', 'password']));
    }
  }
}
</script>

<style lang="css">
</style>
