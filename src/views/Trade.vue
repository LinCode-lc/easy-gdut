<template>

    <div id="trade">
        <el-tag
        :key="tag"
        v-for="tag in dynamicTags"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)">
        {{tag}}
       </el-tag>
       <el-input
       class="input-new-tag"
       v-if="inputVisible"
       v-model="inputValue"
       ref="saveTagInput"
       size="small"
       @keyup.enter.native="handleInputConfirm"
       @blur="handleInputConfirm"
      >
</el-input>
<el-button v-else class="button-new-tag" size="small" @click="showInput" style="font-size:13px">+添加条件</el-button>
        <br>
        <br>
        <el-switch v-model="value1" inactive-text="最新发布" class="mr-4"></el-switch>
        <el-switch v-model="value2" inactive-text="最多点赞" class="mr-4"></el-switch>
        <el-switch v-model="value3" inactive-text="最多评论" class="mr-4"></el-switch>
        <el-switch v-model="value4" inactive-text="最多收藏" class="mr-4"></el-switch>

        <br>
        <br>
      <b-card-group columns-count=4>
       <b-col :xs="5" :sm="50">
          <Card3></Card3>
        </b-col>
        <b-col :xs="5" :sm="50">
          <Card3></Card3>
        </b-col>
        <b-col :xs="5" :sm="50">
          <Card3></Card3>
        </b-col>
        <b-col :xs="5" :sm="50">
          <Card3></Card3>
        </b-col>
        <b-col :xs="5" :sm="50">
          <Card3></Card3>
        </b-col>
        <b-col :xs="5" :sm="50">
          <Card3></Card3>
        </b-col>
         <b-col :xs="5" :sm="50">
          <Card3></Card3>
        </b-col>
        </b-card-group>
</div>

</template>



<script>
import Card3 from "../components/content/Card3" 
  export default {
    name:"Trade",
    components:{
    Card3
    },
    data() {
      return {
        value1: false,
        value2: false,
        value3: false,
        value4: false,
        dynamicTags: ['手机', 'IPhone', '新款','3000-4000'],
        inputVisible: false,
        inputValue: '',
        collect:false
      };
    },
    methods: {
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(() => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      
      addcollection(){
        if(this.collect){
          this.collect = false;
        }else{
          this.collect = true;
        }
      },
    }
  }
</script>


<style>
  .el-tag + .el-tag {
    margin-left: 10px;
    font-size:13px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
