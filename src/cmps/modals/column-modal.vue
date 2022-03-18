<template>
  <section
    class="column-modal modal"
    ref="column-modal"
    :style="calcPos"
    v-close="closeModal"
  >
    <h3>Column Types</h3>
    <div class="column-list modal-section">
      <div
        class="column-preview"
        @click="toggleColumn(column)"
        :class="{ selected: includedColumns[idx] }"
        v-for="(column, idx) in columns"
        :key="column.type"
      >
        <i :class="column.iconClass"></i><span>{{ column.txt }}</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    cmpsOrder: Array,
    pos: Object,
  },
  data() {
    return {
      columns: [
        {
          type: "member-picker",
          txt: "Member",
          width: 140,
          minWidth: 100,
          iconClass: "icon-member",
        },
        {
          type: "status-picker",
          txt: "Status",
          width: 130,
          minWidth: 90,
          iconClass: "icon-status",
        },
        {
          type: "timeline-picker",
          txt: "Timeline",
          width: 180,
          minWidth: 180,
          iconClass: "icon-timeline",
        },
        {
          type: "date-picker",
          txt: "Date",
          width: 130,
          minWidth: 100,
          iconClass: "icon-date",
        },
        {
          type: "check-picker",
          txt: "Check",
          width: 100,
          minWidth: 80,
          iconClass: "icon-select-all",
        },
      ],
      cmpsToEdit: null,
      calcPos : null,
    };
  },
  created() {
    this.cmpsToEdit = JSON.parse(JSON.stringify(this.cmpsOrder));
  },
  mounted() {
    const x =
      this.pos.x -
      this.$refs["column-modal"].getBoundingClientRect().width / 2 +
      10;
    const { y } = this.pos;
    this.calcPos = { top: y + "px", left: x + "px" };
  },
  methods: {
    toggleColumn(column) {
      const idx = this.cmpsToEdit.findIndex((c) => c.type === column.type);
      if (idx === -1) this.cmpsToEdit.push(column);
      else this.cmpsToEdit.splice(idx, 1);
      this.$emit("saveCmpsOrder", JSON.parse(JSON.stringify(this.cmpsToEdit)));
      this.closeModal()
    },
    closeModal() {
      this.$emit("openModal", null);
    },
  },
  computed: {
    includedColumns() {
      const columnTypes = this.columns.map((c) => c.type);
      return columnTypes.map((cT) => {
        if (this.cmpsOrder.some((c) => c.type === cT)) return true;
        else return false;
      });
    },
  },
};
</script>

<style>
</style>