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
          :style="{ width: datesPercentage + '%' , 'background-color':color}"
        ></div>
        <div
          class="time-left"
          :style="{ width: 100 - datesPercentage + '%' }"
        ></div>
      </template>
      <span >{{ datesText }}</span>
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
        if(newVal.dates) this.datesToEdit = [...newVal.dates]
      },
      deep:true,
      immediate:true
    }
  }
};
</script>

<style>
</style>