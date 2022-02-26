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
          <div class="group-title-input" contenteditable @blur="updateTitle">
            {{ group.title }}
          </div>
        </div>
        <div
          v-for="(cmp, idx) in cmpsOrderToEdit"
          :style="{ 'min-width': cmp.width + 'px' }"
          :key="cmp.type"
          class="cmp-title"
        >
          <img
            class="drag-handle"
            src="@/assets/icons/drag-handle.png"
            alt=""
          />
          {{ cmp.type.split("-")[0] }}
          <div
            class="resize-border"
            @mousedown="setResizing($event, idx)"
            @mouseup="setResizing"
          ></div>
        </div>
        <div class="add-column-btn">
          <i class="icon-plus-big"></i>
        </div>
      </div>
      <div class="task-list">
        <task-preview
          v-for="task in group.tasks"
          :groupColor="group.color"
          :cmpsOrder="cmpsOrder"
          :task="task"
          :key="task.id"
          @updateTask="updateTask"
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
          /><button ref="btn" class="add-task-btn" @click="addTask">Add</button>
          <div class="right-border"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { boardService } from "../services/board-service";
import taskPreview from "./task-preview.vue";

export default {
  props: {
    group: Object,
    cmpsOrder: Array,
  },
  data() {
    return {
      groupToEdit: null,
      taskTitle: "",
      resizePos: null,
      resizeIdx: null,
      cmpsOrderToEdit: JSON.parse(JSON.stringify(this.cmpsOrder)),
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
      const groupTitle = ev.target.innerText;
      this.groupToEdit.title = groupTitle;
      this.updateGroup();
    },
    updateGroup() {
      this.$emit("updateGroup", JSON.parse(JSON.stringify(this.groupToEdit)));
    },
    openModal(ev) {
      this.$emit("openModal", ev);
    },
    updateTask(task) {
      this.groupToEdit.tasks = this.groupToEdit.tasks.map((t) =>
        t.id === task.id ? task : t
      );
      this.updateGroup();
    },
    setResizing({ type, x, offsetX }, idx) {
      console.log("hey", type, x);
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
      this.saveCmpsOrder();
    },
    saveCmpsOrder() {
      this.$emit(
        "saveCmpsOrder",
        JSON.parse(JSON.stringify(this.cmpsOrderToEdit))
      );
    },
  },
  computed: {
    buttonStyle(ev) {
      return { color: "white", "background-color": this.group.color };
    },
  },
  components: {
    taskPreview,
  },
  created() {
    this.groupToEdit = JSON.parse(JSON.stringify(this.group));
  },
  watch: {
    cmpsOrder: function (newVal, oldVal) {
      this.cmpsOrderToEdit = JSON.parse(JSON.stringify(newVal));
    },
  },
};
</script>