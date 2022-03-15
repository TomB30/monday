<template>
  <section class="modal" v-close="closeModal" :style="getPos">
    <div class="modal-section">
      <div class="modal-item"><i class="icon-star"></i> Add to favorites</div>
    </div>
    <div class="modal-section">
      <div class="modal-item" @click="removeBoard"><i class="icon-delete"></i> Delete</div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    info: Object,
  },
  data() {
    return {};
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
    removeBoard(){
        this.$emit('removeBoard',this.info.boardId)
    }
  },
  computed: {
    getPos() {
      const { x, y, height } = this.info.ev.target.getBoundingClientRect();
      const pos = { x: x-5, y: y + height };
      return {'top':pos.y+'px', 'left':pos.x+'px'}
    },
  },
};
</script>