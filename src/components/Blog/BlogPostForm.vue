<template>
    <v-layout>
        <v-flex
                xs8
                offset-xs2
        >
            <v-form @submit.prevent="save">
                <v-select
                        :items="authors"
                        v-model="model.authorId"
                        label="Author"
                        item-text="name"
                        item-value="id"
                ></v-select>
                <v-text-field
                        v-model="model.title"
                        :counter="30"
                        label="Title of post"
                        required
                ></v-text-field>
                <v-text-field
                        v-model="model.content"
                        label="Text"
                        textarea
                        required
                ></v-text-field>
                <router-link :to="'/blog'">Cancel</router-link>
                <v-btn
                        dark
                        color="blue"
                        type="submit"
                >
                    Create
                </v-btn>
            </v-form>
        </v-flex>
    </v-layout>
</template>

<script>
import {
  ADD_POST,
  FETCH_AUTHORS
} from '../../graphql/shema'
import Post from '../../models/Post'

export default {
  data () {
    return {
      authorId: '',
      model: new Post()
    }
  },
  methods: {
    save () {
      const { authorId, title, content } = this.model.getData()
      this.$apollo.mutate({
        mutation: ADD_POST,
        variables: {
          authorId,
          title,
          content
        }
      }).then(response => {
        this.model.clear()
        this.$router.replace('/blog')
      })
    }
  },
  apollo: {
    authors: {
      query: FETCH_AUTHORS
    }
  }
}
</script>

<style scoped>

</style>
