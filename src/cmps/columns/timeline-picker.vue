<template>
  <section class="timeline-picker">
    <div class="block">
      <el-date-picker
        v-model="datesToEdit"
        @change="updateDates"
        type="daterange"
        value-format="timestamp"
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date"
      >
      </el-date-picker>
    </div>
    <div class="timeline-capsule">
      <template v-if="this.datesToEdit">
        <div
          class="history"
          :class="fullRangeClass"
          :style="{ width: datesPercentage + '%' , 'background-color':color}"
        ></div>
        <div
          class="future"
          :class="fullRangeClass"
          :style="{ width: 100 - datesPercentage + '%' }"
        ></div>
      </template>
      <span :style="spanColor">{{ datesText }}</span>
    </div>
  </section>
</template>

<script>
export default {
  props:{
      task:Object,
      color:String
  },
  data() {
    return {
      datesToEdit: null,
    };
  },
  methods: {
    updateDates() {
      this.$emit('setVal', 'dates',this.datesToEdit)
    },
  },
  computed: {
    datesText() {
      if (this.datesToEdit && this.datesToEdit.length) {
        const firstDate = new Date(this.datesToEdit[0]).toLocaleString("en-us", {
          month: "short",
          day: "numeric",
        });
        const secondDate = new Date(this.datesToEdit[1]).toLocaleString("en-us", {
          month: "short",
          day: "numeric",
        });
        return `${firstDate} - ${secondDate}`;
      }
      return "-";
    },
    spanColor() {
      if (!this.datesToEdit || !this.datesToEdit.length) {
        return { color: "white" };
      } else return;
    },
    fullRangeClass() {
      const currDate = Date.now();
      const totalDiff = this.datesToEdit[1] - this.datesToEdit[0];
      const prevDiff = currDate - this.datesToEdit[0];
      const percentage = (((prevDiff / totalDiff) * 100)).toFixed(0);
      if (percentage >= 100 || percentage <= 0) return "full-border";
    },
    datesPercentage() {
      const currDate = Date.now();
      const totalDiff = this.datesToEdit[1] - this.datesToEdit[0];
      const prevDiff = currDate - this.datesToEdit[0];
      var percentage = (((prevDiff / totalDiff) * 100)).toFixed(0);
      if(percentage > 100) percentage = 100
      else if(percentage < 0) percentage = 0
      return percentage
    },
  },
  watch:{
    task:{
      handler(newVal){
        if(newVal.dates) this.datesToEdit = [...this.task.dates]
      },
      deep:true,
      immediate:true
    }
  }
};
</script>

<style>
</style>