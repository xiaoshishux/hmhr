<template>
  <div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
      :close-on-click-modal="false"
      :close-on-presss-escape="false"
      :show-close="false"
    >
      <el-form ref="deptForm" label-width="120px">
        <el-form-item label="部门名称">
          <el-input
            v-model="form.name"
            style="width: 80%"
            placeholder="1-50个字符"
          />
        </el-form-item>
        <el-form-item label="部门编码">
          <el-input
            v-model="form.code"
            style="width: 80%"
            placeholder="1-50个字符"
          />
        </el-form-item>
        <el-form-item label="部门负责人">
          <el-select
            v-model="form.manager"
            style="width: 80%"
            placeholder="请选择"
          >
            <el-option
              v-for="item in employeesList"
              :key="item.id"
              :value="item.username"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="部门介绍">
          <el-input
            v-model="form.introduce"
            style="width: 80%"
            placeholder="1-300个字符"
            type="textarea"
            :rows="3"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelFn">取 消</el-button>
        <el-button type="primary" @click="enterFn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    // 员工列表
    employeesList: {
      type: Array,
      default() {
        return []; // 独立作用域
      },
    },
  },
  data() {
    return {
      form: {
        name: "", // 部门名称
        code: "", // 部门编码
        manager: "", // 部门管理者
        introduce: "", // 部门介绍
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 取消-点击事件
    cancelFn() {
      this.$emit("update:dialogVisible", false);
    },
    // 确定-点击事件
    enterFn() {
      this.$emit("addDepartEV", this.form);
      this.form= {
        name: "", // 部门名称
        code: "", // 部门编码
        manager: "", // 部门管理者
        introduce: "", // 部门介绍
      }
      this.$refs.deptForm.resetFields()
      this.$emit("update:dialogVisible", false);
    },
  },
};
</script>

<style scoped lang="less">
</style>