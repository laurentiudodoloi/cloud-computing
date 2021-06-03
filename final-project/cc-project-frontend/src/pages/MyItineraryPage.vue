<template>
  <div class="page my-itinerary">
    <div class="container">
      <div class="wrapper">
        <div class="top-actions">
          <p class="title">My itinerary</p>

          <router-link to="/checkout" class="btn-action btn-checkout">> Checkout</router-link>
        </div>

        <section v-for="(trip, index) in trips" :key="index" class="place-block">
          <div class="left">
            <p class="place-name">{{trip.name}}</p>
            <p class="place-name place-address">{{trip.address}}</p>

            <p v-if="trip.opening_hours" class="title">Schedule</p>
            <p v-for="(hour, hourIndex) in trip.opening_hours" :key="hourIndex" class="date">{{hour}}</p>
          </div>

          <div class="actions">
            <a class="btn-action btn-remove" @click.prevent="onRemove(trip.id)">Remove</a>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from "axios";

export default {
  props: {
    //
  },

  watch: {
    'itinerary' () {
      this.fetchCurrentItinerary()
    }
  },

  computed: {
    ...mapGetters(['itinerary'])
  },

  data () {
    return {
      trips: []
    }
  },

  created() {
    this.fetchCurrentItinerary()
  },

  methods: {
    async onRemove (id) {
      await this.$store.dispatch('deleteFromItinerary', id)
      await this.fetchCurrentItinerary()

      const index = this.trips.findIndex(e => e === id);
      if (index >= 0) {
        this.trips.splice(index);
      }
    },

    async fetchCurrentItinerary () {
      this.trips = [];

      for (const e of this.itinerary) {
        await axios
            .get(`//127.0.0.1:8081/places/details/?id=${e}`)
            .then(r => {
              if (r.data.entity) {
                this.trips.push(r.data.entity);
              }
            })
            .catch(e => {
              console.error('ERROR', e);
            })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .my-itinerary {
    .title {
      font-size: 1rem;
      font-weight: 500;
      padding: 1rem 0;
    }

    .wrapper {
      padding: 2rem 0;
    }

    .top-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;

      .title {
        font-size: 1.2rem;
        text-transform: uppercase;
        color: #8c8c8c;
        letter-spacing: .1rem;
      }
    }

    .btn-checkout {
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

    .place-block {
      box-shadow: 0 0 4px #ddd;
      font-weight: 100;
      text-transform: uppercase;
      color: #101010;
      padding: 4rem 6rem;
      display: flex;
      justify-content: space-between;
      background: #ffffff;
      margin-bottom: 2rem;

      .place-name {
        color: #2353bf;
        font-size: 1.2rem;
      }

      .place-address {
        color: #7f7f7f;
        font-size: .9rem;
      }

      .date {
        font-size: 1rem;
        color: #2353bf;
      }

      .price {
        color: #cb5918;
        font-size: 1.6rem;
        font-weight: 600;
      }
    }

    .actions {
      .btn-remove {
        color: #a05050;

        &:hover {
          color: #ca1111;
        }
      }
    }
  }
</style>
