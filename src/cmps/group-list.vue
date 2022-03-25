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
        v-for="group in groups"
        :group="group"
        :groups="groups"
        :cmpsOrder="board.cmpsOrder"
        :key="group.id"
        :ref="'group' + group.id"
        @updateGroup="updateGroup"
        @updateGroups="updateGroups"
        @openModal="openModal($event, group)"
        @saveCmpsOrder="saveCmpsOrder"
      ></group-preview>
    </draggable>
    <div class="add-group" @click="addGroup" :style="{ color: newGroup.color }">
      <h2>+ Add new group</h2>
    </div>
    <!-- <group-modal
      v-if="selectedGroup && groupModalPos"
      :pos="modal.pos"
      :group="selectedGroup"
      :colors="board.colors"
      @addGroup="addGroup"
      @openModal="openModal"
      @removeGroup="removeGroup"
      @renameGroup="focusGroupTitle"
    ></group-modal>
    <column-modal
      :pos="modal.pos"
      :cmpsOrder="board.cmpsOrder"
      @saveCmpsOrder="saveCmpsOrder"
    ></column-modal> -->
    <component
      v-if="modal"
      :is="modal.type"
      :pos="modal.pos"
      :group="selectedGroup"
      :color="board.colors"
      @addGroup="addGroup"
      @openModal="openModal"
      @removeGroup="removeGroup"
      @renameGroup="focusGroupTitle"
      :cmpsOrder="board.cmpsOrder"
      @saveCmpsOrder="saveCmpsOrder"
    ></component>
  </section>
</template>

<script>
import { boardService } from "../services/board-service";
import { utilService } from "../services/util-service";
import groupPreview from "./group-preview.vue";
import groupModal from "./modals/group-modal.vue";
import columnModal from "./modals/column-modal.vue";
import draggable from "vuedraggable";

export default {
  props: {
    board: Object,
    groups: Array,
  },
  data() {
    return {
      newGroup: null,
      selectedGroup: null,
      // groupModalPos: null,
      modal: null,
      groupsToEdit: null,
      isEditingColumn: null,
    };
  },
  methods: {
    focusGroupTitle(id) {
      this.$refs["group" + id][0].$refs.groupTitle.focus();
    },
    removeGroup() {
      this.groupsToEdit = this.groupsToEdit.filter(
        (group) => group.id !== this.selectedGroup.id
      );
      this.selectedGroup = null;
      this.updateGroups();
    },
    addGroup(group) {
      let groupToAdd;
      if (group?.color) {
        groupToAdd = JSON.parse(JSON.stringify(group));
        groupToAdd.id = utilService.makeId();
        groupToAdd.title += " (Copy)";
      } else {
        groupToAdd = JSON.parse(JSON.stringify({ ...this.newGroup }));
      }
      groupToAdd.createdAt = Date.now();
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
      const randomIdx = utilService.getRandomInt(0, this.board.colors.length-1);
      const color = this.board.colors[randomIdx];
      const group = boardService.getEmptyGroup();
      this.newGroup = { ...group, color };
    },
    openModal(payload, group) {
      if (!payload) {
        this.selectedGroup = null;
        this.modal = null;
        return;
      }
      const { ev, type } = payload;
      this.selectedGroup = group;
      this.modal = {};
      const { x, y, height } = ev.target.getBoundingClientRect();
      this.modal.pos = { x, y: y + height + 10 };
      this.modal.type = type;
    },
    toggleColumnModal(ev) {
      if (!isEditingColumn) isEditingColumn = ev;
      else isEditingColumn = null;
    },
    saveCmpsOrder(cmpsOrder) {
      this.$emit("updateBoard", "cmpsOrder", cmpsOrder);
    },
    updateGroups() {
      console.log('updateGroups', this.groupsToEdit);
      this.$emit("updateBoard", "groups", this.groupsToEdit);
    },
  },
  created() {
    this.prepareNewGroup();
  },
  components: {
    groupPreview,
    groupModal,
    draggable,
    columnModal,
  },
  watch: {
    board: {
      handler(newVal) {
        this.groupsToEdit = JSON.parse(JSON.stringify(newVal.groups));
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>