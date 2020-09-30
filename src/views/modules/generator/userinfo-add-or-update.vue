<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="110px">
    <el-form-item label="创建者" prop="craeteBy">
      <el-input v-model="dataForm.craeteBy" placeholder="创建者"></el-input>
    </el-form-item>
      <el-form-item label="创建时间" prop="craeteTime">
        <el-col :span="15">
          <el-form-item prop="createTime">
            <el-date-picker type="date" placeholder="选择日期" v-model="dataForm.craeteTime" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
    <el-form-item label="更新者" prop="updateBy">
      <el-input v-model="dataForm.updateBy" placeholder="更新者"></el-input>
    </el-form-item>
    <el-form-item label="更新时间" prop="updateTime">
      <el-col :span="15">
        <el-form-item prop="createTime">
          <el-date-picker type="date" placeholder="选择日期" v-model="dataForm.updateTime" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="逻辑删除" prop="delFlag">
      <el-input v-model="dataForm.delFlag" placeholder="逻辑删除"></el-input>
    </el-form-item>
    <el-form-item label="员工姓名" prop="staffName">
      <el-input v-model="dataForm.staffName" placeholder="员工姓名"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="staffSex">
      <el-input v-model="dataForm.staffSex" placeholder="性别"></el-input>
    </el-form-item>
    <el-form-item label="年龄" prop="staffAge">
      <el-input v-model="dataForm.staffAge" placeholder="年龄"></el-input>
    </el-form-item>
    <el-form-item label="员工号" prop="staffId">
      <el-input v-model="dataForm.staffId" placeholder="员工号"></el-input>
    </el-form-item>
    <el-form-item label="员工类别" prop="staffType">
      <el-input v-model="dataForm.staffType" placeholder="员工类别"></el-input>
    </el-form-item>
    <el-form-item label="入职时间" prop="entryTime">
      <el-col :span="15">
        <el-form-item prop="createTime">
          <el-date-picker type="date" placeholder="选择日期" v-model="dataForm.entryTime" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="操作人" prop="operateName">
      <el-input v-model="dataForm.operateName" placeholder="操作人"></el-input>
    </el-form-item>
    <el-form-item label="职务" prop="duty">
      <el-input v-model="dataForm.duty" placeholder="职务"></el-input>
    </el-form-item>
    <el-form-item label="职称" prop="positionalTitle">
      <el-input v-model="dataForm.positionalTitle" placeholder="职称"></el-input>
    </el-form-item>
    <el-form-item label="简介" prop="brief">
      <el-input v-model="dataForm.brief" placeholder="简介"></el-input>
    </el-form-item>
    <el-form-item label="手机号码" prop="phoneNumber">
      <el-input v-model="dataForm.phoneNumber" placeholder="手机号码"></el-input>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          craeteBy: '',
          craeteTime: '',
          updateBy: '',
          updateTime: '',
          delFlag: '',
          staffName: '',
          staffSex: '',
          staffAge: '',
          staffId: '',
          staffType: '',
          entryTime: '',
          operateName: '',
          duty: '',
          positionalTitle: '',
          brief: '',
          phoneNumber: ''
        },
        dataRule: {
          craeteBy: [
            { required: true, message: '创建者不能为空', trigger: 'blur' }
          ],
          craeteTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          updateBy: [
            { required: true, message: '更新者不能为空', trigger: 'blur' }
          ],
          updateTime: [
            { required: true, message: '更新时间不能为空', trigger: 'blur' }
          ],
          delFlag: [
            { required: true, message: '逻辑删除标记（0：显示；1：隐藏）不能为空', trigger: 'blur' }
          ],
          staffName: [
            { required: true, message: '员工姓名不能为空', trigger: 'blur' }
          ],
          staffSex: [
            { required: true, message: '性别不能为空', trigger: 'blur' }
          ],
          staffAge: [
            { required: true, message: '年龄不能为空', trigger: 'blur' }
          ],
          staffId: [
            { required: true, message: '员工号不能为空', trigger: 'blur' }
          ],
          staffType: [
            { required: true, message: '员工类别不能为空', trigger: 'blur' }
          ],
          entryTime: [
            { required: true, message: '入职时间不能为空', trigger: 'blur' }
          ],
          operateName: [
            { required: true, message: '操作人不能为空', trigger: 'blur' }
          ],
          duty: [
            { required: true, message: '职务不能为空', trigger: 'blur' }
          ],
          positionalTitle: [
            { required: true, message: '职称不能为空', trigger: 'blur' }
          ],
          brief: [
            { required: true, message: '简介不能为空', trigger: 'blur' }
          ],
          phoneNumber: [
            { required: true, message: '手机号码不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/generator/userinfo/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.craeteBy = data.userInfo.craeteBy
                this.dataForm.craeteTime = data.userInfo.craeteTime
                this.dataForm.updateBy = data.userInfo.updateBy
                this.dataForm.updateTime = data.userInfo.updateTime
                this.dataForm.delFlag = data.userInfo.delFlag
                this.dataForm.staffName = data.userInfo.staffName
                this.dataForm.staffSex = data.userInfo.staffSex
                this.dataForm.staffAge = data.userInfo.staffAge
                this.dataForm.staffId = data.userInfo.staffId
                this.dataForm.staffType = data.userInfo.staffType
                this.dataForm.entryTime = data.userInfo.entryTime
                this.dataForm.operateName = data.userInfo.operateName
                this.dataForm.duty = data.userInfo.duty
                this.dataForm.positionalTitle = data.userInfo.positionalTitle
                this.dataForm.brief = data.userInfo.brief
                this.dataForm.phoneNumber = data.userInfo.phoneNumber
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/generator/userinfo/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'craeteBy': this.dataForm.craeteBy,
                'craeteTime': this.dataForm.craeteTime,
                'updateBy': this.dataForm.updateBy,
                'updateTime': this.dataForm.updateTime,
                'delFlag': this.dataForm.delFlag,
                'staffName': this.dataForm.staffName,
                'staffSex': this.dataForm.staffSex,
                'staffAge': this.dataForm.staffAge,
                'staffId': this.dataForm.staffId,
                'staffType': this.dataForm.staffType,
                'entryTime': this.dataForm.entryTime,
                'operateName': this.dataForm.operateName,
                'duty': this.dataForm.duty,
                'positionalTitle': this.dataForm.positionalTitle,
                'brief': this.dataForm.brief,
                'phoneNumber': this.dataForm.phoneNumber
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
    }
  }
</script>
