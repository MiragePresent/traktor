<template>
    <form @submit.prevent="send">
        <v-card>
            <v-card-title class="title">{{ title }}</v-card-title>
            <v-container>
                <v-text-field
                        v-model="model.email"
                        label="Enter your E-Mail"
                        :error-messages="emailErrors"
                        @input="$v.model.email.$touch()"
                        @blur="$v.model.email.$touch()"
                />
                <v-text-field
                        v-model="model.password"
                        label="Password"
                        type="password"
                        :error-messages="passwordErrors"
                        @input="$v.model.password.$touch()"
                        @blur="$v.model.password.$touch()"
                />
                <v-text-field
                        v-if="confirmation"
                        v-model="model.code"
                        label="Confirm code"
                        type="password"

                />
            </v-container>
            <v-card-actions>
                <v-btn
                        dark
                        class="blue right"
                        type="submit"
                >
                    {{ confirmation ? 'Confirm' : 'Sing In' }}
                </v-btn>
                <v-spacer></v-spacer>
                <router-link :to="{name: 'forgot', params: {user_email: 'm' }}">Forgot your password?</router-link>
            </v-card-actions>
        </v-card>
    </form>
</template>

<script>
import {validationMixin} from 'vuelidate'
import Login from '../../models/Login'
import Auth from '../../tools/Auth'

export default {
  data () {
    return {
      confirmation: false,
      model: new Login()
    }
  },
  methods: {
    send () {
      if (this.confirmation) {
        this.confirm()
      } else {
        this.singIn()
      }
    },
    singIn () {
      if (!this.$v.$anyError) {
        Auth.authenticate(
          this.model.getData(),
          (user) => {
            alert('You are logged in')
            this.$router.push({name: 'home'})
          },
          (error, data) => {
            if (error.code === Auth.USER_NOT_CONFIRMED) {
              alert('Your account is not confirmed. Please enter confirmation code')
              this.confirmation = true
            }
          }
        )
      }
    },
    confirm () {
      if (!this.$v.$anyError) {
        console.log('singing in...')
        Auth.confirm(
          this.model.getData(),
          (error, result) => {
            if (error) {
              return
            }
            this.confirmation = false
            this.singIn()
          }
        )
      }
    }
  },
  computed: {
    emailErrors () {
      return this.model.getErrors(this.$v, 'email')
    },
    passwordErrors () {
      return this.model.getErrors(this.$v, 'password')
    }
  },
  props: {
    title: {
      type: String,
      default: 'Login'
    }
  },
  mixins: [validationMixin],
  validations () {
    return this.model.validations()
  }
}
</script>

<style lang="css">
</style>
