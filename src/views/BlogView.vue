<template>
    <v-layout row wrap>
        <v-flex xs8 offset-xs2 v-if="isList">
            <router-link :to="'/blog/create'">Create a post</router-link>
                <blog-post v-bind:post="post" :key="post"/>
        </v-flex>
        <v-flex xs8 offset-xs2 v-else>
            <blog-post-form/>
        </v-flex>
    </v-layout>
</template>

<script>
import BlogPost from '../components/Blog/BlogPost'
import BlogPostForm from '../components/Blog/BlogPostForm'
import { FETCH_POSTS } from '../graphql/shema'

export default {
  data () {
    return {
      posts: []
    }
  },
  computed: {
    isList () {
      return this.$route.name === 'blog'
    }
  },
  apollo: {
    posts: {
      query: FETCH_POSTS,
      variables: {
        limit: 20,
        offset: 0
      }
    }
  },
  components: {
    BlogPost,
    BlogPostForm
  }
}
</script>

<style scoped>

</style>
