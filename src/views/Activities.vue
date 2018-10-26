<template>
  <div class="scene scene-actionBar scene-navBar">
    <div class="activityList">
      <div class="activityList_row" v-for="activity in activities" :key="activity.id">
        <activity :activity="activity" />
      </div>
    </div>
    <nav-bar title="アクティビティ" :fixed="true" />
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

import NavBar from '@/components/NavBar.vue'
import Activity from '@/components/Activity.vue'

export default {
  name: 'activites',
  components: {
    'nav-bar': NavBar,
    'activity': Activity
  },
  computed: {
    ...mapGetters({
      activities: 'timelineActivites'
    })
  }
}
</script>

<style lang="scss" scoped>
.activityList {
  background-color: #111;
  border-top: solid #1C1C1C 1px;
}
</style>
