<template>
  <div class="template searchbar">
    <div class="container box">
      <div class="d-flex flexbox">
        <div class="dropdown-box">
          <input :value="searchQuery" type="text" class="input-text input-browse" placeholder="Browse places, cities.." @input="onTyping($event)">

          <dropdown v-if="searchResults" :items="searchResults" @selected="onSelectItem($event)"></dropdown>
        </div>
      </div>

      <a class="btn-action" @click.prevent="search"><i class="fa fa-search"></i> search</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Dropdown from "@/components/Dropdown";

export default {
  components: {Dropdown},
  props: {
    //
  },

  data () {
    return {
      searchResults: [],
      searchQuery: ''
    }
  },

  methods: {
    onSelectItem (text) {
      this.searchQuery = text;
      this.searchResults = [];
    },

    search() {
      this.searchResults = [];

      if (this.searchQuery) {
        this.$emit('search', this.searchQuery)
      }
    },

    async onTyping(event) {
      if (!event.target.value) {
        return false;
      }
      this.searchQuery = event.target.value;

      await axios
        .get(`//127.0.0.1:8081/places/autocomplete?input=${this.searchQuery}`)
        .then(r => {
          this.searchResults = r.data.entities;
        })
        .catch(e => {
          console.error('ERROR', e);
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  @keyframes ease-in-out-animation {
    0% {
      height: 0;
    }
    100% {
      height: auto;
    }
  }

  .dropdown-box {
    position: relative;
  }

  .searchbar {
    background: #121111;
    padding: 0.6rem 0;
    height: 0;

    &.active {
      height: auto;
      transition: ease-in-out-animation .2s linear;
    }
  }

  .input-browse {
    min-width: 32rem;
    padding: .2rem 1rem;
    background: #313131;
    border: none;
    box-shadow: 0 0 4px #000;
    color: #afafaf;
    margin-right: 1rem;
  }

  .input-date {
    margin-right: 1rem;

    &:last-child {
      margin-right: 0;
    }
  }

  .btn-action {
    color: #1e408b;

    &:hover {
      color: #2353bf;
    }
  }

  .box {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
