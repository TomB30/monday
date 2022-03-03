<template>
  <section class="board-toolbar">
    <button class="new-item-btn" @click="addTask">
      <span>New Item</span>
      <i class="icon-down-arrow" />
    </button>
    <div v-for="icon in icons" :key="icon.txt" @click="openModal(icon.type)">
      <div class="icon-container">
        <i :class="icon.class" />
      </div>
      <span v-if="icon.txt" :class="{filter:icon.addOn}">{{ icon.txt }}</span>
      <div class="icon-container" v-if="icon.addOn">
        <i :class="icon.addOn" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      icons: [
        { class: "icon-search", txt: "Search", type:'search'},
        { class: "icon-member", txt: "Person", type:'members'},
        { class: "icon-filter", txt: "Filter", addOn: "icon-down-arrow", type:'filter'},
        { class: "icon-sort", txt: "Sort", type:'sort'},
        { class: "icon-pin", type:'pin'},
        { class: "icon-eye-lined", type:'hidden'},
      ],
    };
  },
  methods:{
    openModal(modalType){
      console.log(modalType);
    },
    addTask(){
      this.$emit('addTask')
    }
  }
};
</script>
