<template>
  <div class="page browse-page">
    <div class="container">
      <div class="wrapper">
        <h1>Register</h1>

        <div>
          <form @submit.prevent="pressed">

            <div class="col-md-6 offset-md-3">

              <div class="form-group">
                <input type="email" class="form-control" placeholder="Insert your email here" v-model="email">
              </div>

              <div class="password form-group">
                <input type="password" class="form-control" placeholder="password" v-model="password">
              </div>

              <button class="mt-2 btn btn-primary" type="submit">Register</button>

            </div>

            <div v-if="error" id="error" class="error">{{ error.message }}</div>
            <p> Already have an account?
              <router-link to="/register">Login</router-link>
              here!
            </p>
          </form>
        </div>


      </div>
    </div>

  </div>
</template>


<script>
import {firebase} from '@firebase/app'
import '@firebase/auth'

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      error: '',
    }
  },
  mounted() {
  },

  methods: {
    async pressed() {
      try {
        await firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        this.$router.replace({name: "secret"});
        localStorage.set('user', 'email')
        localStorage.set('password', 'password')

      } catch (error) {
        console.log(error)
      }

    }
  }
}
</script>

<style lang="scss" scoped>
.browser-page {

}
</style>
