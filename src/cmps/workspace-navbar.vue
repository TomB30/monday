<template>
  <nav class="workspace-navbar" :class="openClass">
    <div class="collapse-btn" @click="toggleOpen">
      <i :class="iconClass"></i>
    </div>
      <template v-if="isOpen">
        <div class="workspace-name">
          <h3>Your workspace</h3>
        </div>
        <section class="navbar-btns">
          <div @click="createBoard">
            <i class="icon-plus"></i>
            <span>Add</span>
          </div>
          <div>
            <i class="icon-search"></i>
            <span>Search</span>
          </div>
        </section>
        <section class="board-btns">
          <div
            v-for="board in boards"
            :key="board._id"
            @click="setBoard(board._id)"
            class="board-btn"
            :class="board._id === selectedBoardId ? 'selected' : ''"
          >
            <img src="@/assets/icons/board-icon.png" alt="" /><span>{{
              board.title
            }}</span>
          </div>
        </section>
      </template>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      selectedBoardId: null,
      boards: null,
    };
  },
  methods: {
    toggleOpen() {
      this.isOpen = !this.isOpen;
    },
    createBoard(){
      this.$emit('createBoard')
    },
    setBoard(boardId){
      this.$emit('setBoard',boardId)
    }
  },
  computed: {
    iconClass() {
      return this.isOpen ? "icon-left-arrow" : "icon-right-arrow";
    },
    openClass() {
      return this.isOpen ? "open" : "";
    },
    selectedBoard() {
      return this.$store.getters.selectedBoard?._id;
    },
  },
  watch: {
    "$store.getters.selectedBoard": {
      handler(newVal) {
        this.selectedBoardId = newVal?._id;
      },
      deep: true,
      immediate: true,
    },
    "$store.getters.boards": {
      handler(newVal) {
        this.boards = newVal;
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>
