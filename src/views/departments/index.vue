<template>
  <div class="departments-container">
    <div class="app-container">
      <!-- 卡片组件(分为头部和身体) -->
      <el-card class="box-card">
        <!-- 头部 -->
        <div slot="header" class="clearfix">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="组织导航" name="first">
              <el-row
                type="flex"
                justify="space-between"
                align="middle"
                class="department-headr"
              >
                <!-- 第一列20份 -->
                <el-col :span="20">
                  <i class="el-icon-s-home"></i>
                  <span class="company">江苏传智播客教育科技股份有限公司</span>
                </el-col>
                <!-- 第二列4份 -->
                <el-col :span="4">
                  <!-- 在容器范围里, 一行再分2列 -->
                  <el-row type="flex" justify="end">
                    <el-col>负责人</el-col>
                    <el-col>
                      <!-- 这个之前在头部导航右侧下拉菜单讲过 -->
                      <el-dropdown>
                        <span>
                          操作<i class="el-icon-arrow-down el-icon--right"
                        /></span>
                        <!-- 下拉项 -->
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item @click.native="add()"
                            >添加子部门</el-dropdown-item
                          >
                        </el-dropdown-menu>
                      </el-dropdown>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <!-- 在这里设置, 树形控件 -->
              <el-tree
                class="departments-tree"
                :data="treeData"
                :props="defaultProps"
                :default-expand-all="true"
              >
                <!-- 默认插槽  并且使用内部的数据进行自定义模板的渲染, scope.data 所以直接key解构赋值变量也是data(对应数据对象)-->
                <template #default="{ data }">
                  <el-row
                    type="flex"
                    justify="space-between"
                    align="middle"
                    style="height: 40px; width: 100%"
                  >
                    <!-- 部门名字 -->
                    <el-col :span="20">
                      <span>{{ data.name }}</span>
                    </el-col>
                    <!-- 功能操作区域 -->
                    <el-col :span="4">
                      <el-row type="flex" justify="end">
                        <!-- 两个内容 -->
                        <el-col>{{ data.manager }}</el-col>
                        <!-- 下拉菜单 element -->
                        <el-dropdown>
                          <span>操作<i class="el-icon-arrow-down" /></span>
                          <!-- 下拉菜单 -->
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="add(data)"
                              >添加子部门</el-dropdown-item
                            >
                            <el-dropdown-item @click.native="edit(data)"
                              >编辑部门</el-dropdown-item
                            >
                            <el-dropdown-item
                              v-if="data && !data.children"
                              @click.native="del(data)"
                              >删除部门</el-dropdown-item
                            >
                          </el-dropdown-menu>
                        </el-dropdown>
                      </el-row>
                    </el-col>
                  </el-row>
                </template>
              </el-tree>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-card>
    </div>
    <departDialog
      ref="departDialog"
      :dialog-visible.sync="showDepartDialog"
      :origin-list="originList"
      :employees-list="employeesList"
      :is-edit="isEdit"
      :parent-id="clickDepartId"
      @addDepartEV="addDepartmentsFn"
    />
  </div>
</template>

<script>
import { transTree } from "@/utils";
import {
  departmentsListAPI,
  getEmployeeSimpleAPI,
  addDepartmentsAPI,
  getDepartDetailAPI,
  updateDepartmentsAPI,
  delDepartmentAPI,
} from "@/api";
import departDialog from "./components/departDialog.vue";
export default {
  name: "Departments",
  components: {
    departDialog,
  },
  data() {
    return {
      activeName: "first", // 被激活的 Tab 标签页
      // 是否展示-添加子频道的弹出层
      showDepartDialog: false,
      employeesList: [], // 员工列表
      clickDepartId: "", // 部门的 id
      isEdit:fales, // 编辑状态（false未编辑）
      originList: [], // 用于弹窗内-校验部门code和name是否重复数据数组
      // 树形控件数据
      treeData: [
        {
          departName: "总裁办",
          name: "孙财",
        },
        {
          departName: "行政部",
          name: "罗晓晓",
        },
        {
          departName: "人事部",
          name: "安小晴",
          children: [
            {
              departName: "后勤部",
            },
          ],
        },
        {
          departName: "财务部",
          name: "",
          children: [
            {
              departName: "财务核算部",
            },
            {
              departName: "税务管理部",
            },
            {
              departName: "薪资管理部",
            },
          ],
        },
        {
          departName: "技术部",
          name: "",
          children: [
            {
              departName: "前端技术部",
            },
            {
              departName: "后端技术部",
            },
          ],
        },
        {
          departName: "运营部",
          name: "",
        },
        {
          departName: "市场部",
          name: "武高丽",
          children: [
            {
              departName: "市场部1",
            },
            {
              departName: "市场部2",
            },
          ],
        },
      ],
      // 定义结构显示
      defaultProps: {
        children: "children",
        label: "departName",
      },
    };
  },
  created() {
    // 获取部门列表方法
    this.getDepartMentsListFn();
    // 获取员工列表方法
    this.getEmployeesListFn();
  },
  methods: {
    // 获取部门列表方法
    async getDepartMentsListFn() {
      const res = await departmentsListAPI();
      // 格式化需要传递给子组件的数据
      this.originList = res.data.depts.map((item) => ({
        id: item.id,
        code: item.code,
        name: item.name,
        pid: item.pid,
      }));
      // console.log(res);
      this.treeData = transTree(res.data.depts, ""); // 因为后台返回的字段是id和pid而且根是空字符串, 如果不是需要自己改变transTree里判断条件等
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 正文部分-右侧的添加子部门
    add(data) {
      this.isEdit = false;
      if (data) {
        // 添加二级以下部门
        this.clickDepartId = data.id; // 保存当前部门id
      } else {
        // 添加一级部门(当前点击公司id为'')
        this.clickDepartId = "";
        // 我们可以看到一级部门的pid都是''
      }

      this.showDepartDialog = true; // 弹窗显示
    },
    // 右侧-编辑子部门
    async edit(data) {
      this.isEdit = true
      this.clickDepartId = data.id; // 编辑的部门 ID
      this.showDepartDialog = true; // 弹窗显示
      const res = await getDepartDetailAPI(data.id);
      this.$refs.departDialog.form = res.data; // 影响组件表单里对象
    },
    // 右侧-删除部分
    async del(data) {
      // 显示删除确认消息对话框
      const delRes = await this.$confirm(
        "此操作将永久删除部门, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "waring",
        }
      ).catch((err) => err);
      // 如果返回的结果是 cancel 说明用户取消了删除
      if (delRes === "cancel") return this.$message("您取消了删除");

      // 调用删除接口
      const delDeparRes = await delDepartmentAPI(data.id);
      // 根据状态值，查看是否删除成功
      if (!delDeparRes.success) return this.$message.error(delDeparRes.message);
      // 删除成功需要给用户进行提示
      this.$message.success(delDeparRes.message);
      // 删除后需要重新获取当前页面数据
      this.getDepartMentsListFn();
    },
    // 获取员工列表方法
    async getEmployeesListFn() {
      const res = await getEmployeeSimpleAPI();
      // console.log(res)
      this.employeesList = res.data;
    },
    // 新增-添加部门的方法
    async addDepartmentsFn(dataObj) {
      if (this.isEdit) {
        // 编辑状态
        dataObj.id = this.clickDepartId;
        const res = await updateDepartmentsAPI(dataObj);
        console.log(res);
      } else {
        //新增状态
        dataObj.pid = this.clickDepartId;
        const res = await addDepartmentsAPI(dataObj);
        // console.log(res);
      }
      this.getDepartMentsListFn();
    },
  },
};
</script>

<style lang="scss" scoped>
.box-card {
  padding: 10px 30px;
}

.tab-pane {
  padding: 20px 80px;

  .company {
    margin-left: 12px;
    font-weight: bold;
    font-size: 14px;
  }

  .department-header {
    height: 50px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;
  }
}
.departments-tree {
  margin: 12px 0px;
}
</style>