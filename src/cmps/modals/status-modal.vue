<template>
  <section class="status-modal modal" :style="{'top':pos.y+'px','left':pos.x+'px'}">
    <div class="status-list">
      <div v-for="status in boardStatus" :key="status.id" :style="{'background-color':status.color}" class="status-preview" @click="selectStatus(status)"> 
        {{status.txt}}
      </div>
    </div>
    <div class="edit-status">
      <i class="icon-pencil"></i>
      <span>Edit Labels</span>
    </div>
  </section>
</template>

<script>
export default {
  props:{
    pos:Object,
    task:Object
  },
  computed:{
    boardStatus(){
      console.log(this.$store.getters.selectedBoard?.status);
      return this.$store.getters.selectedBoard?.status
    }
  },
  methods:{
    selectStatus(status){
      const taskToEdit = JSON.parse(JSON.stringify(this.task))
      taskToEdit.status = status
      this.$emit('updateTask',taskToEdit)
      this.$emit('closeModal')
    }
  },
  created(){
    console.log(this.pos);
  }
}
</script>