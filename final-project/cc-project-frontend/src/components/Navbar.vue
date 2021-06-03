<template>
  <div class="template navbar">
    <div class="container">
      <div class="navbar-wrapper">
        <div class="start">
          <p class="brand">
            <span class="main">Travel-click</span>
            <span class="secondary">Your one-click itinerary</span>
          </p>

          <ul class="nav-list">
            <li class="nav-item special">
              <router-link :class="{'active': $route.path === '/'}" to="/">Browse</router-link>
            </li>
          </ul>
        </div>

        <ul class="nav-list">
          <li
              v-for="(route, index) in routes"
              :key="index"
              class="nav-item"
          >
            <router-link v-if="!route.isForAuth"
                         :to="route.path" :class="{'active': $route.path === route.path}" class="countable">
              {{route.name}}

              <span v-if="route.path === '/itinerary'" class="count">{{ itinerary.length }}</span>
            </router-link>
          </li>

          <li v-if="user" class="nav-item special">
            <a href="#" @click.prevent="logout()">
              Logout
            </a>
          </li>

          <li v-else class="nav-item special">
            <router-link to="/login">
              Login
            </router-link>
          </li>

          <li class="nav-item special">
            <router-link :class="{'active': $route.path === '/wishlist'}" class="heart countable" to="/wishlist">
              <span class="count">{{ wishlist.length }}</span>
              <i class="fa fa-heart"></i>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    //
  },

  computed: {
    ...mapGetters(['wishlist', 'itinerary', 'user'])
  },

  data () {
    return {
      routes: [
        {
          name: 'My itinerary',
          path: '/itinerary'
        },
        {
          name: 'Check-out',
          path: '/checkout'
        },
        {
          name: 'Login',
          path: '/login',
          isForAuth: true
        }
      ]
    }
  },

  methods: {
    logout () {
      localStorage.removeItem('user');
      this.$store.commit('logout');
      this.$router.replace({path: '/login'});
      window.location.href = '';
    }
  }
}
</script>

<style lang="scss" scoped>
  .navbar {
    background: #000000;
    color: #ffffff;
    z-index: 3;

    .navbar-wrapper {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.4rem 0;

      .start {
        display: flex;
        align-items: center;

        .brand {
          margin-right: 4rem;
          color: #cb5918;
          font-size: 1rem;
          text-transform: uppercase;
          font-weight: 100;

          .secondary {
            display: block;
            font-size: .8rem;
            color: #adadad;
            text-transform: none;
          }
        }
      }
    }

    .nav-list {
      .nav-item {
        display: inline-block;
        margin-right: 3rem;

        &:last-child {
          margin-right: 0;
        }

        a {
          display: block;
          color: #949494;
          padding: .4rem;
          text-transform: uppercase;

          &.heart {
            color: #b30c0c;
            font-size: 1.2rem;

            &:hover {
              transform: scale(1.2);
            }
          }

          &:hover {
            color: #ffffff;
          }

          &.active {
            color: #cb5918;
          }

          &.countable {
            position: relative;

            .count {
              position: absolute;
              top: 0;
              right: -12px;
              background: #2e2121;
              border-radius: 50%;
              font-size: .7rem;
              padding: 1px 6px;
              color: #fff;
            }
          }
        }
      }
    }
  }
</style>
