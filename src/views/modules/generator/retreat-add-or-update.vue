<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="创建时间" prop="createTime">
      <el-col :span="15">
        <el-form-item prop="createTime">
          <el-date-picker
            v-model="dataForm.createTime"
            type="datetime"
            placeholder="选择日期时间"
            default-time="12:00:00">
          </el-date-picker>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="创建者" prop="createBy">
      <el-input v-model="dataForm.createBy" placeholder="创建者"></el-input>
    </el-form-item>
    <el-form-item label="更新时间" prop="updateTime">
      <el-col :span="15">
        <el-form-item prop="createTime">
          <el-date-picker
            v-model="dataForm.updateTime"
            type="datetime"
            placeholder="选择日期时间"
            default-time="12:00:00">
          </el-date-picker>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="更新者" prop="updateBy">
      <el-input v-model="dataForm.updateBy" placeholder="更新者"></el-input>
    </el-form-item>
    <el-form-item label="逻辑删除" prop="isDeleted">
      <el-input v-model="dataForm.isDeleted" placeholder="逻辑删除"></el-input>
    </el-form-item>
    <el-form-item label="退住时间" prop="retreatTime">
      <el-col :span="15">
        <el-form-item prop="retreatTime">
          <el-date-picker
            v-model="dataForm.retreatTime"
            type="datetime"
            placeholder="选择日期时间"
            default-time="12:00:00">
          </el-date-picker>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="退住类型" prop="retreatType">
      <el-input v-model="dataForm.retreatType" placeholder="退住类型"></el-input>
    </el-form-item>
    <el-form-item label="退住原因" prop="retreatReason">
      <el-input v-model="dataForm.retreatReason" placeholder="退住原因"></el-input>
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <el-input v-model="dataForm.status" placeholder="状态"></el-input>
    </el-form-item>
    <el-form-item label="审核意见" prop="auditOpinion">
      <el-input v-model="dataForm.auditOpinion" placeholder="审核意见"></el-input>
    </el-form-item>
    <el-form-item label="审核人" prop="auditPerson">
      <el-input v-model="dataForm.auditPerson" placeholder="审核人"></el-input>
    </el-form-item>
    <el-form-item label="审核时间" prop="auditTime">
      <el-col :span="15">
        <el-form-item prop="auditTime">
          <el-date-picker
            v-model="dataForm.auditTime"
            type="datetime"
            placeholder="选择日期时间"
            default-time="12:00:00">
          </el-date-picker>
        </el-form-item>
      </el-col>
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
          retreatTime: '',
          retreatType: '',
          retreatReason: '',
          status: '',
          auditOpinion: '',
          auditPerson: '',
          auditTime: ''
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
          retreatTime: [
            { required: true, message: '退住时间不能为空', trigger: 'blur' }
          ],
          retreatType: [
            { required: true, message: '退住类型不能为空', trigger: 'blur' }
          ],
          retreatReason: [
            { required: true, message: '退住原因不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '状态不能为空', trigger: 'blur' }
          ],
          auditOpinion: [
            { required: true, message: '审核意见不能为空', trigger: 'blur' }
          ],
          auditPerson: [
            { required: true, message: '审核人不能为空', trigger: 'blur' }
          ],
          auditTime: [
            { required: true, message: '审核时间不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/generator/retreat/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.createTime = data.retreat.createTime
                this.dataForm.createBy = data.retreat.createBy
                this.dataForm.updateTime = data.retreat.updateTime
                this.dataForm.updateBy = data.retreat.updateBy
                this.dataForm.isDeleted = data.retreat.isDeleted
                this.dataForm.retreatTime = data.retreat.retreatTime
                this.dataForm.retreatType = data.retreat.retreatType
                this.dataForm.retreatReason = data.retreat.retreatReason
                this.dataForm.status = data.retreat.status
                this.dataForm.auditOpinion = data.retreat.auditOpinion
                this.dataForm.auditPerson = data.retreat.auditPerson
                this.dataForm.auditTime = data.retreat.auditTime
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
              url: this.$http.adornUrl(`/generator/retreat/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'createTime': this.dataForm.createTime,
                'createBy': this.dataForm.createBy,
                'updateTime': this.dataForm.updateTime,
                'updateBy': this.dataForm.updateBy,
                'isDeleted': this.dataForm.isDeleted,
                'retreatTime': this.dataForm.retreatTime,
                'retreatType': this.dataForm.retreatType,
                'retreatReason': this.dataForm.retreatReason,
                'status': this.dataForm.status,
                'auditOpinion': this.dataForm.auditOpinion,
                'auditPerson': this.dataForm.auditPerson,
                'auditTime': this.dataForm.auditTime
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
