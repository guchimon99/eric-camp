
<template>
  <div id="app">
    <action-bar :isShownMe="isShownMe" />
    <router-view v-if="isLoaded"/>
    <splash
      :isShown="!isLoaded"
      :message="message" />
  </div>
</template>

<script>

import { mapActions, mapState } from 'vuex'

import router from './router'
import store from './store'

import Splash from '@/components/Splash.vue'
import ActionBar from '@/components/ActionBar.vue'

const IS_SHOWN_ME_KEY = 'isShownMe/v1'

export default {
  name: 'app',
  router,
  store,
  components: {
    'splash': Splash,
    'action-bar': ActionBar
  },
  computed: {
    ...mapState([
      'user',
      'players',
      'activities'
    ]),
    isLoaded () {
      return (
        (this.user || this.user === null) &&
        this.players !== null &&
        this.activities !== null
      )
    },
    message () {
      if (this.isLoaded) return '読み込み完了'

      if (this.players === null) return 'プレイヤーを取得中'
      if (this.activities === null) return 'アクティビティを取得中'

      return '読み込み中'
    },
    isShownMe () {
      return this.$store.state.isShownMe
    }
  },
  methods: {
    ...mapActions([
      'fetchUser',
      'fetchActivities',
      'fetchPlayers',
      'setIsShownMe'
    ])
  },
  created () {
    this.fetchUser()
    this.fetchPlayers()
    this.fetchActivities()

    var isShownMe = this.$route.query.me === '1'

    if (localStorage) {
      if (isShownMe) {
        localStorage.setItem(IS_SHOWN_ME_KEY, isShownMe)
      } else {
        isShownMe = localStorage.getItem(IS_SHOWN_ME_KEY) === 'true'
      }
    }

    this.setIsShownMe(isShownMe)
  }
}
</script>

<style lang="scss">
  body {
    font-size: 14px;
    font-family: 'M PLUS 1p', sans-serif;
    background-color: #161616;
    color: #FFF;
  }

  .scene {
    &-navBar {
      padding-top: 68px;
    }
    &-actionBar {
      padding-bottom: 72px;
    }
  }

  .section {
    display: block;
    background-color: #111;
    border-top: solid #1C1C1C 1px;
    border-bottom: solid #1C1C1C 1px;
    padding: 16px 0;
  }

  .form-group {
    padding-left: 16px;
    padding-right: 16px;
    margin-bottom: 1.4rem;
    label {
      line-height: 20px;
    }
  }

  .form-control {
    border: none;
    padding-top: 8px;
    padding-bottom: 8px;
    &, &:active, &:focus {
      color: #FFF;
      background-color: #060606;
    }
  }

  .input-group-text {
    background-color: #222;
    color: #CCC;
    border: solid 1px #111;
  }
</style>

<style scoped lang="scss">

</style>
