<template>
    <v-form
        v-model="valid"
        @submit="send"
    >
        <v-card>
            <v-card-title class="title">{{ title }}</v-card-title>
            <v-container>
                <v-text-field
                    v-model="email"
                    label="Enter your E-Mail"
                    required
                />
            </v-container>
            <v-card-actions>
                <v-btn
                    dark
                    class="blue right"
                    type="submit"
                >
                    Sing in
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
</template>

<script>
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
      email: ''
    }
  },
  methods: {
    send (event) {
      console.log('Sending...')
      event.preventDefault()
    }
  }
}
</script>

<style lang="css">
</style>
