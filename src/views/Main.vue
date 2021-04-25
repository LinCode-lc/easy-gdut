<template>
  <div id="main">
    <Search class="search"></Search>
    <el-col :span="22" class="main-content">
      <div v-for="(item, index) in records" :key="index" class="card-item">
        <Card :cardMessage="item"></Card>
      </div>
      <pagination
        v-show="page.total > 0"
        :total="page.total"
        :page.sync="page.current"
        :limit.sync="page.size"
        @pagination="init"
      />
    </el-col>

    <!-- <el-col :span="2">
      <b-button
        type="is-danger"
        tag="router-link"
        :to="{ path: '/post/create' }"
        outlined
        >✍ 发表想法</b-button
      >
    </el-col> -->
  </div>
</template>

<script>
import Card from "../components/content/Card";
// import Card2 from "../components/content/Card2"
import { getList } from "@/network/main.js";
import Pagination from "@/components/common/Pagination";
import Search from "@/components/common/Search";
export default {
  name: "Main",
  components: {
    Card,
    // Card2,
    Pagination,
    Search
  },
  data() {
    return {
      activeName: "latest",
      records: [],
      page: {
        current: 1,
        size: 5,
        total: 20,
        tab: "latest"
      }
    };
  },
  created() {
    this.init(this.tab);
  },

  methods: {
    init(tab) {
      getList(this.page.current, this.page.size, tab).then(response => {
        const { data } = response;
        // this.page.current = data.current
        // console.log(data);
        this.page.total = data.total;
        this.page.size = data.size;
        this.records = data.records;
      });
    }
    // handleClick(tab) {
    //   this.page.current = 1
    //   this.init(tab.name)
    // }
  }
};
</script>

<style scoped>
.card-item {
  display: inline-block;
  width: 300px;
  margin-left: 20px;
  margin-top: 50px;
}
#main {
  height: 100%;
}
.search {
  z-index: 1;
  position: fixed;
  height: 60px;
  width: 1800px;
  background-color: #fff;
}
.main-content {
  margin-top: 65px;
}
</style>