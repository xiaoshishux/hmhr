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
                          <el-dropdown-item>添加子部门</el-dropdown-item>
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
                            <el-dropdown-item @click.native="del(data)"
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
  </div>
</template>

<script>
import { transTree } from '@/utils'
import { departmentsListAPI } from "@/api";
export default {
  name: "Departments",
  data() {
    return {
      activeName: "first", // 被激活的 Tab 标签页
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
  async created() {
    this.getDepartMentsListFn();
    this.treeData = transTree(res.data.depts, '') // 因为后台返回的字段是id和pid而且根是空字符串, 如果不是需要自己改变transTree里判断条件等
  },
  methods: {
    async getDepartMentsListFn() {
      const res = await departmentsListAPI();
      console.log(res);
      this.treeData = transTree(res.data.depts, "");
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 正文部分-右侧的添加子部门
    add(data) {},
    // 编辑子部分
    edit(data) {},
    // 删除部分
    del(data) {},
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