<template>
  <section class="status-modal modal" :style="{'top':pos.y+'px','left':pos.x+'px'}">
    <div class="modal-section">
      Status
    </div>
  </section>
</template>

<script>
export default {
  props:{
    pos:Object
  },
  created(){
    console.log(this.pos);
  }
}
</script>