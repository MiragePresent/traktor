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
            </v-container>
            <v-card-actions>
                <v-btn
                        dark
                        class="blue right"
                        type="submit"
                >
                    Sing In
                </v-btn>
                <v-spacer></v-spacer>
                <router-link :to="{name: 'forgot'}">Forgot your password?</router-link>
            </v-card-actions>
        </v-card>
    </form>
</template>

<script>
import BaseModel from '../../models/BaseModel'

export default {
  data () {
    return {
      model: new BaseModel()
    }
  },
  methods: {
    send () {
      console.log('sending...')
    }
  }
}
</script>

<style scoped>

</style>
