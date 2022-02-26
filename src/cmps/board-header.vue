<template>
  <section class="board-header-container">
    <header class="board-header">
      <div class="title-container">
        <h1 contenteditable class="board-title">Board Title</h1>
        <i :class="infoIconClass" @click="toggleDesc"></i>
        <i class="icon-star"></i>
      </div>
      <div class="header-btns">
        <div>
          <span>Last seen</span><avatar :size="24" username="Tom Bechar" />
        </div>
        <div><i class="icon-add-member"></i> Invite / 1</div>
        <div><i class="icon-activity"></i> Activity</div>
        <button><i class="icon-plus"></i> Add to board</button>
        <div><i class="icon-ellipsis"></i></div>
      </div>
    </header>
    <p v-if="isDescOpen" class="board-desc" contenteditable  @focus="focusDesc">Add board description</p>
  </section>
</template>

<script>
import Avatar from "vue-avatar";

export default {
  data() {
    return {
        isDescOpen: true
    };
  },
  components: {
    Avatar,
  },
  computed:{
      infoIconClass(){
          return this.isDescOpen ? 'icon-info-full' : 'icon-info'
      }
  },
  methods:{
      toggleDesc(){
          this.isDescOpen = !this.isDescOpen
      },
      focusDesc(ev){
          var range = document.createRange()
          range.selectNodeContents(ev.target)
          var sel = window.getSelection()
          sel.removeAllRanges()
          sel.addRange(range)
      }
  }
};
</script>
