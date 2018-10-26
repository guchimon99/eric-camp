<template>
  <div class="splash" :class="rootClassName">
    <img class="splash_logo" src="https://ponponsan.com/wp-content/uploads/2018/10/logo.png" />
    <div class="splash_message">{{message}}</div>
  </div>
</template>

<script>
export default {
  name: 'splash',
  props: {
    message: String,
    isShown: Boolean
  },
  computed: {
    rootClassName () {
      return {
        'splash-hidden': !this.isShown
      }
    }
  }
}
</script>

<style scoped lang="scss">
.splash {
  color: #CCC;
  background-color: #111;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  opacity: 1;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition:
    top 0s linear .5s,
    opacity .5s ease 0s;
  z-index: 9999;

  &-hidden {
    top: -100%;
    opacity: 0;
  }

  &_logo {
    width: 30vmin;
    height: auto;
    margin-bottom: 30px;
    max-width: 240px;
  }

  &_message {
    font-size: 12px;
  }
}
</style>
