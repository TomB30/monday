<template>
  <div class="task-preview">
      <div class="task-title"><div :style="{'background-color':groupColor}" class="left-border"></div><span contenteditable @blur="updateTitle">{{task.title}}</span></div>
      <div v-for="cmp in cmpsOrder" :key="cmp.type" :style="{'width': cmp.width+'px'}" class="task-info"><component :is="cmp.type" :task="task"></component></div>
      <div class="task-info task-end"></div>
  </div>
</template>

<script>
import memberPicker from './columns/member-picker.vue'
import datePicker from './columns/date-picker.vue'
import statusPicker from './columns/status-picker.vue'

export default {
    props:{
        task:Object,
        cmpsOrder:Array,
        groupColor:String
    },
    methods:{
        updateTitle(ev){
            const taskTitle = ev.target.innerText
            const taskCopy = JSON.parse(JSON.stringify({...this.task, title:taskTitle}))
            this.updateTask(taskCopy)
        },
        updateTask(updatedTask){
            this.$emit('updateTask', updatedTask)
        }
    },
    components:{
        memberPicker,
        statusPicker,
        datePicker
    }
}
</script>

<style>

</style>