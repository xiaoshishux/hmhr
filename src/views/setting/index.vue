<template>
  <div class="setting-container">
    <div class="app-container">
      <!-- 卡片组件 -->
      <el-card class="box-card">
        <!-- 使用 Tabs 组件完成标签页布局 -->
        <!-- 角色管理模块 -->
        <el-tabs v-model="activeName">
          <el-tab-pane label="角色管理" name="first" class="tab-pane">
            <!-- 新增角色按钮 -->
            <el-row style="height: 60px">
              <el-button
                icon="el-icon-plus"
                size="small"
                type="primary"
                @click="addRoleBtnFn"
                >新增角色</el-button
              >
            </el-row>
            <!-- 使用 Table 组件实现用户角色的渲染 -->
            <el-table :data="rolesList" border style="width: 100%">
              <el-table-column type="index" label="序号" width="120" />
              <el-table-column prop="name" label="角色名" width="240" />
              <el-table-column prop="description" label="描述" />
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="small"
                    type="success"
                    @click="setRoles(scope.row)"
                    >分配权限</el-button
                  >
                  <el-button
                    size="small"
                    type="primary"
                    @click="editRoles(scope.row)"
                    >编辑</el-button
                  >
                  <el-button
                    size="small"
                    type="danger"
                    @click="delRoles(scope.row)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>

            <!-- 分页区域 -->
            <el-pagination
              :current-page="query.page"
              :page-sizes="[10, 15, 20, 25]"
              :page-size="query.pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </el-tab-pane>

          <!-- 公司信息模块 -->
          <el-tab-pane label="公司信息" class="tab-pane">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            />
            <el-form
              :model="formData"
              label-width="120px"
              style="margin-top: 50px"
            >
              <el-form-item label="公司名称">
                <el-input
                  v-model="formData.name"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input
                  v-model="formData.companyAddress"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input
                  v-model="formData.mailbox"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  v-model="formData.remarks"
                  type="textarea"
                  :rows="3"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
      <!-- 新增弹框 -->
      <el-dialog
        :title="isEdit ? '新增角色' : '编辑角色'"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :visible.sync="showDialog"
      >
        <el-form
          ref="roleForm"
          :model="roleForm"
          :rules="roleRules"
          label-width="100px"
        >
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="roleForm.name" />
          </el-form-item>
          <el-form-item label="角色描述" prop="description">
            <el-input v-model="roleForm.description" />
          </el-form-item>
        </el-form>

        <!-- 底部 -->
        <el-row slot="footer" type="flex" justify="center">
          <el-col :span="6">
            <el-button size="small" @click="cancleRoles">取消</el-button>
            <el-button size="small" type="primary" @click="roleSubmit"
              >确定</el-button
            >
          </el-col>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getRolesAPI,
  getCompanyInfoAPI,
  addRoleAPI,
  getRoleIdAPI,
  updateRoleAPI,
  deleteRoleAPI,
} from "@/api";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      activeName: "first",
      query: {
        page: 1, // 当前页面
        pagesize: 10, // 页面显示的条数
      },
      rolesList: [], // 角色列表
      total: 0, // 角色数据总条数
      formData: {}, //公司信息对象
      showDialog: false, //控制弹框的隐藏和展示
      isEdit: false, //是否处于编辑状态
      // 添加角色
      roleForm: {
        name: "",
        description: "",
      },
      // 添加角色验证
      roleRules: {
        name: [
          { required: true, message: "角色名称不能为空", trigger: "blur" },
        ],
        description: [
          { required: true, message: "角色描述不能为空", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    ...mapGetters(["companyId"]),
  },
  created() {
    // 调用获取角色列表的方法
    this.getRolesList();
    // 调用获取公司信息的方法
    this.getCompanyInfo();
  },
  methods: {
    // 调用获取角色列表的方法
    async getRolesList() {
      // 发起请求
      const res = await getRolesAPI(this.query);
      // 根据返回的状态码进行业务处理
      if (!res.success) return this.$message.error(res.messagge);
      // 将返回的数据进行赋值
      this.rolesList = res.data.rows;
      this.total = res.data.total;
    },
    // 获取的公司的信息
    async getCompanyInfo() {
      const res = await getCompanyInfoAPI(this.companyId);
      if (!res.success) return this.$message.error(res.message);
      this.formData = res.data;
    },
    // 每页显示的条数发生改变时触发
    handleSizeChange(newSize) {
      this.query.pagesize = newSize;
      this.getRolesList();
    },

    // 当前页面发生改变时触发
    handleCurrentChange(newPage) {
      this.query.page = newPage;
      this.getRolesList();
    },

    // 设置角色
    setRoles() {},

    // 编辑角色
    async editRoles(dataObj) {
      // 是否编辑状态
      this.isEdit = true;
      // 调用接口，获取需要编辑的角色数据
      const res = await getRoleIdAPI(dataObj.id);
      if (!res.success) return this.$message.error(res.message);
      this.roleForm = res.data;
      // 弹框展示
      this.showDialog = true;
    },

    // 删除角色
    async delRoles(dataObj) {
      // 显示删除询问对话框
      const delRes = await this.$confirm(
        "此操作将永久删除该角色，是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      // 用户点击了取消，给用户进行提示
      if (delRes === "cancel") return this.$message.info("您取消了删除");

      // 调用删除的API
      const res = await deleteRoleAPI(dataObj.id);
      // 根据返回的状态码进行错误提示
      if (!res.success) return this.$message.error(res.message);
      // 删除成功后的提示
      this.$message.success(res.message);
      // 重新获取数据
      this.getRolesList();
    },
    // 角色弹窗-> 确定按钮
    roleSubmit() {
      this.$refs.roleForm.validate(async (valid) => {
        if (valid) {
          if (!this.isEdit) {
            // 调用新增角色的 API
            const res = await addRoleAPI(this.roleForm);
            // 根据状态码判断请求成功与否
            if (!res.success) return this.$message.error(res.message);
            // 添加成功，给用户进行提示
            this.$message.success(res.message);
          } else {
            // 调用编辑角色的 API
            const res = await updateRoleAPI(this.roleForm);
            // 根据状态码判断请求成功与否
            if (!res.success) return this.$message.error(res.message);
            // 编辑成功，给用户进行提示
            this.$message.success(res.message);
          }

          // 重新获取权限列表数据
          this.getRolesList();
          // 隐藏弹框
          this.showDialog = false;
        }
      });
    },
    // 角色弹窗->取消按钮
    cancleRoles() {
      this.showDialog = false;
    },
    // 新增角色-按钮点击事件
    addRoleBtnFn() {
      // 现在不是编辑状态
      this.isEdit = false;
      // 弹窗出现
      this.showDialog = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.box-card {
  padding: 10px 30px;
}

.tab-pane {
  padding: 20px;
}

.el-pagination {
  text-align: center;
  margin-top: 20px;
}
</style>