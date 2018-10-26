<template>
  <div class="player" :class="rootClassName">
    <div class="player_position btn btn-sm btn-block" :class="positionClassName">
      {{positionLabel}}
    </div>
    <div class="player_icon">
      <img v-if="player.icon" :src="player.icon" :alt="player.displayName + 'のアイコン'" />
      <img v-else src="https://dummyimage.com/300/CCC/999.png&text=No+Icon" :alt="player.displayName + 'のアイコン'" />
    </div>
    <div class="player_name">{{player.displayName}}</div>
    <div class="player_result" :class="resultClassName">
      <div class="player_amount">{{player.amount}}</div>
      <div class="player_diff">({{diff}})</div>
    </div>
    <div class="player_updatedAt">{{player.updatetAt}}</div>
  </div>
</template>

<script>

const START_AMOUNT = 1000

export default {
  name: 'Player',
  props: {
    player: Object
  },
  computed: {
    positionClassName () {
      return {
        'btn-danger': (this.player.position === 'short'),
        'btn-success': (this.player.position === 'long'),
        'btn-dark': (this.player.position === 'secret'),
        'btn-secondary': (this.player.position === 'giveup'),
        'btn-light': (this.player.position === 'none')
      }
    },
    positionLabel () {
      let { position, currency } = this.player

      var label = ''

      if (currency) label += currency.toUpperCase() + ' '

      switch (position) {
        case 'short':
          label += 'ショート'
          break
        case 'long':
          label += 'ロング'
          break
        case 'secret':
          label += '秘密'
          break
        case 'giveup':
          label += 'ギブアップ'
          break
        case 'none':
          label += 'ノーポジ'
          break
      }

      return label
    },
    rootClassName () {
      return {
        ['player-' + this.player.position]: true
      }
    },
    diff () {
      let diff = this.player.amount - START_AMOUNT
      if (diff > 0) diff = '+' + diff
      return diff
    },
    resultClassName () {
      return {
        'text-danger': (this.player.amount - START_AMOUNT) < 0,
        'text-success': (this.player.amount - START_AMOUNT) > 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.player {
  background-color: #111;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 8px;
  border-radius: 6px;
  border: solid #222 1px;

  &-giveup .player{
    &_icon {
      img {
        opacity: 0.4;
        top: 5%;
        left: 5%;
        width: 90%;
        height: 90%;
      }
    }
    &_name {
      text-decoration: line-through;
      color: #999;
    }
  }

  &_position {
    margin-bottom: 8px;
  }

  &_icon {
    position: relative;
    box-sizing: content-box;
    width: 100%;
    padding-bottom: 100%;
    margin-bottom: 8px;
    border-radius: 4px;
    overflow: hidden;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center center;
    }
  }

  &_name {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 4px;
  }

  &_result {
    text-align: right;
    line-height: 1;
    margin-bottom: 8px;
  }

  &_amount {
    font-size: 20px;
    margin-bottom: 6px;
  }

  &_diff  {
    font-size: 14px;
  }

  &_updatedAt {
    font-size: 11px;
    color: #CCC;
  }
}
</style>
