<template>
  <div class="container mb-2">
    <div>
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand>
          <router-link to="/"><img src="../assets/logo.png" height="25" alt="logo"></router-link>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item>
              <router-link class="nav-link" to="/about">About</router-link>
            </b-nav-item>
            <b-nav-item>
            <router-link class="nav-link" to="/flickr" v-if="currentUser.type>0">Search-Images
            </router-link>
            </b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item>
              <router-link to="/" class="nav-link" v-if="currentUser.type > 0">
                Hi {{currentUser.name}}</router-link>
            </b-nav-item>
            <b-nav-item v-if="currentUser.type == 0" v-b-modal.loginModal>
              <router-link to="/" class="nav-link">Login</router-link>
            </b-nav-item>
            <b-nav-item v-if="currentUser.type > 0" @click="userLoggedOut">
              <router-link to="/" class="nav-link">Logout</router-link>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <b-modal id="loginModal" size="md" title="Login" hide-footer>
      <template>
        <p class="errMsg">{{errMsg}}</p>
        <form novalidate>
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" class="form-control" id="username" v-model="username"
                   autocomplete="off">
          </div>
          <div class="form-group">
            <label for="psword">Password</label>
            <input :type="passwordType" class="form-control" id="psword" v-model="psword"
                   autocomplete="off">
          </div>
          <div class="form-group form-check">
            <input type="checkbox" class="form-check-input" id="seeCh" v-model="showPassword"
                   @change="seePassword">
            <label class="form-check-label" for="seeCh">See password</label>
          </div>
          <button type="submit" class="btn btn-primary" @click.prevent="findUser">Login</button>
        </form>
      </template>
    </b-modal>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Nav',
  data() {
    return {
      username: '',
      psword: '',
      errMsg: '',
      showPassword: false,
      passwordType: 'password',
    };
  },
  computed: mapGetters(['currentUser']),
  methods: {
    ...mapActions(['logIn', 'logOut']),
    seePassword() {
      if (this.showPassword) {
        this.passwordType = 'text';
      } else {
        this.passwordType = 'password';
      }
    },
    findUser() {
      if (this.username === 'a' && this.psword === 'a') {
        this.logIn({ id: '1', name: this.username, type: 1 });
        this.$bvModal.hide('loginModal');
      } else {
        this.errMsg = 'Username or Password is not correct!';
      }
    },
    userLoggedOut() {
      this.logOut();
    },
  },
};
</script>

<style scoped>
  .errMsg{
    color: red;
  }
  a{
    cursor: pointer;
  }
</style>
