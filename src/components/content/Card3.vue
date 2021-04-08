<template>
<div class="card3">
<b-card title="Lv限量手提包"
    img-src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1495792956,1349323440&fm=26&gp=0.jpg"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem;"
    class="mr-4">
    <b-card-text>
      Luxury is not in the name, we use quality to prove
    </b-card-text>
      <b-button href="#" class="btn btn-dark mr-4"  @click="addcollection">{{ collect ? "❤️" : "🤍" }}收藏</b-button>
<b-button  tag="router-link" :to="{path:'/details'}" class="btn btn-warning mr-4">查看</b-button>
    <el-dropdown trigger="click">
  <span class="el-dropdown-link">
    点我查看<i class="el-icon-caret-bottom el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item class="clearfix">
      评论
      <el-badge class="mark" :value="100" :max="99" />
    </el-dropdown-item>
    <el-dropdown-item class="clearfix">
      回复
      <el-badge class="mark" :value="34"  :max="99" />
    </el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
  </b-card>
  </div>
  </template>


<script>
export default {
  name: "card3",
  data() {
    return {
      currentDate: new Date(),
       collect:false
    };
  },
  methods:{
     addcollection(){
        if(this.collect){
          this.collect = false;
        }else{
          this.collect = true;
        }
      },
  }
};
</script>

