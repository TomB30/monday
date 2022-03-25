<template>
  <section class="check-picker" @click="toggleCheck">
      {{checkSign}}
  </section>
</template>

<script>
export default {
    props:{
        task:Object
    },
    methods:{
        toggleCheck(){
            this.$emit('setVal', 'isCheck', !this.task.isCheck)
        }
    },
    computed:{
        checkSign(){
            return this.task.isCheck ? '✔' : ''
        }
    }
}
</script>