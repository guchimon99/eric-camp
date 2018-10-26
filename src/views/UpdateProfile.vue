<template>
  <div class="scene scene-actionBar scene-navBar">
    <nav-bar
      title="プロフィール設定"
      left="キャンセル"
      @left-action="$emit('cancel')" />

    <section class="section">
      <form @submit.prevent="onSubmit">
        <div class="form-group">
          <label for="updateProfileDisplayName">名前</label>
          <input
            id="updateProfileDisplayName" class="form-control" v-model="displayName"
            type="text" minlength="2" placeholder="あなたの名前" required />
        </div>
        <div class="form-group">
          <label for="updateProfileIcon">アイコン</label>
          <div class="d-flex align-items-center mb-2">
            <div class="mr-3 form-icon">
              <img v-if="icon" :src="icon" class="w-100" />
              <img v-else src="https://dummyimage.com/120/EEE/CCC.png&text=No+Icon" class="w-100" />
            </div>
            <div class="d-flex flex-column">
              <label for="updateProfileIcon" class="btn btn-outline-primary mb-3">ファイルを選択</label>
              <div @click="onResetIcon" class="text-danger">アイコンを削除</div>
            </div>
            <input id="updateProfileIcon" type="file" @change="onChangeFile" class="from-control" style="display:none;" />
            <div v-if="iconError" class="alert alert-danger">
              {{ iconError.message }}
            </div>
          </div>
          <div v-if="error" class="alert alert-danger">
            {{ error.message }}
          </div>
        </div>
        <div class="form-group mb-0">
          <button type="submit" class="btn btn-primary btn-block">保存する</button>
        </div>
      </form>
    </section>
    <processing :isShown="isProcessing" />
  </div>
</template>

<script>

import { mapActions, mapState } from 'vuex'

import NavBar from '@/components/NavBar.vue'
import Processing from '@/components/Processing.vue'

export default {
  name: 'update-profile',
  components: {
    'nav-bar': NavBar,
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
      displayName: '',
      icon: '',
      error: null,
      iconError: null,
      isProcessing: false
    }
  },
  methods: {
    ...mapActions([
      'updateProfile'
    ]),
    onResetIcon () {
      const input = document.querySelector('#updateProfileIcon')
      input.value = null
      this.icon = null
    },
    onChangeFile (event) {
      this.iconError = null

      try {
        const files = event.target.files
        if (!files) throw new Error('ファイルが選ばれていません')

        const file = files[0]
        if (!file.type.match(/image\/png|image\/jpeg|image\/gif/)) throw new Error(file.type + 'が選ばれています。JPG/PNG/GIFファイルを選んでください。')

        if (file.size > 200000) throw new Error('ファイルサイズが大きすぎます。')

        const reader = new FileReader()

        reader.onload = (e) => {
          this.icon = e.target.result
        }

        reader.readAsDataURL(file)
      } catch (error) {
        this.iconError = error
      }
    },
    async onSubmit () {
      const { id, displayName, icon } = this

      this.error = null
      this.isProcessing = true

      try {
        await this.updateProfile({ id, displayName, icon })
        this.$emit('done')
      } catch (error) {
        this.error = error
      }

      this.isProcessing = false
    }
  },
  created () {
    const { id, displayName, icon } = this.players[this.user.uid]
    this.id = id
    this.displayName = displayName
    this.icon = icon
  }
}
</script>

<style lang="scss" scoped>
.form-icon {
  width: 80px;
  height: 80px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
}
</style>
