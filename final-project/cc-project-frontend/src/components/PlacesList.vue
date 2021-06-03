<template>
  <div class="template places-list">
    <div class="wrapper">
      <place
          v-for="place in entities"
          :key="place.id"
          :entity="place"
          class="place"
      ></place>
    </div>
  </div>
</template>

<script>
import Place from "@/components/Place";
export default {
  components: {Place},

  props: {
    entities: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
  .places-list {
    .wrapper {
      display: flex;
      flex-wrap: wrap;
      background: #e0e0e0;
      margin-bottom: 4rem;
      padding: 2rem;
      box-shadow: 0 0 4px #c1c1c1;

      .place {
        flex: 33%;
        width: 33%;
        max-width: 33%;
        margin-bottom: 2rem;
      }
    }
  }
</style>
