<template>
    <form @submit.prevent="singUp">
        <v-card>
            <v-card-title class="title">{{ title }}</v-card-title>
            <v-container>
                <v-text-field
                        v-model="model.name"
                        label="Enter your name"
                        :error-messages="nameErrors"
                        @input="$v.model.name.$touch()"
                        @blur="$v.model.name.$touch()"
                />
                <v-text-field
                        v-model="model.email"
                        label="Enter your E-Mail"
                        :error-messages="emailErrors"
                        @input="$v.model.email.$touch()"
                        @blur="$v.model.email.$touch()"
                />
                <v-text-field
                        v-model="model.phone"
                        label="Enter your phone number"
                        :error-messages="phoneErrors"
                        @input="$v.model.phone.$touch()"
                        @blur="$v.model.phone.$touch()"
                />
                <v-text-field
                        v-model="model.password"
                        label="Password"
                        type="password"
                        :error-messages="passwordErrors"
                        @input="$v.model.password.$touch()"
                        @blur="$v.model.password.$touch()"
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
    </form>
</template>

<script>
import {validationMixin} from 'vuelidate'
import Register from '../../models/Register'
import Auth from '../../tools/Auth'

export default {
  data () {
    return {
      model: new Register()
    }
  },
  methods: {
    singUp (event) {
      if (!this.$v.$anyError) {
        Auth.register(
          this.model.getData(),
          (error, result) => {
            if (error) {
              return
            }

            alert('You are successfully registered')
            this.model.clear()
            this.$v.$reset()
            this.$router.push({name: 'login'})
          })
      }
    }
  },
  computed: {
    nameErrors () {
      return this.model.getErrors(this.$v, 'name')
    },
    emailErrors () {
      return this.model.getErrors(this.$v, 'email')
    },
    phoneErrors () {
      return this.model.getErrors(this.$v, 'phone')
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
