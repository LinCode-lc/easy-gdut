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
    </div>
</template>

<script>
import Card from "../components/content/Card"
import Card2 from "../components/content/Card2"
export default {
    name:"Main",
    components:{
    Card,
    Card2
    }
}
</script>

<style scoped>

</style>