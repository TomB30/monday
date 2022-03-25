<template>
  <section class="task-details" v-close="closeDetails" v-if="task">
    <i class="icon-x" @click="closeDetails"></i>
    <header>
      <h2>{{ task.title }}</h2>
      <nav>
        <div>Updates</div>
        <div>Files</div>
        <div>Activity Log</div>
      </nav>
    </header>
    <div class="updates-container">
      <input type="text" placeholder="Write an update..." />
      <div class="no-updates">
        <img src="@/assets/svg-icons/no-updates.svg" alt="" />
        <h2>No updates yet for this item</h2>
        <p>
          Be the first one to update about progress, mention someone or upload
          files to share with your team members
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      task: null,
    };
  },
  methods: {
    closeDetails(){
      this.$router.push('/workspace')
    },
    setTask() {
      this.$store.commit({
        type: "setTask",
        groupId: this.groupId,
        taskId: this.taskId,
      });
    },
  },
  computed: {
    taskId() {
      return this.$route.params.taskId;
    },
    groupId() {
      return this.$route.params.groupId;
    },
  },
  watch: {
    "$route.params.taskId": {
      handler(newVal) {
        if (!newVal) return;
        this.setTask();
      },
      immediate: true,
      deep: true,
    },
    "$store.getters.currTask": {
      handler(newVal) {
        console.log("newVal:", newVal);
        this.task = newVal;
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>