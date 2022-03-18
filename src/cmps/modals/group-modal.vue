<template>
  <section
    class="group-modal modal"
    :style="{ top: openPos.y + 'px', left: openPos.x + 'px' }"
    v-close="closeModal"
  >
    <section class="modal-section">
      <div class="modal-item development">
        <img src="@/assets/icons/collapse-group.png" alt="" /><span
          >Collapse this group</span
        >
      </div>
      <div class="modal-item development">
        <img src="@/assets/icons/collapse-group.png" alt="" /><span
          >Collapse all groups</span
        >
      </div>
    </section>
    <section class="modal-section">
      <div class="modal-item" @click="addGroup">
        <i class="icon-plus-big"></i><span>Add group</span>
      </div>
      <div class="modal-item" @click="duplicateGroup">
        <i class="icon-duplicate"></i><span>Duplicate this group</span>
      </div>
    </section>
    <section class="modal-section">
      <div class="modal-item" @click="renameGroup">
        <i class="icon-pencil"></i><span>Rename group</span>
      </div>
      <div class="modal-item development">
          <i class="icon-circle" :style="{ color: group.color }"></i>
          <span>Change group color</span>
      </div>
      <div class="modal-item development">
        <i class="icon-excel"></i><span>Export to excel</span>
      </div>
    </section>
    <section class="modal-section">
      <div class="modal-item" @click="removeGroup">
        <i class="icon-delete"></i><span>Delete</span>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  props: {
    group: Object,
    pos: Object,
    colors: Array,
  },
  methods: {
    addGroup() {
      this.$emit("addGroup");
      this.closeModal()
    },
    closeModal() {
      this.$emit("openModal",null);
    },
    removeGroup() {
      this.$emit("removeGroup");
      this.closeModal()
    },
    duplicateGroup() {
      this.$emit("addGroup", this.group);
      this.closeModal()
    },
    renameGroup() {
      this.$emit("renameGroup", this.group.id);
      this.closeModal()
    },
  },
  computed: {
    openPos() {
      if (this.pos.y + 388 < window.innerHeight) return this.pos;
      const diff = this.pos.y + 388 - innerHeight;
      const newPos = { x: this.pos.x, y: this.pos.y - 388 - 35 };
      return newPos;
    },
  },
};
</script>