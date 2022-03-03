<template>
  <section class="workspace-page">
    <workspace-navbar></workspace-navbar>
    <section class="board-container">
      <board-header></board-header>
      <board-toolbar @addTask="addTask"></board-toolbar>
      <group-list v-if="selectedBoard" :board="selectedBoard" @updateBoard="updateBoard"></group-list>
    </section>
  </section>
</template>

<script>
import workspaceNavbar from "../cmps/workspace-navbar.vue";
import boardHeader from "../cmps/board-header.vue";
import boardToolbar from "../cmps/board-toolbar.vue";
import groupList from "../cmps/group-list.vue";
import { boardService } from "../services/board-service";

export default {
  data() {
    return {
      boardIds: null,
      selectedBoard: null,
    }
  },
  methods:{
    addTask(){
      const task = boardService.getEmptyTask()
      task.title = 'New Item'
      this.selectedBoard.groups[0].tasks.unshift(task)
      this.updateBoard()
    },
    // addGroup(newGroup){
    //   this.selectedBoard.groups.push(newGroup)
    //   this.updateBoard()
    // },
    // updateGroup(updatedGroup){
    //   const groupIdx = this.selectedBoard.groups.findIndex(group => group.id === updatedGroup.id)
    //   this.selectedBoard.groups.splice(groupIdx,1,updatedGroup)
    //   this.updateBoard()
    // },
    async updateBoard(key,val){
      this.selectedBoard[key] = val
      this.$store.dispatch('updateBoard',{board:this.selectedBoard})
      this.selectedBoard = this.$store.getters.selectedBoard
    },
    // saveCmpsOrder(cmpsOrder){
    //   this.selectedBoard.cmpsOrder = cmpsOrder
    //   this.updateBoard()
    // },
    // updateGroups(groups){
    //   this.selectedBoard.groups = groups
    //   this.updateBoard()
    // }
  },
  computed:{

  },
  async created() {
    try {
      await this.$store.dispatch('loadBoards')
      this.boardIds = this.$store.getters.boards;
      this.selectedBoard =  this.$store.getters.selectedBoard;
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
