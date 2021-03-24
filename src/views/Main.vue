<template>
    <div id="main">
        
        <el-col :xs="24" :sm="5">
          <Card></Card>
        </el-col>

        <el-col :xs="24" :sm="5">
          <Card2></Card2>
        </el-col>

        <el-col :xs="24" :sm="5">
          <Card></Card>
        </el-col>

        <el-col :xs="24" :sm="5">
          <Card2></Card2>
        </el-col>

        <el-col :xs="24" :sm="5">
          <Card></Card>
        </el-col>

        <el-col :xs="24" :sm="5">
          <Card></Card>
        </el-col>

        <pagination
        v-show="page.total > 0"
        :total="page.total"
        :page.sync="page.current"
        :limit.sync="page.size"
        @pagination="init"
      />
    </div>
</template>

<script>
import Card from "../components/content/Card"
import Card2 from "../components/content/Card2"
import { getList } from '@/network/main.js'
import Pagination from "@/components/common/Pagination"
export default {
    name:"Main",
    components:{
    Card,
    Card2,
    Pagination
    },
     data() {
        return {
            activeName: 'latest',
            articleList: [],
            page: {
            current: 1,
            size: 10,
            total: 0,
            tab: 'latest'
           
      }
    }
  },
    created() {
    this.init(this.tab)
    
  },
  methods: {
    init(tab) {
      getList(this.page.current, this.page.size, tab).then((response) => {
        const { data } = response
        this.page.current = data.current
        this.page.total = data.total
        this.page.size = data.size
        this.articleList = data.records
      
      })
    },
    // handleClick(tab) {
    //   this.page.current = 1
    //   this.init(tab.name)
    // }
  }
}
</script>

<style scoped>

</style>