<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="110px">
      <el-form-item label="创建时间" prop="createTime">
        <el-col :span="15">
          <el-form-item prop="createTime">
            <el-date-picker type="date" placeholder="选择日期" v-model="dataForm.createTime" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label="创建者" prop="createBy">
        <el-input v-model="dataForm.createBy" placeholder="创建者"></el-input>
      </el-form-item>
      <el-form-item label="更新时间" prop="updateTime">
        <el-col :span="15">
          <el-form-item prop="updateTime">
            <el-date-picker type="date" placeholder="选择日期" v-model="dataForm.updateTime" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="更新者" prop="updateBy">
        <el-input v-model="dataForm.updateBy" placeholder="更新者"></el-input>
      </el-form-item>
      <el-form-item label="逻辑删除" prop="isDeleted">
        <el-input v-model="dataForm.isDeleted" placeholder="逻辑删除"></el-input>
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
    <el-form-item label="护理内容" prop="nursingContent">
      <el-input v-model="dataForm.nursingContent" placeholder="护理内容"></el-input>
    </el-form-item>
    <el-form-item label="护理次数" prop="nursingCount">
      <el-input v-model="dataForm.nursingCount" placeholder="护理次数"></el-input>
    </el-form-item>
    <el-form-item label="护理人员ID" prop="stuffinfoId">
      <el-input v-model="dataForm.stuffinfoId" placeholder="护理人员ID"></el-input>
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
          createTime: '',
          createBy: '',
          updateTime: '',
          updateBy: '',
          isDeleted: '',
          customerId: '',
          contentId: '',
          nursingTime: '',
          nursingContent: '',
          nursingCount: '',
          stuffinfoId: '',
          nursingId: ''
        },
        dataRule: {
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          createBy: [
            { required: true, message: '创建者不能为空', trigger: 'blur' }
          ],
          updateTime: [
            { required: true, message: '更新时间不能为空', trigger: 'blur' }
          ],
          updateBy: [
            { required: true, message: '更新者不能为空', trigger: 'blur' }
          ],
          isDeleted: [
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
          nursingContent: [
            { required: true, message: '护理内容不能为空', trigger: 'blur' }
          ],
          nursingCount: [
            { required: true, message: '护理次数不能为空', trigger: 'blur' }
          ],
          stuffinfoId: [
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
              url: this.$http.adornUrl(`/generator/customerbed/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.createTime = data.customerBed.createTime
                this.dataForm.createBy = data.customerBed.createBy
                this.dataForm.updateTime = data.customerBed.updateTime
                this.dataForm.updateBy = data.customerBed.updateBy
                this.dataForm.isDeleted = data.customerBed.isDeleted
                this.dataForm.customerId = data.customerBed.customerId
                this.dataForm.contentId = data.customerBed.contentId
                this.dataForm.nursingTime = data.customerBed.nursingTime
                this.dataForm.nursingContent = data.customerBed.nursingContent
                this.dataForm.nursingCount = data.customerBed.nursingCount
                this.dataForm.stuffinfoId = data.customerBed.stuffinfoId
                this.dataForm.nursingId = data.customerBed.nursingId
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
              url: this.$http.adornUrl(`/generator/customerbed/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'createTime': this.dataForm.createTime,
                'createBy': this.dataForm.createBy,
                'updateTime': this.dataForm.updateTime,
                'updateBy': this.dataForm.updateBy,
                'isDeleted': this.dataForm.isDeleted,
                'customerId': this.dataForm.customerId,
                'contentId': this.dataForm.contentId,
                'nursingTime': this.dataForm.nursingTime,
                'nursingContent': this.dataForm.nursingContent,
                'nursingCount': this.dataForm.nursingCount,
                'stuffinfoId': this.dataForm.stuffinfoId,
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
