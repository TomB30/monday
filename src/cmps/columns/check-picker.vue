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
            const isCheck = this.task.isCheck ? false : true
            this.$emit('setVal', 'isCheck', isCheck)
        }
    },
    computed:{
        checkSign(){
            return this.task.isCheck ? '✔' : ''
        }
    }
}
</script>