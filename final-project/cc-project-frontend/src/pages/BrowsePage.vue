<template>
  <div class="page browse-page">
    <div class="container">
      <h5 v-if="loading" class="text-center loading">Loading..</h5>

      <div v-else class="wrapper">
        <places-list :entities="places"></places-list>
      </div>
    </div>
  </div>
</template>

<script>
import PlacesList from "@/components/PlacesList";

export default {
  components: {PlacesList},

  props: {
    loading: {
      type: Boolean,
      default: false
    },

    places: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
  .browser-page {

  }

  .loading {
    color: #525252;
    padding: 1rem 0;
  }
</style>
