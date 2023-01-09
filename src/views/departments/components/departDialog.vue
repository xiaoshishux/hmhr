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
      <el-form ref="deptForm" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="部门名称" prop="name">
          <el-input
            v-model="form.name"
            style="width: 80%"
            placeholder="1-50个字符"
          />
        </el-form-item>
        <el-form-item label="部门编码" prop="code">
          <el-input
            v-model="form.code"
            style="width: 80%"
            placeholder="1-50个字符"
          />
        </el-form-item>
        <el-form-item label="部门负责人" prop="manager">
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
        <el-form-item label="部门介绍" prop="introduce">
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
      rules: {
        name: [
          { required: true, message: "部门名称不能为空", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "部门名称要求1-50个字符",
            trigger: "blur",
          },
        ],
        code: [
          { required: true, message: "部门编码不能为空", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "部门编码要求1-50个字符",
            trigger: "blur",
          },
        ],
        manager: [
          { required: true, message: "部门负责人不能为空", trigger: "blur" },
        ],
        introduce: [
          { required: true, message: "部门介绍不能为空", trigger: "blur" },
          {
            min: 1,
            max: 300,
            message: "部门介绍要求1-300个字符",
            trigger: "blur",
          },
        ],
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
      this.$refs.deptForm.validate(async (valid) => {
        if (valid) {
          this.$emit("addDepartEV", this.form);
          this.form = {
            name: "", // 部门名称
            code: "", // 部门编码
            manager: "", // 部门管理者
            introduce: "", // 部门介绍
          };
          this.$refs.deptForm.resetFields();
          this.$emit("update:dialogVisible", false);
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
</style>