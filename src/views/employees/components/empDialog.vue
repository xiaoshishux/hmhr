<template>
  <!-- 表单 -->
  <el-form label-width="120px" ref="addForm" :model="formData" :rules="rules">
    <el-form-item label="姓名" prop="username">
      <el-input
        style="width: 50%"
        v-model="formData.username"
        placeholder="请输入姓名"
      />
    </el-form-item>
    <el-form-item label="手机" prop="mobile">
      <el-input
        style="width: 50%"
        v-model="formData.mobile"
        placeholder="请输入手机号"
      />
    </el-form-item>
    <el-form-item label="入职时间" prop="timeOfEntry">
      <el-date-picker
        style="width: 50%"
        v-model="formData.timeOfEntry"
        placeholder="请选择入职时间"
      />
    </el-form-item>
    <el-form-item label="聘用形式" prop="formOfEmployment">
      <el-select
        style="width: 50%"
        v-model="formData.formOfEmployment"
        placeholder="请选择"
        value=""
      >
        <el-option
          v-for="item in hireType"
          :key="item.id"
          :label="item.value"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="工号" prop="workNumber">
      <el-input
        style="width: 50%"
        v-model="formData.workNumber"
        placeholder="请输入工号"
      />
    </el-form-item>
    <el-form-item label="部门" prop="departmentName">
      <el-input
        style="width: 50%"
        v-model="formData.departmentName"
        placeholder="请选择部门"
        @focus="departmentNameFocus"
      />
      <div class="tree-box" v-if="showTree">
        <el-tree
          :data="treeData"
          default-expand-all
          :props="{ label: 'name' }"
          @node-click="treeClick"
        ></el-tree>
      </div>
    </el-form-item>
    <el-form-item label="转正时间" prop="correctionTime">
      <el-date-picker
        style="width: 50%"
        v-model="formData.correctionTime"
        placeholder="请选择转正时间"
      />
    </el-form-item>
    <el-form-item>
      <el-button @click="addCancel">取消</el-button>
      <el-button type="primary" @click="addSubmit">确定</el-button>
    </el-form-item>
  </el-form>
</template>
  
<script>
import EmployeeEnum from "@/api/constant/employees";
export default {
  name: "EmpDialog",
  props: {
    treeData: {
      type: Array,
      default: (_) => [],
    },
  },
  data() {
    return {
      // 添加表单字段
      formData: {
        username: "", // 用户名
        mobile: "", // 手机号
        formOfEmployment: "", // 聘用形式
        workNumber: "", // 工号
        departmentName: "", // 部门
        timeOfEntry: "", // 入职时间
        correctionTime: "", // 转正时间
      },
      // 添加表单的校验字段
      rules: {
        username: [
          { required: true, message: "用户姓名不能为空", trigger: "blur" },
          { min: 1, max: 4, message: "用户姓名为1-4位", trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "手机号格式不正确",
            trigger: "blur",
          },
        ],
        formOfEmployment: [
          { required: true, message: "聘用形式不能为空", trigger: "blur" },
        ],
        workNumber: [
          { required: true, message: "工号不能为空", trigger: "blur" },
        ],
        departmentName: [
          { required: true, message: "部门不能为空", trigger: "change" },
        ],
        timeOfEntry: [
          { required: true, message: "请选择入职时间", trigger: "blur" },
        ],
      },
      hireType: EmployeeEnum.hireType, // 聘用形式数据绑定
      showTree: false, //是否显示树形组件
      clickDepartName: "", //点击的部门名字
    };
  },
  watch: {
    "formData.departmentName"(newVal) {
      if (newVal !== this.clickDepartName) {
        this.formData.departmentName = this.clickDepartName;
      }
    },
  },
  methods: {
    // 点击取消按钮
    addCancel() {
      this.$emit("update:sDialog", false);
    },

    // 点击确定按钮
    addSubmit() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.$emit("update:sDialog", false);
        }
      });
    },
    // 部门输入框聚焦
    departmentNameFocus() {
      this.showTree = true;
    },
    // 树形控件-点击事件
    treeClick(data) {
      // 如果当前部门还有子部门，则不能被选中
      if (data && data.children) {
        return;
      }
      // 把当前选中的节点显示 input 框中
      this.formData.departmentName = data.name;
      // 隐藏 tree
      this.showTree = false;
      //   临时保存点击的部门名字
      this.clickDepartName = data.name;
    },
  },
};
</script>
  
<style lang="scss" scoped></style>