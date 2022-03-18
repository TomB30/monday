<template>
  <section class="board-toolbar">
    <button class="new-item-btn" @click="addTask">
      <span class="btn-span">New Item</span>
    </button>
    <div class="input-container">
      <i class="icon-search" />
      <input
        type="text"
        placeholder="Search"
        v-model="filterBy.txt"
        @input="setFilter"
      />
    </div>
    <div @click="openModal($event, 'member-filter')">
      <div class="icon-container">
        <i class="icon-member" />
      </div>
      <span>Person</span>
    </div>
    <div class="development">
      <div class="icon-container">
        <i class="icon-filter" />
      </div>
      <span class="filter">Filter</span>
    </div>
    <div class="development">
      <div class="icon-container">
        <i class="icon-sort" />
      </div>
      <span>Sort</span>
    </div>
    <component v-if="modal" :is="modal.type" :modal="modal" @openModal="openModal" @memberFilter="memberFilter"></component>
    <!-- <member-filter :modal="modal"></member-filter> -->
  </section> 
</template>

<script>
import memberFilter from './modals/member-filter-modal.vue';

export default {
  data() {
    return {
      filterBy: {
        txt: "",
        members: [],
      },
      modal: null,
    };
  },
  components: {
    memberFilter,
  },
  methods: {
    openModal(ev, type) {
      if(!ev) return this.modal = null
      const { x, y, height } = ev.target.getBoundingClientRect();
      this.modal = {
        pos : { x, y: y + height + 10 },
        type,
      }
    },
    addTask() {
      this.$emit('addTask');
    },
    memberFilter(memberId){
      if(!memberId) this.filterBy.members = []
      else {
        this.filterBy.members = [memberId]
      }
      this.setFilter()
    },
    setFilter() {
      this.$emit('setFilter', { ...this.filterBy });
    },
  },
};
</script>
