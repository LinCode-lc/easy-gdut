<template>
  <div id="topic" >
    <el-col :span="24">
      
        <div class="demo-basic--circle">
          <!-- <div class="block"><el-avatar shape="square" :size="50" :src="squareUrl"></el-avatar></div> -->
          <div class="block" v-for="size in sizeList" :key="size">
            <el-row>
              <el-col :span="2">
                <el-avatar
                  shape="square"
                  :size="size"
                  :src="squareUrl"
                ></el-avatar>
              </el-col>
              <el-col :span="2">
                <div>小明</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="18">
                就开始了看看收到能看出上课
              </el-col>
              
            </el-row>
            <el-row >
              <el-col :span="5">
                <div class="demo-image">
                  <div class="block" >               
                    <el-image
                      style="width: 100px; height: 100px"
                      :src="url"
                      fit="fit"
                    ></el-image>
                  </div>
                </div>
              </el-col>
              <el-col :span="5">
                <div class="demo-image">
                  <div class="block" >               
                    <el-image
                      style="width: 100px; height: 100px"
                      :src="url"
                      fit="fit"
                    ></el-image>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
     
    </el-col>
  </div>
</template>

<script>
export default {
  name: "Topic",
  data() {
    return {
      squareUrl:
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      sizeList: ["large"],
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    };
  }
};
</script>

<style scoped>

</style>