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
        <el-form-item prop="updateTime">
          <el-date-picker type="date" placeholder="选择日期" v-model="dataForm.updateTime" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="逻辑删除" prop="delFlag">
      <el-input v-model="dataForm.delFlag" placeholder="逻辑删除"></el-input>
    </el-form-item>
    <el-form-item label="护理级别" prop="levelName">
      <el-input v-model="dataForm.levelName" placeholder="护理级别"></el-input>
    </el-form-item>
    <el-form-item label="级别状态" prop="levelStatus">
      <el-input v-model="dataForm.levelStatus" placeholder="级别状态 1：启用；2：停用"></el-input>
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
          levelName: '',
          levelStatus: ''
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
          levelName: [
            { required: true, message: '护理级别不能为空', trigger: 'blur' }
          ],
          levelStatus: [
            { required: true, message: '级别状态 1：启用；2：停用不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/generator/nursinglevel/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.craeteBy = data.nursingLevel.craeteBy
                this.dataForm.craeteTime = data.nursingLevel.craeteTime
                this.dataForm.updateBy = data.nursingLevel.updateBy
                this.dataForm.updateTime = data.nursingLevel.updateTime
                this.dataForm.delFlag = data.nursingLevel.delFlag
                this.dataForm.levelName = data.nursingLevel.levelName
                this.dataForm.levelStatus = data.nursingLevel.levelStatus
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
              url: this.$http.adornUrl(`/generator/nursinglevel/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'craeteBy': this.dataForm.craeteBy,
                'craeteTime': this.dataForm.craeteTime,
                'updateBy': this.dataForm.updateBy,
                'updateTime': this.dataForm.updateTime,
                'delFlag': this.dataForm.delFlag,
                'levelName': this.dataForm.levelName,
                'levelStatus': this.dataForm.levelStatus
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
