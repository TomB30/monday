<template>
  <section class="date-picker" :class="pickerClass">
  </section>
</template>

<script>
export default {
  props:{
    task:Object
  },
  computed:{
    pickerClass(){
      return this.task.date ? '' : 'empty'
    }
  }
}
</script>

<style>

</style>