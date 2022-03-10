<template>
  <section class="board-header-container">
    <header class="board-header">
      <div class="title-container">
        <h1 contenteditable class="board-title" @blur="changeTitle">{{boardTitle}}</h1>
        <i :class="infoIconClass" @click="toggleDesc"></i>
        <i class="icon-star"></i>
      </div>
      <div class="header-btns">
        <div>
          <span>Last seen</span><avatar :size="24" username="Tom Bechar" />
        </div>
        <div @click="toggleModal(true)"><i class="icon-add-member"></i> Invite / <span v-if="users">{{' '+users.length}}</span></div>
        <div><i class="icon-activity"></i> Activity</div>
        <button><i class="icon-plus"></i> Add to board</button>
        <div><i class="icon-ellipsis"></i></div>
      </div>
    </header>
    <p v-if="isDescOpen" class="board-desc" contenteditable  @focus="focusDesc">Add board description</p>
    <board-members v-if="isModalOpen" @toggleMember="toggleMember" @toggleModal="toggleModal" :appUsers="users" :boardMembers="boardMembers"></board-members>
  </section>
</template>

<script>
import Avatar from "vue-avatar";
import boardMembers from "./modals/board-members.vue";

export default {
  props:{
    boardMembers:Array
  },
  data() {
    return {
        isDescOpen: true,
        users:null,
        isModalOpen:false,
    };
  },
  components: {
    boardMembers,
    Avatar,
  },
  computed:{
      infoIconClass(){
          return this.isDescOpen ? 'icon-info-full' : 'icon-info'
      },
      boardTitle(){
        return this.$store.getters.selectedBoard?.title
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
      },
      changeTitle(ev){
        this.$emit('setVal','title',ev.target.innerText)
      },
      toggleModal(isOpen){
        this.isModalOpen = isOpen
      },
      toggleMember(member){
        const members = JSON.parse(JSON.stringify(this.boardMembers))
        const idx = members.findIndex(m => m._id === member._id)
        if(idx === -1) members.push(member)
        else members.splice(idx ,1)
        this.$emit('setVal','members',members)
      }
  },
  watch:{
    '$store.getters.users' : {
      handler(newVal){
        this.users = newVal
      },
      deep:true,
      immediate:true
    }
  }
};
</script>
