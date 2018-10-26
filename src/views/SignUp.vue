<template>
  <div class="scene scene-actionBar scene-navBar">
    <nav-bar
      title="アカウント作成"
      left="キャンセル"
      @left-action="$emit('cancel')" />

    <section class="section">
      <form @submit.prevent="onSubmit">
        <div class="form-group">
          <label for="signUpDisplayName">ユーザー名</label>
          <input id="signUpDisplayName" class="form-control" v-model="displayName"
            type="text" minlength="2" placeholder="あなたの名前" required />
        </div>
        <div class="form-group">
          <label for="signUpEmail">メールアドレス</label>
          <input
            id="signUpEmail" class="form-control" v-model="email"
            type="email" minlength="2" placeholder="user@example.com" required />
        </div>
        <div class="form-group">
          <label for="signUpPassword">パスワード</label>
          <input
            id="signUpPassword" class="form-control" v-model="password"
            type="password"  minlength="8" placeholder="半角英数8文字以上" required autocomplete />
        </div>
        <div v-if="error" class="alert alert-danger mx-3">{{error.message}}</div>
        <div class="form-group mb-0">
          <button class="btn btn-primary btn-block">アカウントを作成する</button>
        </div>
      </form>
    </section>
    <p class="text-center px-2 my-3 text-muted">
      すでにアカウントをお持ちですか？ <button class="btn btn-sm btn-link" @click="$emit('show-sign-in')">ログインする</button>
    </p>
    <processing :isShown="isProcessing" />
  </div>
</template>

<script>

import { mapActions } from 'vuex'

import NavBar from '@/components/NavBar.vue'
import Processing from '@/components/Processing.vue'
import store from '../store'

export default {
  name: 'sign-up',
  store,
  components: {
    'nav-bar': NavBar,
    'processing': Processing
  },
  data: () => ({
    displayName: '',
    email: '',
    password: '',
    error: null,
    isProcessing: false
  }),
  methods: {
    ...mapActions({
      signUp: 'signUp',
      createPlayer: 'createPlayer'
    }),
    async onSubmit () {
      let { email, password, displayName } = this
      this.isProcessing = true

      try {
        const result = await this.signUp({ email, password })

        await this.createPlayer({
          authorId: result.user.uid,
          displayName,
          icon: null,
          amount: 10000,
          currency: null,
          position: 'none'
        })

        this.$emit('done')
      } catch (error) {
        this.error = error
      }

      this.isProcessing = false
    }
  }
}
</script>
