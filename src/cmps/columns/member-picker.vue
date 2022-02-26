<template>
  <section class="member-picker">
    <template v-if="task.members && task.members.length">
      <avatar v-for="member in task.members" :key="member.username" :size="26" :username="member.fullname"></avatar>
    </template>
      <i class="icon-member" v-else></i>
  </section>
</template>

<script>
import avatar from 'vue-avatar'


export default {
  props:{
    task:Object
  },
  components:{
    avatar
  }
}
</script>

<style>

</style>