<template>
  <section class="group-preview">
    <div class="arrow-btn" :style="buttonStyle" @click="openModal"></div>
    <div class="group-table">
      <div class="titles">
        <div class="group-title" :style="{ color: group.color }">
          <img
            class="drag-handle"
            src="@/assets/icons/drag-handle.png"
            alt=""
          />
          <div class="group-title-input" contenteditable @blur="updateTitle" @keyup.enter="$event.target.blur()">
            {{ group.title }}
          </div>
        </div>
        <draggable
          v-model="cmpsOrderToEdit"
          handle=".drag-handle"
          @end="saveCmpsOrder"
          class="drag-container"
          ghost-class="ghost"
          drag-class="ghost"
          animation="500"
        >
          <div
            v-for="(cmp, idx) in cmpsOrderToEdit"
            :style="{
              'min-width': cmp.minWidth + 'px',
              width: cmp.width + 'px',
            }"
            :key="cmp.type"
            class="cmp-title"
          >
            <img
              class="drag-handle"
              src="@/assets/icons/drag-handle.png"
              alt=""
            />
            {{ cmp.type.split("-")[0].charAt(0).toUpperCase()+cmp.type.split("-")[0].substr(1) }}
            <div
              class="resize-border"
              @mousedown="setResizing($event, idx)"
              @mouseup="setResizing"
            ></div>
          </div>
        </draggable>
        <div class="add-column-btn">
          <i class="icon-plus-big"></i>
        </div>
      </div>
      <draggable
        class="task-list"
        group="tasks"
        v-model="groupToEdit.tasks"
        @end="updateGroup"
        draggable=".task-preview"
        animation="400"
      >
        <task-preview
          v-for="task in group.tasks"
          :groupColor="group.color"
          :cmpsOrder="cmpsOrder"
          :task="task"
          :key="task.id"
          @updateTask="updateTask"
          @setModal="setModal($event, task)"
        ></task-preview>
        <div class="add-task">
          <div
            class="left-border"
            :style="{ 'background-color': group.color }"
          ></div>
          <input
            type="text"
            placeholder="+ Add Item"
            v-model="taskTitle"
            @keyup.enter="addTask"
          /><button ref="btn" class="add-task-btn" @click="addTask">Add</button>
          <div class="right-border"></div>
        </div>
      </draggable>
    </div>
    <component
      v-if="modal"
      :is="modal.type"
      :pos="modal.pos"
      :task="modal.task"
      @updateTask="updateTask($event,true)"
      @closeModal="setModal"
    ></component>
  </section>
</template>

<script>
import { boardService } from "../services/board-service";
import taskPreview from "./task-preview.vue";
import memberModal from "./modals/member-modal.vue";
import statusModal from "./modals/status-modal.vue";
import draggable from "vuedraggable";

export default {
  props: {
    group: Object,
    cmpsOrder: Array,
  },
  data() {
    return {
      groupToEdit: null,
      cmpsOrderToEdit: null,
      modal: null,
      resizePos: null,
      resizeIdx: null,
      taskTitle: "",
    };
  },
  methods: {
    addTask() {
      const taskToAdd = {
        ...boardService.getEmptyTask(),
        title: this.taskTitle,
        createdAt: Date.now(),
      };
      this.groupToEdit.tasks.push(taskToAdd);
      this.taskTitle = "";
      this.updateGroup();
    },
    updateTitle(ev) {
      if(this.groupToEdit.title === ev.target.innerText) return
      const groupTitle = ev.target.innerText;
      this.groupToEdit.title = groupTitle;
      this.updateGroup();
    },
    updateGroup() {
      this.$emit("updateGroup", this.groupToEdit);
    },
    openModal(ev) {
      this.$emit("openModal", ev);
    },
    updateTask(task,isModal) {
      this.groupToEdit.tasks = this.groupToEdit.tasks.map((t) =>
        t.id === task.id ? task : t
      );
      if(isModal) this.modal.task = task
      this.updateGroup();
    },
    setResizing({ type, x, offsetX }, idx) {
      if (type === "mousedown" && offsetX < 8) {
        this.resizePos = x;
        this.resizeIdx = idx;
        document.addEventListener("mousemove", this.resize);
      } else {
        document.removeEventListener("mousemove", this.resize);
        this.saveCmpsOrder();
      }
    },
    resize({ x }) {
      const dx = this.resizePos - x;
      this.resizePos = x;
      this.cmpsOrderToEdit[this.resizeIdx].width -= dx;
      // this.saveCmpsOrder();
    },
    saveCmpsOrder() {
      this.$emit(
        "saveCmpsOrder",
        this.cmpsOrderToEdit
      );
    },
    setModal(modal, task) {
      if (
        !modal ||
        this.modal &&
        this.modal.task.id === task.id &&
        this.modal.type === modal.type
      ) {
        this.modal = null;
        return;
      }
      modal.task = task;
      this.modal = modal;
    },
  },
  computed: {
    buttonStyle(ev) {
      return { color: "white", "background-color": this.group.color };
    },
  },
  components: {
    taskPreview,
    memberModal,
    statusModal,
    draggable,
  },
  watch: {
    cmpsOrder: {
      handler(newVal, oldVal) {
        this.cmpsOrderToEdit = JSON.parse(JSON.stringify(newVal));
      },
      immediate:true
    },
    group: {
      handler(newVal) {
        this.groupToEdit = JSON.parse(JSON.stringify(this.group));
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>