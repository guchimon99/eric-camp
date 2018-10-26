<template>
  <div class="scene scene-actionBar scene-navBar">
    <nav-bar
      title="ログイン"
      left="キャンセル"
      @left-action="$emit('cancel')" />

    <section class="section">
      <form @submit.prevent="onSubmit">
        <div class="form-group">
          <label for="signInEmail">メールアドレス</label>
          <input
            id="signInEmail" class="form-control" v-model="email"
            type="email" minlength="2" placeholder="user@example.com" required />
        </div>
        <div class="form-group">
          <label for="signInPassword">パスワード</label>
          <input
            id="signInPassword" class="form-control" v-model="password"
            type="password"  minlength="8" placeholder="半角英数8文字以上" required autocomplete />
        </div>
        <div v-if="error" class="alert alert-danger mx-3">
          {{error.message}}
        </div>
        <div class="form-group mb-0">
          <button class="btn btn-primary btn-block">ログインする</button>
        </div>
      </form>
    </section>

    <p class="text-center px-2 my-3 text-muted">
      アカウントをお持ちでないですか？ <button class="btn btn-sm btn-link" @click="$emit('show-sign-up')">アカウントを作成する</button>
    </p>

    <processing :isShown="isProcessing" />
  </div>
</template>

<script>

import { mapActions } from 'vuex'

import NavBar from '@/components/NavBar.vue'
import Processing from '@/components/Processing.vue'

export default {
  name: 'sign-in',
  components: {
    'nav-bar': NavBar,
    'processing': Processing
  },
  data () {
    return {
      email: '',
      password: '',
      error: null,
      isProcessing: false
    }
  },
  methods: {
    ...mapActions({
      signIn: 'signIn'
    }),
    async onSubmit () {
      let { email, password } = this
      this.isProcessing = true

      try {
        await this.signIn({ email, password })
        this.$emit('done')
      } catch (error) {
        this.error = error
      }

      this.isProcessing = false
    }
  }
}
</script>
