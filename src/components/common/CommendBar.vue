<template>
    <div id="commend-bar">
      
        <el-col class="rightbar" :span="4">
            <div>
                <button class="el-icon-chat-round"></button>
                <span>评论</span>
            </div>
            <div>
                <button class="el-icon-star-off"></button>
                <span>收藏</span>
            </div>
            <div>
                <button class="el-icon-thumb"></button>
                <span>点赞</span>
            </div>
            <div>
                <button class="el-icon-paperclip"></button>
                <span>转发</span>
            </div>
            
        </el-col>

        
          <!-- <i class="el-icon-chat-round" style="font-size:200%;"></i>
        
      
          <i class="el-icon-star-off" style="font-size:200%;"></i>
         
     
          <i class="el-icon-thumb" style="font-size:200%;"></i>
         
      
      
          <i class="el-icon-paperclip" style="font-size:200%;"></i>
           -->
      
    </div>
</template>

<script>
export default {
    name:'CommendBar'
}
</script>

<style scoped>
.rightbar button{
    display: block;
    background-color: #fff;
    border-radius: 50%;
    font-size: 25px;
    font-weight: 400;
    padding: 10px;
    border:1px solid blanchedalmond;
    outline:none;
    margin-bottom: 5px;
    
}
.rightbar div{
    margin: 15px 0;
    text-align: center;
}
</style>