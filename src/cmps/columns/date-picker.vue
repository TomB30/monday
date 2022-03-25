<template>
  <section class="date-picker" :class="emptyStyle">
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

<script>
export default {
  props: {
    task: Object,
  },
  data() {
    return {
      date: null,
    }
  },
  methods: {
    updateDate() {
      this.$emit('setVal', 'date', this.date);
    }
  },
  computed: {
    emptyStyle() {
      return this.task.date ? '' : 'empty';
    },
    dateForDisplay() {
      if (!this.date) return;
      return Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
      }).format(this.date);
    }
  },
  watch: {
    task: {
      handler(newVal) {
        if (newVal.date) this.date = newVal.date;
      },
      immediate: true,
      deep: true,
    }
  }
};
</script>