<template>
  <section
    class="modal member-filter-modal"
    ref="member-filter-modal"
    :style="calcPos"
    v-close="closeModal"
  >
    <div>
      <h3>Quick person filter</h3>
      <button @click="selectMember(null)">Clear filter</button>
    </div>
    <p>Filter items by person</p>
    <div class="member-list">
      <div
        v-for="member in members"
        :key="member._id"
        @click="selectMember(member._id)"
      >
        <avatar
          :username="member.fullname"
          :key="member._id"
          :size="30"
        ></avatar>
      </div>
    </div>
  </section>
</template>

<script>
import avatar from "vue-avatar";
export default {
  props: {
    modal: Object,
  },
  data() {
    return {
      calcPos: null,
    };
  },
  mounted() {
    const x =
      this.modal.pos.x -
      this.$refs["member-filter-modal"].getBoundingClientRect().width / 2 +
      10;
    const { y } = this.modal.pos;
    this.calcPos = { top: y + "px", left: x + "px" };
  },
  components: {
    avatar,
  },
  methods: {
    closeModal() {
      this.$emit("openModal", null);
    },
    selectMember(memberId) {
      this.$emit("memberFilter", memberId);
      this.closeModal();
    },
  },
  computed: {
    members() {
      return this.$store.getters.selectedBoard?.members;
    },
  },
};
</script>

<style>
</style>