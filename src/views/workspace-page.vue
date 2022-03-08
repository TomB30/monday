<template>
  <section class="workspace-page" v-if="selectedBoard">
    <workspace-navbar></workspace-navbar>
    <section class="board-container">
      <board-header  @setVal="updateBoard" :boardMembers="selectedBoard.members"></board-header>
      <board-toolbar @addTask="addTask"></board-toolbar>
      <group-list  :board="selectedBoard" @updateBoard="updateBoard"></group-list>
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
    async updateBoard(key,val){
      this.selectedBoard[key] = val
      this.$store.dispatch('updateBoard',{board:this.selectedBoard})
      this.selectedBoard = this.$store.getters.selectedBoard
    },
  },
  computed:{

  },
  async created() {
    try {
      await this.$store.dispatch('loadBoards')
      await this.$store.dispatch('loadUsers')
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
  watch:{
    '$store.getters.selectedBoard' : {
      handler(newVal){
        this.selectedBoard = newVal
      },
      deep:true
    }
  }
};
</script>
