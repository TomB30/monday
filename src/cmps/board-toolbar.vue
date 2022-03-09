<template>
  <section class="board-toolbar">
    <button class="new-item-btn" @click="addTask">
      <span>New Item</span>
      <i class="icon-down-arrow" />
    </button>
    <div class="input-container">
      <i class="icon-search" />
      <input type="text" placeholder="Search" v-model="filterBy.txt" @input="setFilter"/>
    </div>
    <div>
      <div class="icon-container">
        <i class="icon-member" />
      </div>
      <span>Person</span>
    </div>
    <div>
      <div class="icon-container">
        <i class="icon-filter" />
      </div>
      <span class="filter">Filter</span>
      <div class="icon-container">
        <i class="icon-down-arrow" />
      </div>
    </div>
    <div>
      <div class="icon-container">
        <i class="icon-sort" />
      </div>
      <span>Sort</span>
    </div>
    <div>
      <div class="icon-container">
        <i class="icon-pin" />
      </div>
    </div>
    <div class="icon-container">
      <i class="icon-eye-lined" />
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      filterBy: {
        txt: "",
        members: [],
      },
    };
  },
  methods: {
    openModal(modalType) {
      console.log(modalType);
    },
    addTask() {
      this.$emit('addTask');
    },
    setFilter(){
      this.$emit('setFilter',{...this.filterBy})
    }
  },
};
</script>
