<template>
  <section class="group-list">
    <draggable
      handle=".drag-handle"
      group="groups"
      v-model="groupsToEdit"
      @end="updateGroups"
      animation="400"
    >
        <group-preview
          v-for="group in board.groups"
          :group="group"
          :cmpsOrder="board.cmpsOrder"
          :key="group.id"
          @updateGroup="updateGroup"
          @openModal="openModal($event, group)"
          @saveCmpsOrder="saveCmpsOrder"
        ></group-preview>
    </draggable>
    <div class="add-group" @click="addGroup" :style="{ color: newGroup.color }">
      <h2>+ Add new group</h2>
    </div>
    <group-modal
      v-if="selectedGroup && groupModalPos"
      :pos="groupModalPos"
      :group="selectedGroup"
      @addGroup="addGroup"
      @openModal="openModal"
    ></group-modal>
  </section>
</template>

<script>
import { boardService } from "../services/board-service";
import { utilService } from "../services/util-service";
import groupPreview from "./group-preview.vue";
import groupModal from "./modals/group-modal.vue";
import draggable from "vuedraggable";

export default {
  props: {
    board: Object,
  },
  data() {
    return {
      newGroup: null,
      selectedGroup: null,
      groupModalPos: null,
      groupsToEdit: null,
    };
  },
  methods: {
    addGroup() {
      const groupToAdd = JSON.parse(
        JSON.stringify({ ...this.newGroup, createdAt: Date.now() })
      );
      this.groupsToEdit.push(groupToAdd);
      this.updateGroups();
      this.prepareNewGroup();
    },
    updateGroup(updatedGroup) {
      const idx = this.groupsToEdit.findIndex(
        (group) => group.id === updatedGroup.id
      );
      this.groupsToEdit.splice(idx, 1, updatedGroup);
      this.updateGroups();
    },
    prepareNewGroup() {
      const randomIdx = utilService.getRandomInt(0, this.board.colors.length);
      const color = this.board.colors[randomIdx];
      const group = boardService.getEmptyGroup();
      console.log("group.id:", group.id);
      this.newGroup = { ...group, color };
    },
    openModal(ev, group) {
      if (!group || (this.selectedGroup && this.selectedGroup.id === group.id))
        this.selectedGroup = null;
      else {
        this.selectedGroup = group;
        const { x, y, height } = ev.target.getBoundingClientRect();
        this.groupModalPos = { x, y: y + height + 10 };
      }
    },
    saveCmpsOrder(cmpsOrder) {
      this.$emit("updateBoard", "cmpsOrder", cmpsOrder);
    },
    updateGroups() {
      this.$emit(
        "updateBoard",
        "groups",
        this.groupsToEdit
      );
    },
  },
  created() {
    this.prepareNewGroup();
  },
  components: {
    groupPreview,
    groupModal,
    draggable,
  },
  watch: {
    board: {
      handler(newVal) {
        console.log("changed");
        this.groupsToEdit = JSON.parse(JSON.stringify(newVal.groups));
      },
      immediate: true,
      deep: true,
    },
  },
  // directives: {
  //   "click-outside": {
  //     bind: function (el, binding, vnode) {
  //       el.clickOutsideEvent = function (event) {
  //         // here I check that click was outside the el and his children
  //         if (!(el == event.target || el.contains(event.target))) {
  //           // and if it did, call method provided in attribute value
  //           vnode.context[binding.expression](event);
  //         }
  //       };
  //       document.body.addEventListener("click", el.clickOutsideEvent);
  //     },
  //     unbind: function (el) {
  //       document.body.removeEventListener("click", el.clickOutsideEvent);
  //     },
  //   },
  // },
};
</script>