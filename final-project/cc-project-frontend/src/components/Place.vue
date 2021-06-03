<template>
  <div class="template">
    <div class="wrapper">
      <div class="content">
        <img src="/images/placeholder.png" class="image" alt="Image"/>

        <p class="name">{{ entity.name }}</p>

        <p v-if="entity.address" class="description">{{ entity.address.slice(0, 110) }}..</p>
      </div>

      <div class="action-button-wrapper">
        <a
            v-if="placeInWishlist(entity.id)"
            class="btn-action btn-add-itinerary btn-add-wishlist"
            @click.prevent="removeFromWishlist(entity.id)"
        >
          Remove from wishlist
        </a>

        <a
            v-else
            class="btn-action btn-add-itinerary btn-add-wishlist"
            @click.prevent="addToWishlist(entity.id)"
        >
          Save to wishlist
        </a>

        <a
            v-if="placeInItinerary(entity.id)"
            class="btn-action btn-add-itinerary"
            @click.prevent="removeFromItinerary(entity.id)"
        >
          Remove from itinerary
        </a>

        <a
            v-else
            class="btn-action btn-add-itinerary"
            @click.prevent="addToItinerary(entity.id)"
        >
          Add to itinerary
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  props: {
    entity: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapGetters(['wishlist', 'itinerary'])
  },

  methods: {
    addToWishlist(placeId) {
      this.$store.commit('addToWishlist', placeId);
    },

    async addToItinerary(placeId) {
      this.$store.dispatch('storeToItinerary', placeId);
    },

    removeFromWishlist(placeId) {
      this.$store.commit('removeFromWishlist', placeId);
    },

    removeFromItinerary(placeId) {
      this.$store.dispatch('deleteFromItinerary', placeId);
    },

    placeInWishlist(placeId) {
      return this.wishlist.findIndex(e => e === placeId) >= 0;
    },

    placeInItinerary(placeId) {
      return this.itinerary.findIndex(e => e === placeId) >= 0;
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
  height: 100%;

  .content {
    margin-bottom: 1rem;

    .name {
      font-weight: 700;
      color: #727272;
    }

    .image {
      width: 100%;
      border-radius: 5px;
      display: block;
      margin-bottom: .6rem;
      height: 240px;
      max-height: 240px;
      background: #c6c6c6;
      object-fit: cover;
    }
  }

  .action-button-wrapper {
    min-width: 100%;
  }

  .btn-add-itinerary {
    background: #d5d5d5;
    padding: .2rem 1rem;
    margin-bottom: .4rem;
    box-shadow: 0 0 4px #bfbebe;

    &:hover {
      cursor: pointer;
      background: #2353bf;
      color: #ffffff;
    }
  }

  .btn-add-wishlist {
    color: #cb5918;

    &:hover {
      background: #cb5918;
      color: #ffffff;
    }
  }
}
</style>
