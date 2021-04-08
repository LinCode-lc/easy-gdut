<template>
  <el-row class="card">
    <el-col :span="24">
      <router-link :to="{name:'TopicDetail',params:{id:cardMessage.id}}">
                     
      <el-card :body-style="{ padding: '0px' }">
        <!-- <el-row>
            <el-col :span="8">
                <img
                    src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                    class="image"
                    />
            </el-col>>
            <el-col :span="8">
                <img
                    src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                    class="image"
                    />
            </el-col>>
            <el-col :span="8">
                <img
                    src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                    class="image"
                    />
            </el-col>>
        </el-row>
         <el-row>
            <el-col :span="8">
                <img
                    src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                    class="image"
                    />
            </el-col>>
            <el-col :span="8">
                <img
                    src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                    class="image"
                    />
            </el-col>>
            <el-col :span="8">
                <img
                    src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                    class="image"
                    />
            </el-col>>
        </el-row> -->

        <div style="padding: 14px;">
          <el-row>
            <el-col :span="5">
              <el-avatar
                shape="circle"
                :size="40"
                src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
              ></el-avatar>
            </el-col>
            <el-col :span="12">
              <el-row>
                <span class="username">{{ cardMessage.username }}</span>
              </el-row>
              <el-row>
                
                <span class="createtime"
                  >发布于:{{
                    dayjs(cardMessage.createTime).format("YYYY/MM/DD hh:mm")
                  }}</span
                >
              </el-row>
            </el-col>
          </el-row>
          <span>{{ cardMessage.title }}</span>

          <div class="bottom clearfix">
            <span
              v-for="(tag, index) in cardMessage.tags"
              :key="index"
              class="tag is-hidden-mobile is-success is-light mr-1"
            >
              <router-link :to="{ name: 'tag', params: { name: tag.name } }">
                {{ "#" + tag.name }}
              </router-link>
            </span>

            <span class="is-hidden-mobile scan" >浏览:{{ cardMessage.view }}</span>

            
          </div>
        </div>

        <el-row>
          <img
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            class="image"
          />
        </el-row>
      </el-card>
      </router-link>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "Card",
  data() {
    return {
      currentDate: new Date()
    };
  },
  props: {
    cardMessage: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style scoped>
.time {
  font-size: 13px;
  color: #999;
}

.username {
  font-size: 15px;
  font-weight: 700;
}

.createtime {
  font-size: 8px;
  color: #999;
}
.scan{
  font-size: 8px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.card {
  margin: 8px;
}
</style>