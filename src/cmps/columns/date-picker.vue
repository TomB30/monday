<template>
  <section class="date-picker" :class="pickerClass" @click="toggleChoosing">
  </section>
</template>
  </section>
</template>

<script>
export default {
  props: {
    task: Object,
  },
  data(){
    return{
      picker:null,
      isChoosing:false
    }
  },
  methods:{
    toggleChoosing(){
      this.isChoosing = !this.isChoosing
    }
  },
  computed: {
    pickerClass() {
      return this.task.date ? "" : "empty";
    },
  },
};
</script>

<style>
</style>