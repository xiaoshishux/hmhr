<template>
  <div class="app-container">
    <upload-excel-component
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
    />
    <!-- 其他代码略 -->
  </div>
</template>
  
  <script>
// 导入上传的组件
import UploadExcelComponent from "@/components/UploadExcel/index.vue";
import { formatExcelDate } from "@/utils";
export default {
  name: "UploadExcel",
  // 绑定上传组件
  components: { UploadExcelComponent },
  data() {
    return {
      tableData: [],
      tableHeader: [],
    };
  },
  methods: {
    // 将表格中的数据进行格式化
    transExcel(results) {
      const userRelations = {
        入职日期: "timeOfEntry",
        手机号: "mobile",
        姓名: "username",
        转正日期: "correctionTime",
        工号: "workNumber",
        部门: "departmentName",
        聘用形式: "formOfEmployment",
      };
      return results.map((item) => {
        // 1.取出这个对象所有的属性名：[’姓名‘，’手机号‘]
        // 2.遍历这个数组，通过中文名去除 userRelations 找对应英文名，保存值
        const obj = {};
        const contentKeys = Object.keys(item);
        contentKeys.forEach((key) => {
          // 找到对应的英文名
          const transKey = userRelations[key];
          // 如果格式化的是时间，需要进行转换
          if (transKey === "timeOfEntry" || transKey === "correctionTime") {
            // 表格的天数->转成日期对象
            const transData = new Date(formatExcelDate(item[key]));
            // 再把日期对象转成->年-月-日 保存到对象属性里给后台
            obj[transKey] = parseTime(transData, "{yyyy-}-{mm}-{dd}");
          } else {
            obj[transKey] = item[key];
          }
        });
        return obj;
      });
    },

    // 上传之前的函数
    beforeUpload(file) {
      // 如判断文件的大小是否大于 1 兆
      const isLt1M = file.size / 1024 / 1024 < 1;

      // 若大于 1 兆则停止解析并提示错误信息。
      if (isLt1M) {
        return true;
      }

      this.$message({
        message: "Please do not upload files larger than 1m in size.",
        type: "warning",
      });
      return false;
    },
    // 成功调用之后的函数，它会返回表格的表头和内容。
    handleSuccess({ results, header }) {
      const arr = this.transExcel(results);
      console.log("转换之后的格式是", arr);
      // this.tableData = results;
      // this.tableHeader = header;
    },
  },
};
</script>