<template>
  <div>
    <h1>HOME</h1>
    <h2>Content visible for all visitors</h2>
    <h2 v-if="currentUser.type > 0">Content visible only to loggedIn members</h2>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  computed: mapGetters(['currentUser']),
};
</script>

<style scoped>

</style>
