<template>
  <div class="proccessing" :class="rootClassName">
    <span>処理中</span>
  </div>
</template>

<script>
export default {
  props: {
    isShown: Boolean
  },
  computed: {
    rootClassName () {
      return {
        'proccessing-shown': this.isShown
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.proccessing {
  z-index: 9999;
  background-color: rgba(0,0,0,0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  display: none;

  &-shown {
    display: flex;
  }
}
</style>
