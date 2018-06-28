<template>
    <form @submit.prevent="singUp">
        <v-card>
            <v-card-title class="title">{{ title }}</v-card-title>
            <v-container>
                <v-text-field
                    v-model="model.name"
                    label="Enter your name"
                    @input="$v.model.name.$touch()"
                    @blur="$v.model.name.$touch()"
                />
                <v-text-field
                    v-model="model.email"
                    label="Enter your E-Mail"
                />
                <v-text-field
                    v-model="model.phone"
                    label="Enter your phone number"
                />
                <v-text-field
                    v-model="model.password"
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
    </form>
</template>

<script>
import Register from '../../models/Register'
import Auth from '../../tools/Auth'

export default {
  mixins: Register.mixins(),
  props: {
    title: {
      type: String,
      default: 'Login'
    }
  },
  data () {
    return {
      model: new Register()
    }
  },
  computed: {
    errorName () {
      // if (typeof this.model !== 'undefined' && this.$v !== 'undefined') {
      //     return this.model.getErrors('name', this.$v);
      // }

      return []
    }
  },
  methods: {
    singUp (event) {
      console.log('sing up...')
      this.$v.$touch()
      if (this.model.isValid()) {
        Auth.register(this.model.getData())
      }
    }
  }
}
</script>

<style lang="css">
</style>
