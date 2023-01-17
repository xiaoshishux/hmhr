<template>
  <div class="employees-container">
    <div class="app-container">
      <!-- 通用工具栏组件使用 -->
      <page-tools>
        <!-- 自定义左侧内容 -->
        <template #slot-left>
          <span>共 19 条记录</span>
        </template>

        <!-- 自定义右侧内容 -->
        <template #slot-right>
          <el-button type="danger" size="small">导入excel</el-button>
          <el-button type="success" size="small">导出excel</el-button>
          <el-button type="primary" size="small">新增员工</el-button>
        </template>
      </page-tools>
      <el-card style="margin-top: 10px">
        <el-table border>
          <el-table-column label="序号" />
          <el-table-column label="姓名" />
          <el-table-column label="头像" />
          <el-table-column label="手机号" />
          <el-table-column label="工号" />
          <el-table-column label="聘用形式" />
          <el-table-column label="部门" />
          <el-table-column label="入职时间" />
          <el-table-column label="操作" width="280">
            <template>
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">分配角色</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <!-- 分页区域 -->
          <el-pagination
            :current-page="query.page"
            :page-sizes="[10, 15, 20, 25]"
            :page-size="query.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
// 导入组件
import PageTools from "@/components/PageTools";
import {getEmployeeListAPI} from "@/api"

export default {
  name:"Employees",
  data() {
    return {
      query: {
        page: 1, // 页码
        size: 10, // 每页条数
      },
      employeesList: [], // 员工列表
      total: 0, // 数据总条数
    };
  },
  components: {
    PageTools, // 导入自定义组件
  },
  created(){
    // 调用获取员工列表的方法
    this.getEmployeesList()
  },
  methods: {
    // 获取员工列表
   async getEmployeesList(){
      const res = await getEmployeeListAPI(this.query)
      console.log(res)
    },
    // 每页显示的条数发生改变时触发
    handleSizeChange() {},
    // 当前页面发生改变时触发
    handleCurrentChange() {},
  },
};
</script>

<style lang="scss" scoped></style>