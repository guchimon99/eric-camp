<template>
  <form @submit.prevent="onSubmit">
    <div class="form-group">
      <label for="updateStatusAmount">残高</label>
      <div class="input-group mb-3">
        <input id="updateStatusAmount" class="form-control"
          type="number" placeholder="0" required v-model="amount" />
        <div class="input-group-append">
          <span class="input-group-text" id="basic-addon2">JPY</span>
        </div>
      </div>
    </div>
    <div class="form-group">
      <label for="updateStatusCurrency">銘柄</label>
      <input id="updateStatusCurrency" class="form-control"
        type="text" placeholder="BTC" maxlength="8" v-model="currency" />
    </div>
    <div class="form-group">
      <label for="updateStatusPosition">ポジション</label>
      <select id="updateStatusPosition" class="form-control" v-model="position">
        <option value="none">ノーポジ</option>
        <option value="short">ショート</option>
        <option value="long">ロング</option>
        <option value="secret">秘密</option>
        <option value="giveup">ギブアップ</option>
      </select>
    </div>
    <div v-if="error" class="alert alert-danger mx-3">
      {{error.message}}
    </div>
    <div class="form-group mb-0">
      <button class="btn btn-primary btn-block">保存する</button>
    </div>
    <div v-if="result" class="alert alert-success mx-3 mt-3">
      {{result.message}}
    </div>
    <processing :isShown="isProcessing" />
  </form>
</template>

<script>

import { mapActions, mapState } from 'vuex'

import Processing from '@/components/Processing.vue'

const positionToLabel = (position) => {
  switch (position) {
    case 'none': return 'ノーポジ'
    case 'short': return 'ショート'
    case 'long': return 'ロング'
    case 'secret': return '秘密'
    case 'giveup': return 'ギブアップ'
    default: return '不明'
  }
}

export default {
  name: 'update-status',
  components: {
    'processing': Processing
  },
  computed: {
    ...mapState([
      'user',
      'players'
    ])
  },
  data () {
    return {
      amount: '',
      beforeAmount: '',
      currency: '',
      beforeCurrency: '',
      position: '',
      beforePosition: '',
      error: null,
      result: null,
      isProcessing: false
    }
  },
  watch: {
    position (val) {
      if (val === 'none') {
        this.currency = ''
      }
    }
  },
  methods: {
    ...mapActions([
      'updateStatus',
      'createActivity'
    ]),
    async onSubmit () {
      const authorId = this.user.uid
      const {
        id,
        amount,
        beforeAmount,
        currency,
        beforeCurrency,
        position,
        beforePosition
      } = this

      var content = ''

      if (amount !== beforeAmount) {
        let diff = amount - beforeAmount
        content += `残高が ${beforeAmount} から ${amount} になりました`
        if (diff > 0) {
          content += `(+${diff})`
        } else {
          content += `(${diff})`
        }
        content += '\n'
      }

      if (currency !== beforeCurrency || position !== beforePosition) {
        content += `銘柄が ${beforeCurrency || 'なし'} ${positionToLabel(beforePosition)} から ${currency || 'なし'} ${positionToLabel(position)} になりました`
      }

      this.result = null
      this.error = null

      if (!content) return

      this.isProcessing = true

      try {
        await this.updateStatus({ id, amount, currency, position })
        await this.createActivity({ authorId, content })

        this.result = { message: '更新が完了しました' }
        this.beforeAmount = amount
        this.beforeCurrency = currency
        this.beforePosition = position
      } catch (error) {
        this.error = error
      }

      this.isProcessing = false
    }
  },
  created () {
    const { id, amount, currency, position } = this.players[this.user.uid]

    this.id = id
    this.amount = amount
    this.beforeAmount = amount
    this.currency = currency
    this.beforeCurrency = currency
    this.position = position
    this.beforePosition = position
  }
}
</script>
