<template>
  <section class="workspace-page">
    <workspace-navbar></workspace-navbar>
    <section class="board-container">
      <board-header></board-header>
      <board-toolbar></board-toolbar>
      <group-list v-if="selectedBoard" :board="selectedBoard" @addGroup="addGroup" @updateGroup="updateGroup" @saveCmpsOrder="saveCmpsOrder"></group-list>
    </section>
  </section>
</template>

<script>
import workspaceNavbar from "../cmps/workspace-navbar.vue";
import boardHeader from "../cmps/board-header.vue";
import boardToolbar from "../cmps/board-toolbar.vue";
import groupList from "../cmps/group-list.vue";

export default {
  data() {
    return {
      boardIds: null,
      selectedBoard: null,
    }
  },
  methods:{
    addGroup(newGroup){
      const boardCopy = JSON.parse(JSON.stringify(this.selectedBoard))
      boardCopy.groups.push(newGroup)
      this.updateBoard(boardCopy)
    },
    updateGroup(updatedGroup){
      const boardCopy = JSON.parse(JSON.stringify(this.selectedBoard))
      const groupIdx = boardCopy.groups.findIndex(group => group.id === updatedGroup.id)
      boardCopy.groups.splice(groupIdx,1,updatedGroup)
      this.updateBoard(boardCopy)
    },
    async updateBoard(updatedBoard){
      this.$store.dispatch('updateBoard',{board:updatedBoard})
      this.selectedBoard = this.$store.getters.selectedBoard
    },
    saveCmpsOrder(cmpsOrder){
      const boardCopy = JSON.parse(JSON.stringify(this.selectedBoard))
      boardCopy.cmpsOrder = cmpsOrder
      this.updateBoard(boardCopy)
    }
  },
  computed:{

  },
  async created() {
    try {
      await this.$store.dispatch('loadBoards')
      this.boardIds = this.$store.getters.boards;
      this.selectedBoard = this.$store.getters.selectedBoard;
    } catch (err) {
      console.log(`could't load board`, err);
    }
  },
  components: {
    workspaceNavbar,
    boardHeader,
    boardToolbar,
    groupList,
  },
};
</script>
