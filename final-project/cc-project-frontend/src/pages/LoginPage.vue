<template>
  <div class="page login-page">
    <div class="container">
      <div class="wrapper">
        <h1 v-if="!loggedIn" class="title">Login into your account</h1>

        <div v-if="!loggedIn">
          <form @submit.prevent="pressed">
            <div class="col-md-6 offset-md-3">
              <div class="login form-group">
                <input type="email" class="form-control" placeholder="login" v-model="email">
              </div>

              <div class="password form-group">
                <input type="password" class="form-control" placeholder="password" v-model="password">
              </div>

              <div class="d-flex bottom-actions">
                <button class="mt-2 btn-action" type="submit">Login</button>
                <div v-if="error" id="error" class="error">{{ error }}</div>
              </div>
            </div>
          </form>
        </div>

        <div v-else>
          <h1 class="info">You are already logged in</h1>
        </div>

      </div>
    </div>

  </div>
</template>


<script>
import {firebase} from '@firebase/app'
import '@firebase/auth'
import {mapGetters} from "vuex";

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      error: '',
      loggedIn: false
    }
  },

  computed: {
    ...mapGetters(['user'])
  },

  created() {
    if (this.user) {
      this.$router.replace({path: '/'});
    }
  },

  methods: {
    async pressed() {
      this.error = '';

      if (!this.email || !this.password) {
        this.error = 'All fields are required';
        return false;
      }

      try {
        await firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          .then(r => {
            console.log('RES', r);
            localStorage.setItem('user', JSON.stringify({
              id: r.user.uid,
              email: r.user.email
            }));

            this.$router.replace({path: '/'});
            window.location.href = '';
          })
          .catch((e) => {
            console.log('ERR', e);
            this.error = 'Invalid email or password';
          })

      } catch (error) {
        console.log(error)
      }

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .login-page {
    padding: 2rem 0;
  }

  .title {
    font-size: 1.4rem;
    margin-bottom: 2rem;
  }

  .info {
    font-size: 1.6rem;
  }

  .btn-action {
    padding: .2rem 1rem;
    border: 1px solid #2353bf;
    background: #2353bf;
    color: #fff;

    &:hover {
      cursor: pointer;
      background: #cb5918;
      border-color: #cb5918;
    }
  }

  #error {
    color: crimson;
  }

  .bottom-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
