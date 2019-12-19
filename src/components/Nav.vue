<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <button aria-controls="navbarTogglerDemo03" aria-expanded="false"
              aria-label="Toggle navigation"
              class="navbar-toggler"
              data-target="#navbarTogglerDemo03" data-toggle="collapse"
              type="button">
        <span class="navbar-toggler-icon"></span>
      </button>
      <router-link to="/" class="navbar-brand">
        <img src="../assets/logo.png" height="30">
      </router-link>

      <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item">
            <router-link to="/about" class="navbar-brand">About</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/flickr" class="navbar-brand">Search-Images</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Nav',
};
</script>

<style scoped>

</style>
