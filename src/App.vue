<template>
  <div id="app">
    <div class="container-fluid">
      <Nav/>
    </div>
    <router-view/>
  </div>

</template>
<script>
import Nav from './components/Nav.vue';

export default {
  components: {
    Nav,
  },
};
</script>
<style>
  @import "~bootstrap/dist/css/bootstrap.css";
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
#app .container-fluid{
  background-color: #17a2b8 !important;
}
</style>
