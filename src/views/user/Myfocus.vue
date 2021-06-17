<template>
  <div id="myfocus">
    <a-divider id="tt">全部关注</a-divider>
    <a-list
      item-layout="horizontal"
      :data-source="data"
      :pagination="pagination"
    >
      <a-list-item slot="renderItem" slot-scope="item">
        <span></span>
        <a-button
          class="bt"
          type="default"
          style="background-color:#E5E9EF;color:#6D757A"
          slot="actions"
          @click="focus(item.key), Deletefocus(item.key)"
          v-if="!isfocu[item.key]"
          >已关注</a-button
        >
        <a-button
          type="default"
          slot="actions"
          @click="focus(item.key), Addfocus(item.key)"
          v-else
          >关注</a-button
        >
        <a-dropdown slot="actions">
          <a-menu slot="overlay">
            <a-menu-item key="1">
              举报
            </a-menu-item>
            <a-menu-item key="2">
              不感兴趣
            </a-menu-item>
          </a-menu>
          <a-button icon="more"></a-button>
        </a-dropdown>
        <a-list-item-meta :description="item.userStatement">
          <a
            slot="title"
            href="javascript:false"
            @click="clickother(item.userId)"
            ><span class="a">{{ item.userName }}</span></a
          >
          <a-avatar
            slot="avatar"
            :src="item.userAvatar"
            @click="clickother(item.userId)"
            style="width:70px;height:70px;cursor: pointer;"
          />
        </a-list-item-meta>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import { getFocusList, addfocus, cancelfocus } from "@/network/post.js";
export default {
  name: "myfocus",
  data() {
    return {
      data: [],
      isfocu: [],
      pagination: {
        pageSize: 6
      }
    };
  },
  methods: {
    focus(key) {
      this.$set(this.isfocu, key, !this.isfocu[key]);
      if (this.isfocu[key]) {
        this.$message.success("已取消关注", 0.1);
      } else {
        this.$message.success("已成功关注", 0.1);
      }
    },

    Addfocus(key) {
      addfocus(this.data[key].userId, 1).then(response => {
        console.log("已关注");
      });
    },

    Deletefocus(key) {
      cancelfocus(this.data[key].userId).then(response => {
        console.log("已取消关注");
      });
    }
  },
  methods: {
    clickother(userId) {
      this.$router.push({ path: "/Otheruser/", query: { Id: userId } });
    }
  },
  created() {
    getFocusList().then(response => {
      this.data = response.data.records;
      let focuList = this.data;
      for (let i = 0; i < focuList.length; i++) {
        focuList[i].key = i;
      }
    });
  }
};
</script>
<style>
#myfocus {
  margin-top: 5px;
  box-shadow: 10px 10px 5px 5px #888888;
  /* background-color:#c3d7df ;     */
  margin-left: 300px;
  width: 900px;
  height: 695px;
}
#tt {
  font-size: 30px;
}
.bt {
  padding: 4px 11px 4px 11px;
}
.a:hover {
  text-decoration: underline;
}
.a {
  color: rgb(251, 114, 153);
}
</style>

  