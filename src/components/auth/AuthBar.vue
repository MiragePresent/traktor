<template>
    <v-layout class="auth-links">
        <router-link
            class="title"
            title="Sing in"
            :to="{name: 'login'}"
        >
            Sing in
        </router-link>
    </v-layout>
</template>

<script>
export default {
}
</script>

<style lang="css">
    .auth-links {
        padding: 5px 0;
    }
</style>
