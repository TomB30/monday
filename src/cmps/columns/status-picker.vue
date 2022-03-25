<template>
  <section class="status-picker" :style="statusColor">
    {{statusTxt}}
  </section>
</template>

<script>
export default {
  props:{
    task:Object
  },
  computed:{
    statusTxt(){
      return this.task.status?.txt ? this.task.status.txt : ''
    },
    statusColor(){
      return this.task.status?.color ? {'background-color': this.task.status.color} : ''
    }
  }
}
</script>