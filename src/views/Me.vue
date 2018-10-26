<template>
  <div class="scene scene-actionBar scene-navBar">
    <nav-bar
      title="プロフィール"
      :fixed="true" />
    <div v-if="user">
      <section class="section mb-3">
        <update-status v-if="myPlayer" />
      </section>
      <div class="menu">
        <button class="menu_item" @click="showUpdateProfile">アカウント設定</button>
        <button class="menu_item menu_item-danger" @click="signOut">ログアウト</button>
      </div>
    </div>
    <div v-else>
      <div class="menu">
        <button class="menu_item" @click="showSignUp">アカウント作成</button>
        <button class="menu_item" @click="showSignIn">ログイン</button>
      </div>
    </div>

    <modal :isShown="isSignUpShown">
      <sign-up
        @cancel="hideAll"
        @done="hideAll"
        @show-sign-in="showSignIn" />
    </modal>
    <modal :isShown="isSignInShown">
      <sign-in
        @cancel="hideAll"
        @done="hideAll"
        @show-sign-up="showSignUp" />
    </modal>
    <modal :isShown="isUpdateProfileShown">
      <update-profile
        @cancel="hideAll"
        @done="hideAll" />
    </modal>
  </div>
</template>

<script>

import { mapState, mapActions } from 'vuex'

import store from '@/store'

import SignUp from '@/views/SignUp.vue'
import SignIn from '@/views/SignIn.vue'
import UpdateProfile from '@/views/UpdateProfile.vue'
import UpdateStatus from '@/views/UpdateStatus.vue'

import NavBar from '@/components/NavBar.vue'
import Modal from '@/components/Modal.vue'

export default {
  name: 'me',
  store,
  components: {
    'nav-bar': NavBar,
    'modal': Modal,
    'sign-in': SignIn,
    'sign-up': SignUp,
    'update-profile': UpdateProfile,
    'update-status': UpdateStatus
  },
  data () {
    return {
      mode: 'default'
    }
  },
  computed: {
    ...mapState([
      'user',
      'players'
    ]),
    isSignUpShown () {
      return this.mode === 'sign-up'
    },
    isSignInShown () {
      return this.mode === 'sign-in'
    },
    isUpdateProfileShown () {
      return this.mode === 'update-profile'
    },
    myPlayer () {
      return this.players[this.user.uid]
    }
  },
  methods: {
    ...mapActions({
      signOut: 'signOut'
    }),
    showSignIn () {
      this.mode = 'sign-in'
    },
    showSignUp () {
      this.mode = 'sign-up'
    },
    showUpdateProfile () {
      this.mode = 'update-profile'
    },
    hideAll () {
      this.mode = 'default'
    }
  }
}
</script>

<style lang="scss" scoped>
.menu {

  margin: 0 0 15px;

  padding-left: 24px;

  border-top: solid #1C1C1C 1px;
  border-bottom: solid #1C1C1C 1px;
  background-color: #111;

  &_item{
    color: #FFF;
    background-color: transparent;
    display: block;
    width: 100%;
    border: none;
    border-bottom: solid #1C1C1C 1px;
    padding: 0 8px;
    line-height: 50px;
    text-align: left;

    &-danger {
      color: var(--red);
    }

    &:focus, &:active {
      outline: none;
      background-color: rgba(0,0,0,0.1);
    }

    &:last-child {
      margin-bottom: -1px;
    }
  }
}
</style>
