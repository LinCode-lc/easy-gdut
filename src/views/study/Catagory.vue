<template>
  <div id="studyCatagory">
    <el-table
      :data="
        tableData.filter(
          data =>
            !search || data.name.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 80%"
    >
      <el-table-column label="文件" prop="name"> </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <!-- <router-link
            :to="{ name: 'StudyDetail', params: { id: scope.row.address } }"
          >
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >Edit</el-button
            >
          </router-link> -->
          <el-button
            size="mini"
            type="danger"
            @click="handleEdit(scope.$index, scope.row)"
            >打开</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getmaterialList } from "@/network/main.js";
export default {
  name: "Catagory",
  data() {
    return {
      tableData: [
        {
          name: "经济学",
          uri: "16162"
        },
        {
          name: "运筹学",
          uri: "91651"
        },
        {
          name: "马原",
          uri: "15619"
        },
        {
          name: "大英",
          uri: "156165"
        }
      ],
      search: ""
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(row.uri);
      window.open(row.uri);

      // this.$router.push(row.address);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  },
  created() {
    getmaterialList().then(res => {
      console.log(res);
      this.tableData = res.data;
    });
    // /post/materialList
  }
};
</script>

<style scoped >
#studyCatagory {
  height: 100%;
  width: 100%;
  background-color: var(--themeColor);
  position: relative;
  padding-bottom: 3000px;
  margin-bottom: 3000px;
  padding-left: 3.75rem /* 300/16 */;
  padding-top: 1.75rem /* 300/16 */;
}
.el-button--danger {
  background-color: var(--subjectColor) !important;
  border-color: var(--subjectColor) !important;
}
</style>


