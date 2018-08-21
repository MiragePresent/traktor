<template>
    <v-card>
        <v-card-title primary-title>
            <div>
                <h3 class="headline mb-0">{{ post.title }}</h3>
                <div>{{ post.preview }}</div>
            </div>
        </v-card-title>

        <v-card-actions>
            <v-btn
                    flat
                    color="grey"
                    :disabled="true"
            >
                {{ post.author.name }}
            </v-btn>
            <v-btn flat color="orange">Read more</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
  props: [ 'post' ]
}
</script>
