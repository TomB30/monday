<template>
  <section class="modal-bg" @click.self="closeModal">
    <section class="board-members modal">
      <h2>Board Members</h2>
      <input type="search" placeholder="Enter name or email" v-model="filter" />
      <div class="member-list">
        <div
          class="member-preview"
          v-for="member in users"
          :key="member._id"
          @click="addMember(member)"
        >
          <div>
            <avatar :username="member.fullname" :size="28"></avatar>
            <span>{{ member.fullname }}</span>
          </div>
          <div>
          <i class="icon-crown" v-if="boardAdminId === member._id" title="Board owner"></i>
          <i class="icon-x" v-if="boardAdminId !== member._id && boardMembersIds.includes(member._id)"></i>
          </div>
        </div>
      </div>
      <i class="icon-x" @click="closeModal"></i>
    </section>
  </section>
</template>

<script>
import avatar from "vue-avatar";

export default {
  props: {
    appUsers: Array,
    boardMembers: Array,
  },
  data() {
    return {
      filter:''
    };
  },
  components: {
    avatar,
  },
  methods: {
    addMember(member) {
      if(member._id === this.boardAdminId) return
      console.log("adding member", member.fullname);
      this.$emit("toggleMember", member);
    },
    closeModal() {
      this.$emit("toggleModal", false);
    },
  },
  computed: {
    users(){
      const regex = new RegExp(this.filter, "i");
      return this.appUsers.filter(u => regex.test(u.fullname))
    },
    boardMembersIds(){
      return this.boardMembers.map(m => m._id)
    },
    boardAdminId(){
      return this.$store.getters.selectedBoard.createdBy._id
    }
  },
};
</script>