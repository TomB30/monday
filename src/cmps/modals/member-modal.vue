<template>
  <section
    ref="member-modal"
    class="member-modal modal"
    :style="{ top: openPos + 'px', left: midPos + 'px' }"
    v-close="closeModal"
  >
    <div class="task-members">
      <div v-for="member in task.members" :key="member._id" class="task-member">
        <avatar :size="20" :username="member.fullname"></avatar>
        <span>{{ member.fullname }}</span>
        <span class="icon-x" @click="toggleMember(member)"></span>
      </div>
    </div>
    <div class="search-input-container">
      <input type="search" placeholder="Search members" v-model="search" />
      <i v-if="!search" class="icon-search"></i>
    </div>
    <div class="member-list">
      <div
        class="member-preview"
        v-for="member in boardMembers"
        :key="member._id"
        @click="toggleMember(member)"
      >
        <avatar :username="member.fullname" :size="26"></avatar>
        <span>{{ member.fullname }}</span>
      </div>
    </div>
  </section>
</template>

<script>
import avatar from "vue-avatar";

export default {
  props: {
    pos: Object,
    task: Object,
  },
  data() {
    return {
      search: "",
      midPos: null,
    };
  },
  mounted() {
    this.midPos =
      this.pos.x -
      this.$refs["member-modal"].getBoundingClientRect().width / 2 +
      10;
  },
  computed: {
    boardMembers() {
      const regex = new RegExp(this.search, "i");
      return this.$store.getters.selectedBoard?.members
        .filter((boardMember) => {
          if (!this.task?.members) return true;
          return !this.task.members.some(
            (taskMember) => taskMember._id === boardMember._id
          );
        })
        .filter((member) => regex.test(member.fullname));
    },
    openPos() {
      if (this.pos.y + 300 < window.innerHeight) return this.pos.y;
      return this.pos.y - 300 - 40
    },
  },
  methods: {
    toggleMember(member) {
      const taskToEdit = JSON.parse(JSON.stringify(this.task));
      if (!taskToEdit.members) {
        taskToEdit.members = [];
        taskToEdit.members.push(member);
      } else {
        const idx = taskToEdit.members.findIndex((m) => m._id === member._id);
        if (idx >= 0) taskToEdit.members.splice(idx, 1);
        else taskToEdit.members.push(member);
      }
      this.$emit("updateTask", taskToEdit);
    },
    closeModal(){
      this.$emit('closeModal')
    }
  },
  components: {
    avatar,
  },
};
</script>