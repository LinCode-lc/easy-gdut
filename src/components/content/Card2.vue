<template>
  <el-row class="card">
    <el-col :span="24">
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
                <span class="username">小明他爸爸</span>
              </el-row>
              <el-row>
                <span class="createtime">6分钟前</span>
              </el-row>
            </el-col>
          </el-row>

          <span>好吃上课立法保护理念上的可不能但是看了你吧......</span>
          <div class="bottom clearfix">
            <span class="tags">  #JAVA </span>
            <span class="tags">  #Python </span>

                      <span class="scan">浏览:8</span>
            
          </div>
        </div>

        <el-row>
          <img
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            class="image"
          />
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "Card2",
  data() {
    return {
      currentDate: new Date()
    };
  }
};
</script>

<style scoped>
.time {
  font-size: 13px;
  color: #999;
}

.username{
    font-size: 15px;
    font-weight: 700;
}

.createtime{
    font-size: 8px;
    color:#999
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
.tags{
    color: cadetblue;
}
.scan{
   float: right;
   font-size: 10px;
   color: #999;
   margin-bottom: 5px;
}
.card{
    margin: 8px;
}
</style>