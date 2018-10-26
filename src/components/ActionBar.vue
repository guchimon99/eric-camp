<template>
  <nav class="actionBar">
    <ul>
      <li>
        <router-link to="/home">
          <i class="fas fa-home"></i>
        </router-link>
      </li>
      <li>
        <router-link to="/activities">
          <i class="fas fa-th-list"></i>
        </router-link>
      </li>
      <li v-if="isShownMe">
        <router-link to="/me">
          <i class="fas fa-user"></i>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    isShownMe: Boolean
  }
}
</script>

<style lang="scss" scoped>
  .actionBar {
    border-top: solid #1C1C1C 1px;
    color: #FFF;
    background-color: #111;
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 2000;

    ul {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      justify-content: space-around;
      padding: 0 8px;
    }

    li {
      display: block;
    }

    a {
      color: inherit;
      display: block;
      text-align: center;
      padding: 14px 16px;
      font-size: 18px;
      color: #CCC;
      &.router-link-active{
        color: #FFF;
      }
    }
  }
</style>
