<template>
  <div class="user">
    <div class="user-img">
      <img :src="avatar ? avatar : require('./img/icon/avatar.jpg')" />
    </div>
  </div>
</template>


<script>
export default {
  props: {
    avatar: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      comment: ""
    };
  }
};
</script>

<style type="text/css" scoped>
.user {
  height: 3.125rem /* 50/16 */;
  width: 3.125rem /* 50/16 */;
}
.user-img img {
  height: 2.8125rem /* 45/16 */;
  width: 2.8125rem /* 45/16 */;
  border-radius: 50%;
}
</style>