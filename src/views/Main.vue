<template>
  <div id="main">
    <Search class="search"></Search>
    <!-- <el-col :span="22" class="main-content"> -->
    <!-- <div v-for="(item, index) in records" :key="index" class="card-item">
        <Card :cardMessage="item"></Card>
      </div> -->
    <div class="cardlist">
      <div v-for="(item, index) in records" :key="index" class="nine-square">
        <NineSquare :cardMessage="item"></NineSquare>
      </div>
    </div>
    <pagination
      v-show="page.total > 0"
      :total="page.total"
      :page.sync="page.current"
      :limit.sync="page.size"
      @pagination="init"
    />
    <!-- </el-col> -->

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
import NineSquare from "../components/content/NineSquare";
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
    Search,
    NineSquare
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
#main {
  height: 100%;
  width: 100%;
  background-color: rgb(241, 246, 250);
}
.search {
  /* z-index: 1; */
  /* position: fixed; */
  padding-left: 1.875rem /* 30/16 */;
  padding-top: 3.125rem /* 50/16 */;
  margin-bottom: 1.875rem /* 30/16 */;
  height: 3.75rem /* 60/16 */;
  width: 80%;
  background-color: rgb(241, 246, 250);
}
/* .main-content {
  margin-top: 65px;
} */
.cardlist {
  width: 85%;
  /* height: 400px; */
  padding-left: 1.875rem /* 30/16 */;
  height: 75rem /* 1200/16 */;
  padding-top: 2.5rem /* 40/16 */;

  /* background-color: rgb(241, 246, 250); */

  /* column-width: 100%; */

  column-count: 3;

  column-gap: 0;
  /* display: flex;
  flex-direction: column;
  flex-wrap: wrap; */
}
.nine-square {
  break-inside: avoid;
  /* width: 25%; */
  margin: 15px 0;
}
</style>