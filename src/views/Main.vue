<template>
    <div id="main">
     
        
        <el-col :xs="24"  v-for="(item, index) in articleList" :key="index" class="card-item">
          <Card :cardMessage="item"></Card>
        </el-col>
        
      
       <el-col  :sm="{span:24,offset:8}" >
        <pagination
        v-show="page.total > 0"
        :total="page.total"
        :page.sync="page.current"
        :limit.sync="page.size"
        @pagination="init"
      />
      </el-col>
    
      
      
    </div>
    
</template>

<script>
import Card from "../components/content/Card"
// import Card2 from "../components/content/Card2"
import { getList } from '@/network/main.js'
import Pagination from "@/components/common/Pagination"
export default {
    name:"Main",
    components:{
    Card,
    // Card2,
    Pagination
    },
     data() {
        return {
            activeName: 'latest',
            articleList: [],
            page: {
            current: 1,
            size: 5,
            total: 20,
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
.card-item{
 
  width: 350px;
  margin-left: 20px;
  margin-top:50px;
}
</style>