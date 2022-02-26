<template>
  <section class="timeline-picker">
    <div class="timeline-capsule">
      <template v-if="this.dates">
        <div class="history" :style="{ width: datesPercentage + '%' }"></div>
        <div
          class="future"
          :style="{ width: 100 - datesPercentage + '%' }"
        ></div>
      </template>
      <span>{{ datesText }}</span>
    </div>
  </section>
</template>

<script>
export default {
  // props:{
  //     dates:Array
  // },
  data() {
    return {
      dates: [
        Date.now() - 1000 * 60 * 60 * 24 * 3,
        Date.now() + 1000 * 60 *60 * 24 * 10,
      ],
    };
  },
  computed: {
    datesText() {
      if (this.dates) {
        const firstDate = new Date(this.dates[0]).toLocaleString("en-us", {
          month: "short",
          day: "numeric",
        });
        const secondDate = new Date(this.dates[1]).toLocaleString("en-us", {
          month: "short",
          day: "numeric",
        });
        return `${firstDate} - ${secondDate}`;
      }
      return "-";
    },
    datesPercentage() {
      const currDate = Date.now();
      const totalDiff = this.dates[1] - this.dates[0];
      const prevDiff = currDate - this.dates[0];
      return ((prevDiff / totalDiff) * 100).toFixed(0);
    },
  },
};
</script>

<style>
</style>