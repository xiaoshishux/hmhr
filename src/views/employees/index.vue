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
          <el-button type="primary" size="small" @click="addEmpShowDialogFn"
            >新增员工</el-button
          >
        </template>
      </page-tools>
      <el-card style="margin-top: 10px">
        <el-table
          border
          :data="employeesList"
          :default-sort="{ prop: 'workNumber' }"
        >
          <el-table-column label="序号" type="index" />
          <el-table-column label="姓名" prop="username" />
          <el-table-column label="头像" prop="staffPhoto" />
          <el-table-column label="手机号" prop="mobile" />
          <el-table-column
            label="工号"
            prop="workNumber"
            sortable
            :sort-method="workNumberSortFn"
          />
          <el-table-column
            label="聘用形式"
            prop="formOfEmployment"
            :formatter="formatter"
          />
          <el-table-column label="部门" prop="departmentName" />
          <el-table-column label="入职时间" prop="timeOfEntry">
            <template v-slot="{ row }">
              <span>
                {{ parseTime(row.timeOfEntry, "{yyyy}-{mm}-{dd}") }}
              </span>
            </template> </el-table-column
          >>
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
      <!-- 新增员工弹窗组件 -->
      <el-dialog title="新增员工" :visible.sync="showDialog">
        <emp-dialog :s-dialog.sync="showDialog" :tree-data="treeData" />
      </el-dialog>
    </div>
  </div>
</template>

<script>
// 导入组件
import PageTools from "@/components/PageTools";
import EmpDialog from "./components/empDialog.vue";
import { getEmployeeListAPI, departmentsListAPI } from "@/api";
import { transTree } from "@/utils";
import Employees from "@/api/constant/employees";
import { parseTime } from "@/utils";
export default {
  name: "Employees",
  data() {
    return {
      query: {
        page: 1, // 页码
        size: 10, // 每页条数
      },
      employeesList: [], // 员工列表
      total: 0, // 数据总条数
      showDialog: false, // 添加员工组件的展示
      treeData: [], // 存储部门列表(树结构)
    };
  },
  components: {
    PageTools, // 导入自定义组件
    EmpDialog,
  },
  created() {
    // 调用获取员工列表的方法
    this.getEmployeesList();
    // 调用获取部门列表的方法
    this.getDepartments();
  },
  methods: {
    // 获取员工列表
    async getEmployeesList() {
      const res = await getEmployeeListAPI(this.query);
      console.log(res);
      // gengen根据返回的状态码给用户提示
      if (!res.success) return this.$message.error(res.message);
      // 将返回的结果赋值 data 中的数据
      this.employeesList = res.data.rows;
      this.total = res.data.total;
    },
    // 格式化表格的某一项
    formatter(row, colum, cellValue, index) {
      // 用数组的 find 方法找到 id = 1 的元素，再取出它的 value
      const obj = Employees.hireType.find((item) => item.id === cellValue);
      return obj ? obj.value : "未知";
    },
    // 格式化入职时间
    parseTime,
    // 员工列-自定义排序
    workNumberSortFn(a, b) {
      // 打印a和b发现是表格数组里的对象
      // sort方法使用:
      // 如果return小于0, 那么 a 会被排列到 b 之前
      // 如果return等于0, 那么 a 和 b 位置不变
      // 如果return大于0, 那么 a 会被排列到 b 之后
      return parseInt(a.workNumber) - parseInt(b.workNumber);
    },
    // 每页显示的条数发生改变时触发
    handleSizeChange(newPage) {
      this.query.size = newPage;
      this.getEmployeesList();
    },
    // 当前页面发生改变时触发
    handleCurrentChange(newPage) {
      this.query.page = newPage;
      this.getEmployeesList();
    },
    // 新增加员工-点击出弹窗
    addEmpShowDialogFn() {
      this.showDialog = true;
    },
    // 获取树形组件的数据
    async getDepartments() {
      const res = await departmentsListAPI();
      if (!res.success) return this.$message.error(res.message);
      this.treeData = transTree(res.data.depts, "");
      console.log(this.transTree);
    },
  },
};
</script>

<style lang="scss" scoped></style>