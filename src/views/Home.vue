<template>
  <div class="scene scene-actionBar scene-navBar">
    <nav-bar title="ホーム" :fixed="true" />
    <div class="playerList">
      <div class="playerList_col col-6 col-md-4 col-lg-3" v-for="player in players" :key="player.authorId">
        <player :player="player" />
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

import NavBar from '@/components/NavBar.vue'
import Player from '@/components/Player.vue'

import store from '@/store'

export default {
  name: 'home',
  store,
  components: {
    'nav-bar': NavBar,
    'player': Player
  },
  computed: {
    ...mapGetters({
      players: 'sortedByAmountPlayers'
    })
  }
}
</script>

<style lang="scss" scoped>
.playerList {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0 4px;

  &_col {
    min-height: 300px;
    padding: 0 4px;
    margin: 0 0 8px;
  }
}
</style>
