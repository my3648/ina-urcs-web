<template>
  <div style="width:1100px;margin:0 auto">
    <!-- <el-divider></el-divider> -->

    <div>
      <h3>用户列表</h3>
      <el-button type="primary" size="small" @click="dialogFormVisible=true;form={
        username: '',
        password: '',
        email: '',
        phone: ''
      }">添加用户</el-button>
      <el-input style="float:right;width:150px" size="small" v-model="searchValUser" placeholder="搜索"></el-input>

      <el-table :data="tableDataUser" style="width: 100%">
        <el-table-column prop="name" label="用户">
        </el-table-column>

        <el-table-column label="删除">
          <template scope="scope">
            <el-button size="small" @click="deleteUser(scope.row.name)" type="danger">删除</el-button>

          </template>

        </el-table-column>
      </el-table>
    </div>
    <my-page ref="page" :tableData.sync="tableDataUser" :result="resultUser"></my-page>
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" :model="form" ref="newUserForm">
        <el-form-item prop="username" label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" style="width:220px" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" style="width:220px" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" style="width:220px" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.phone" style="width:220px" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import mypage from "./Page";

export default {
  data() {
    return {
      allresultUser: [],
      resultUser: [],
      tableDataUser: [],
      searchValUser: "",
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {
        username: "",
        password: "",
        email: "",
        phone: ""
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
        // email: [
        //   {
        //     required: true,
        //     message: "请输入邮箱地址",
        //     trigger: "blur"
        //   }
        // ],
        // phone: [
        //   {
        //     required: true,
        //     message: "请输入电话号码",
        //     trigger: "blur"
        //   }
        // ]
      }
    };
  },
  created() {
    this.$http
      .post("/admin/getallUsers")
      .then(res => {
        console.log(res);
        var { res, data, detail } = res.data;
        var arr = [];
        if (res == "V") {
          data.forEach((item, index) => {
            var obj = { name: item };
            arr.push(obj);
          });
          this.allresultUser = arr;
        } else {
          this.$message({
            type: "error",
            message: detail
          });
        }
        // res.data.data
        // var data=res
      })
      .catch(err => {
        console.log(err);
        this.$message({
          type: "error",
          message: "请求失败"
        });
      });
  },
  methods: {
    deleteUser(name) {
      this.$confirm("确定要删除该用户吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.post("admin/deleteUser", { username: name }).then(res => {
            console.log(res);
            var { res, data, detail } = res.data;
            if (res == "V") {
              var arr = [];
              data.forEach((item, index) => {
                var obj = { name: item };
                arr.push(obj);
              });
              this.allresultUser = arr;
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            } else {
              this.$message({
                type: "error",
                message: detail
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "删除失败!"
          });
        });
    },
    addUser() {
      this.$refs.newUserForm.validate(valid => {
        if (valid) {
          // var flag = 0;
          // this.allresultUser.forEach((item, index) => {
          //   if (item == this.form.username) {
          //     flag ++
              
          //   }
          // });
          // if (flag>0) {
          //   this.$message({
          //     type: "error",
          //     message: "已存在此用户，添加失败"
          //   });
          //   return;
          // }

          this.$http
            .post("/admin/addNewUser", this.form)
            .then(res => {
              console.log(res);
              var { res, data, detail } = res.data;
              if (res == "V") {
                this.$message({
                  type: "success",
                  message: "添加用户成功!"
                });
                var arr = [];
                data.forEach((item, index) => {
                  var obj = { name: item };
                  arr.push(obj);
                });
                this.allresultUser = arr;
              } else {
                this.$message({
                  type: "error",
                  message: detail
                });
              }
              this.dialogFormVisible = false;
            })
            .catch(err => {
              this.$message({
                type: "info",
                message: "添加用户失败"
              });
              this.dialogFormVisible = false;
            });
        }
      });
    }
  },

  watch: {
    allresultUser(val) {
      this.resultUser = this.allresultUser.filter(
        data =>
          !this.searchValUser ||
          data.name.toLowerCase().includes(this.searchValUser.toLowerCase())
      );
    },
    searchValUser(val) {
      console.log(val);
      this.resultUser = this.allresultUser.filter(
        data =>
          !val ||
          data.name.toLowerCase().includes(this.searchValUser.toLowerCase())
      );
    }
  },
  components: {
    "my-page": mypage
  }
};
</script>

<style>
</style>