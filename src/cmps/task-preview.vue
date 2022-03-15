<template>
  <div class="task-preview">
    <!-- <div class="task-options" >
      <i class="icon-down-arrow"></i>
    </div> -->
    <div class="task-title" @click.self="setParams">
      <div
        :style="{ 'background-color': groupColor }"
        class="left-border"
      ></div>
      <span
        contenteditable
        @blur="setVal('title', $event.target.innerText)"
        @keydown.enter.prevent="$event.target.blur()"
        >{{ task.title }}</span
      >
    </div>
    <div class="info-container">
      <div
        v-for="cmp in cmpsOrder"
        :key="cmp.type"
        :style="{ 'min-width': cmp.minWidth + 'px', width: cmp.width + 'px' }"
        class="task-info"
        @click="openModal($event, cmp.type)"
      >
        <component
          :is="cmp.type"
          :task="task"
          :color="groupColor"
          @setVal="setVal"
        ></component>
      </div>
    </div>
    <div class="task-info task-end"></div>
  </div>
</template>

<script>
import memberPicker from "./columns/member-picker.vue";
import datePicker from "./columns/date-picker.vue";
import statusPicker from "./columns/status-picker.vue";
import timelinePicker from "./columns/timeline-picker.vue";

export default {
  props: {
    task: Object,
    cmpsOrder: Array,
    groupColor: String,
  },
  data() {
    return {};
  },
  methods: {
    setParams() {
      this.$emit("setParams", this.task.id);
    },
    updateTask(updatedTask) {
      this.$emit("updateTask", updatedTask);
    },
    openModal(ev, type) {
      if (type === "timeline-picker" || type === "date-picker") return;
      const { x, y, height } = ev.target.getBoundingClientRect();
      const pos = { x, y: y + height + 5 };
      const modal = {
        type: type.split("-")[0] + "-modal",
        pos,
        info: {
          task: this.task,
        },
      };
      this.$emit("setModal", modal);
    },
    setVal(key, val) {
      const taskCopy = JSON.parse(JSON.stringify({ ...this.task, [key]: val }));
      this.updateTask(taskCopy);
    },
  },
  components: {
    memberPicker,
    statusPicker,
    datePicker,
    timelinePicker,
  },
};
</script>