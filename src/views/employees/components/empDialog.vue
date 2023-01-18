<template>
  <!-- 表单 -->
  <el-form label-width="120px">
    <el-form-item label="姓名">
      <el-input style="width: 50%" placeholder="请输入姓名" />
    </el-form-item>
    <el-form-item label="手机">
      <el-input style="width: 50%" placeholder="请输入手机号" />
    </el-form-item>
    <el-form-item label="入职时间">
      <el-date-picker style="width: 50%" placeholder="请选择入职时间" />
    </el-form-item>
    <el-form-item label="聘用形式">
      <el-select style="width: 50%" placeholder="请选择" value="" />
    </el-form-item>
    <el-form-item label="工号">
      <el-input style="width: 50%" placeholder="请输入工号" />
    </el-form-item>
    <el-form-item label="部门">
      <el-input style="width: 50%" placeholder="请选择部门" />
    </el-form-item>
    <el-form-item label="转正时间">
      <el-date-picker style="width: 50%" placeholder="请选择转正时间" />
    </el-form-item>
    <el-form-item>
      <el-button @click="addCancel">取消</el-button>
      <el-button type="primary" @click="addSubmit">确定</el-button>
    </el-form-item>
  </el-form>
</template>
  
<script>
export default {
  name: "EmpDialog",
  methods: {
    // 点击取消按钮
    addCancel() {
      this.$emit("update:sDialog", false);
    },

    // 点击确定按钮
    addSubmit() {
      this.$emit("update:sDialog", false);
    },
  },
};
</script>
  
<style lang="scss" scoped></style>