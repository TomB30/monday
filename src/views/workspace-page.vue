<template>
  <section class="workspace-page" v-if="selectedBoard">
    <workspace-navbar @createBoard="createBoard" @removeBoard="removeBoard" @setBoard="setBoard" />
    <section class="board-container">
      <board-header  @setVal="updateBoard" :boardMembers="selectedBoard.members" />
      <board-toolbar @addTask="addTask" @setFilter="setFilter" />
      <group-list  :board="selectedBoard" :groups="filteredGroups" @updateBoard="updateBoard" />
    </section>
    <router-view />
  </section>
</template>

<script>
import workspaceNavbar from "../cmps/workspace-navbar.vue";
import boardHeader from "../cmps/board-header.vue";
import boardToolbar from "../cmps/board-toolbar.vue";
import groupList from "../cmps/group-list.vue";
import { boardService } from "../services/board-service";
import { socketService } from "../services/socket.service";

export default {
  data() {
    return {
      boardIds: null,
      selectedBoard: null,
      filterBy:null
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
      await this.$store.dispatch('updateBoard',{board:this.selectedBoard})
      this.selectedBoard = this.$store.getters.selectedBoard
      socketService.emit('board updated', this.selectedBoard)
    },
    boardUpdated(board){
      this.$store.commit({type:'setBoard', board})
    },
    setFilter(filterBy){
      this.filterBy = filterBy
    },
    createBoard(){
      this.$store.dispatch('createBoard')
    },
    setBoard(boardId){
      console.log('boardId',boardId);
      this.$store.commit('setBoardById',boardId)
    },
    removeBoard(boardId){
      this.$store.dispatch({type:'removeBoard',boardId})
    }
  },
  computed:{
    filteredGroups(){
      if(!this.filterBy) return this.selectedBoard.groups
      const groups = JSON.parse(JSON.stringify(this.selectedBoard.groups))
      return groups.map(g => {
        g.tasks = g.tasks.filter(t => {
          if(!this.filterBy.txt) return true
          const regex = new RegExp(this.filterBy.txt , 'i')
          return regex.test(t.title)
        })
        return g
      }).filter(g => g.tasks.length)
    }
  },
  async created() {
    try {
      if(!this.$store.getters.loggedInUser) return this.$router.push('/login')
      await this.$store.dispatch('loadBoards')
      await this.$store.dispatch('loadUsers')
      this.boardIds = this.$store.getters.boards;
      this.selectedBoard =  this.$store.getters.selectedBoard;
      socketService.on('board updated',this.boardUpdated)
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
        if(!newVal) return
        this.selectedBoard = newVal
        socketService.emit('board changed', newVal._id)
      },
      deep:true
    }
  }
};
</script>
