<template>
  <div class="template dropdown">
    <ul class="list">
      <li v-for="(item, index) in items" :key="index" class="list-item">
        <a href="#" @click.prevent="$emit('selected', item)">{{item}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
  .dropdown {
    position: absolute;
    background: #121111;
    min-width: 20rem;
    top: 2.5rem;
    box-shadow: 0 0 4px #000000;

    .list {
      .list-item {
        a {
          color: #1e408b;
          padding: .6rem 1rem;
          display: block;
          color: #ffffff;

          &:hover {
            background: #1e408b;
            color: #ffffff;
          }
        }
      }
    }
  }
</style>
