<template>
  <div class="navBar" :class="rootClassName">
    <div class="navBar_title">{{ title }}</div>
    <button v-if="left" @click="$emit('left-action')" class="navBar_left">{{ left }}</button>
    <button v-if="right" @click="$emit('right-action')" class="navBar_right">{{ right }}</button>
  </div>
</template>

<script>
export default {
  name: 'nav-bar',
  props: {
    title: String,
    left: String,
    right: String,
    fixed: Boolean
  },
  computed: {
    rootClassName () {
      return {
        'navBar-fixed': this.fixed
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.navBar {
  color: #FFF;
  background-color: #111;
  line-height: 44px;
  padding: 8px 8px 0;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: solid #1C1C1C 1px;
  z-index: 2000;

  &-fixed {
    position: fixed;
  }

  &_title {
    font-weight: bold;
  }

  &_left,
  &_right {
    position: absolute;
    display: block;
    top: 8px;
    padding: 0 8px;
    height: 44px;
    color: #FFF;
    border: none;
    background-color: transparent;

    &:active, &:focus {
      outline: none;
      color: #CCC;
    }
  }

  &_left {
    left: 8px;
  }

  &_right {
    right: 8px;
  }
}
</style>
