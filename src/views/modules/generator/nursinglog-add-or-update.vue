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
    <el-form-item label="客户ID" prop="customerId">
      <el-input v-model="dataForm.customerId" placeholder="客户ID"></el-input>
    </el-form-item>
    <el-form-item label="护理项目ID" prop="contentId">
      <el-input v-model="dataForm.contentId" placeholder="护理项目ID"></el-input>
    </el-form-item>
    <el-form-item label="护理时间" prop="nursingTime">
      <el-col :span="15">
        <el-form-item prop="nursingTime">
          <el-date-picker type="date" placeholder="选择日期" v-model="dataForm.nursingTime" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="护理次数" prop="nursingCount">
      <el-input v-model="dataForm.nursingCount" placeholder="护理次数"></el-input>
    </el-form-item>
    <el-form-item label="护理人员ID" prop="staffinfoId">
      <el-input v-model="dataForm.staffinfoId" placeholder="护理人员ID"></el-input>
    </el-form-item>
    <el-form-item label="护理安排ID" prop="nursingId">
      <el-input v-model="dataForm.nursingId" placeholder="护理安排ID"></el-input>
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
          customerId: '',
          contentId: '',
          nursingTime: '',
          nursingCount: '',
          staffinfoId: '',
          nursingId: ''
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
          customerId: [
            { required: true, message: '客户ID不能为空', trigger: 'blur' }
          ],
          contentId: [
            { required: true, message: '护理项目ID不能为空', trigger: 'blur' }
          ],
          nursingTime: [
            { required: true, message: '护理时间不能为空', trigger: 'blur' }
          ],
          nursingCount: [
            { required: true, message: '护理次数不能为空', trigger: 'blur' }
          ],
          staffinfoId: [
            { required: true, message: '护理人员ID不能为空', trigger: 'blur' }
          ],
          nursingId: [
            { required: true, message: '护理安排ID不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/generator/nursinglog/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.craeteBy = data.nursingLog.craeteBy
                this.dataForm.craeteTime = data.nursingLog.craeteTime
                this.dataForm.updateBy = data.nursingLog.updateBy
                this.dataForm.updateTime = data.nursingLog.updateTime
                this.dataForm.delFlag = data.nursingLog.delFlag
                this.dataForm.customerId = data.nursingLog.customerId
                this.dataForm.contentId = data.nursingLog.contentId
                this.dataForm.nursingTime = data.nursingLog.nursingTime
                this.dataForm.nursingCount = data.nursingLog.nursingCount
                this.dataForm.staffinfoId = data.nursingLog.staffinfoId
                this.dataForm.nursingId = data.nursingLog.nursingId
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
              url: this.$http.adornUrl(`/generator/nursinglog/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'craeteBy': this.dataForm.craeteBy,
                'craeteTime': this.dataForm.craeteTime,
                'updateBy': this.dataForm.updateBy,
                'updateTime': this.dataForm.updateTime,
                'delFlag': this.dataForm.delFlag,
                'customerId': this.dataForm.customerId,
                'contentId': this.dataForm.contentId,
                'nursingTime': this.dataForm.nursingTime,
                'nursingCount': this.dataForm.nursingCount,
                'staffinfoId': this.dataForm.staffinfoId,
                'nursingId': this.dataForm.nursingId
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
