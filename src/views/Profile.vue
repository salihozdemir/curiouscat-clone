<template>
  <div>
    <app-profile-cover></app-profile-cover>
    <a-row type="flex">
      <a-col :span="8">
        <app-ask-message></app-ask-message>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import ProfileCover from '@/components/ProfileCover';
import AskMessage from '@/components/AskMessage';
export default {
  components: {
    appProfileCover: ProfileCover,
    appAskMessage: AskMessage
  }
};
</script>
<style scoped></style>
