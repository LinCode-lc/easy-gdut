<template>
  <el-table
    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
    <el-table-column
      label="发布日期"
      prop="date">
    </el-table-column>
    <el-table-column
      label="科目"
      prop="name">
    </el-table-column>
    <el-table-column
      align="right">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"/>
      </template>
      <template slot-scope="scope">
        <router-link :to="{name:'StudyDetail',params:{id:scope.row.address}}">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        </router-link>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
    name:"Catagory",
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '经济学',
          address: '16162'
        }, {
          date: '2016-05-04',
          name: '运筹学',
          address: '91651'
        }, {
          date: '2016-05-01',
          name: '马原',
          address: '15619'
        }, {
          date: '2016-05-03',
          name: '大英',
          address: '156165'
        }],
        search: ''
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(row.address);
        
        this.$router.push(row.address)
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    },
}
</script>