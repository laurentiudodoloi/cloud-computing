<template>
  <div class="app">
    <navbar></navbar>

    <searchbar
        v-if="isHomePage"
        :class="{'active w3-animate-top': isHomePage}"
        @search="fetchPlaces($event)"
    ></searchbar>

    <router-view v-if="$route.name === 'browse'" :places="computedPlaces" :loading="loading"></router-view>
    <router-view v-else></router-view>
  </div>
</template>

<script>
import axios from 'axios';
import Searchbar from "@/components/Searchbar";
import Navbar from "@/components/Navbar";

export default {
  components: {Navbar, Searchbar},

  props: {
    //
  },

  computed: {
    isHomePage () {
      return this.$route.name === 'browse';
    },

    computedPlaces () {
      return this.places
    }
  },

  data () {
    return {
      loading: false,
      places: [],
      API_URL: '//127.0.0.1:8081'
    }
  },

  created() {
    this.fetchPlaces();
    this.fetchItinerary();
  },

  methods: {
    async fetchItinerary () {
      await axios
          .get(`${this.API_URL}/cart?user_id=1`)
          .then(r => {
            const entity = r.data.entity;

            if (entity && entity.places) {
              entity.places.forEach(e => {
                this.$store.commit('addToItinerary', e);
              })
            }
          })
          .catch(() => {
            //
          })
    },

    async fetchPlaces (text = '') {
      this.loading = true;

      const query = `placename=${text ? text : 'a'}`;

      await axios
          .get(`${this.API_URL}/places?${query}`)
          .then(r => {
            this.places = r.data.entities;
          })
          .catch(e => {
            console.error('ERROR', e);
          })

      this.loading = false;
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
