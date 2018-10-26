<template>
  <div class="_modal" :class="rootClassName">
    <slot v-if="isContentShown" />
  </div>
</template>

<script>
export default {
  props: {
    isShown: Boolean
  },
  data () {
    return {
      isContentShown: true
    }
  },
  computed: {
    rootClassName () {
      return {
        '_modal-shown': this.isShown
      }
    }
  },
  created () {
    this.isContentShown = this.isShown
  },
  beforeUpdate () {
    if (this.$props.isShown) {
      this.isContentShown = true
    } else {
      setTimeout(() => {
        this.isContentShown = false
      }, 500)
    }
  }
}
</script>

<style lang="scss" scoped>
._modal {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 100%;
  left: 0;
  transition:  top .5s ease 0s;
  background-color: #161616;
  z-index: 9999;
  &-shown {
    transition:  top .5s ease 0s;
    top: 0%;
  }
}
</style>

<style lang="scss">

</style>
