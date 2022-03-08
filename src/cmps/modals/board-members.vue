<template>
<section class="modal-bg" @click="closeModal">
  <section class="board-members modal">
      <h2>Board Members</h2>
      <input type="search" placeholder="Enter name or email">
      <div class="member-list">
        <div
        class="member-preview"
        v-for="member in users"
        :key="member._id"
        @click="addMember(member)"
      >
        <avatar :username="member.fullname" :size="28"></avatar>
        <span>{{ member.fullname }}</span>
      </div>
      </div>
      <i class="icon-x" @click="closeModal"></i>
  </section>
</section>
</template>

<script>
import avatar from 'vue-avatar'

export default {
  props:{
    appUsers:Array,
    boardMembers:Array
  },
  data(){
    return {

    }
  },
  components:{
    avatar
  },
  methods:{
    addMember(member){
      console.log('adding member',member.fullname);
    },
    closeModal(){
      this.$emit('toggleModal',false)
    }
  },
  computed:{
    users(){
      if(!this.appUsers || !this.boardMembers) return
      return this.appUsers.filter(appUser => {
        return !this.boardMembers.some(boardUser => {
          return boardUser._id === appUser._id
        })
      })
    }
  }
}
</script>