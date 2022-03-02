<template>
  <section class="date-picker" :class="pickerClass" @click="toggleChoosing">
    <div class="block">
      <el-date-picker
        v-model="date"
        type="date"
        @change="updateDate"
        format="MMM dd"
        value-format="timestamp"
      >
      </el-date-picker>
    </div>
    <span>{{ dateForDisplay }}</span>
  </section>
</template>
  </section>
</template>

<script>
export default {
  props: {
    task: Object,
  },
  data() {
    return {
      picker: null,
      isChoosing: false,
      date:null
    };
  },
  methods: {
    toggleChoosing() {
      this.isChoosing = !this.isChoosing;
    },
    updateDate(){
      this.$emit('setVal','date',this.date)
    }
  },
  computed: {
    pickerClass() {
      return this.task.date ? "" : "empty";
    },
    dateForDisplay(){
      if(!this.date) return
      return Intl.DateTimeFormat('en-US',{month:'short',day:'numeric'}).format(this.date)
    }
  },
  watch:{
    task:{
      handler(newVal){
        if(newVal.date) this.date = newVal.date
      },
      immediate:true,
      deep:true
    }
  }
};
</script>

<style>
</style>