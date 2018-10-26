<template>
  <div class="activity">
    <div class="activity_icon">
      <img v-if="activity.playerIcon" :src="activity.playerIcon" :alt="activity.player + 'のアイコン'" />
      <img v-else src="https://dummyimage.com/300/CCC/999.png&text=No+Icon" :alt="activity.player + 'のアイコン'" />
    </div>
    <div class="activity_content">
      <div class="activity_player">{{activity.playerDisplayName}}</div>
      <div class="activity_message">{{activity.content}}</div>
      <div class="activity_date">{{activity.createdAt}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Activity',
  props: {
    activity: Object
  }
}
</script>

<style lang="scss" scoped>
.activity {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 16px 8px;
  background-color: #111;
  border-bottom: 1px #1C1C1C solid;
  &_icon {
    width: 48px;
    height: 48px;
    margin-right: 12px;
    background: #111;
    flex-shrink: 0;
    border-radius: 4px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
  &_content {
    flex-grow: 1;
  }
  &_player {
    font-size: 14px;
    font-weight: bold;
  }
  &_message {
    font-size: 15px;
    line-height: 2;
    margin-bottom: 8px;
  }
  &_date {
    color: #CCC;
    text-align: right;
    font-size: 10px;
    margin-bottom: -4px;
  }
}
</style>
