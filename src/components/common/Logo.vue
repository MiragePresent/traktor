<template>
    <v-layout>
        <router-link
            class="logo-link"
            title="Home page"
            :to="{ name: 'home' }"
        >
            <img
                class="logo-img"
                src="../../assets/tractor.png"
            />
        </router-link>
    </v-layout>
</template>

<script>
export default {
}
</script>

<style lang="css">
    .logo-link {
        position: relative;
        top: -13px;
    }
    .logo-img {
        max-width: 56px;
    }
</style>
