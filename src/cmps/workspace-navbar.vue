<template>
  <nav class="workspace-navbar" :class="openClass">
    <div class="collapse-btn" @click="toggleOpen">
      <i :class="iconClass"></i>
    </div>
      <template v-if="isOpen">
        <div class="workspace-name">
          <h3>{{username}}'s workspace</h3>
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
          <div>
            <img src="@/assets/icons/board-icon.png" alt="" /><span>{{
              board.title
            }}</span>
          </div>
            <i class="icon-ellipsis" @click.stop="setModal($event,board._id)"></i>
          </div>
        </section>
      </template>
      <board-modal v-if="modalInfo" :info="modalInfo" @removeBoard="removeBoard" @closeModal="setModal"></board-modal>
  </nav>
</template>

<script>
import boardModal from './modals/board-modal.vue'
export default {
  data() {
    return {
      isOpen: false,
      selectedBoardId: null,
      boards: null,
      modalInfo: null
    };
  },
  methods: {
    toggleOpen() {
      this.isOpen = !this.isOpen;
    },
    createBoard(){
      this.$emit('createBoard')
      this.toggleOpen()
    },
    setBoard(boardId){
      this.$emit('setBoard',boardId)
      this.toggleOpen()
    },
    setModal(ev,boardId){
      if(!boardId) return this.modalInfo = null
      this.modalInfo = {ev, boardId}
    },
    removeBoard(boardId){
      this.$emit('removeBoard',boardId)
      this.setModal()
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
    username(){
      return this.$store.getters.loggedInUser.fullname.split(' ')[0]
    }
  },
  components:{
    boardModal
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
