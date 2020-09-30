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
    <el-form-item label="外出事由" prop="outgoingReason">
      <el-input v-model="dataForm.outgoingReason" placeholder="外出事由"></el-input>
    </el-form-item>
    <el-form-item label="外出时间" prop="outgoingTime">
      <el-col :span="15">
        <el-form-item prop="updateTime">
          <el-date-picker type="date" placeholder="选择日期" v-model="dataForm.outgoingTime" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="预计回院时间" prop="expectedReturnTime">
      <el-col :span="15">
        <el-form-item prop="updateTime">
          <el-date-picker type="date" placeholder="选择日期" v-model="dataForm.expectedReturnTime" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="实际回院时间" prop="actualReturnTime">
      <el-col :span="15">
        <el-form-item prop="updateTime">
          <el-date-picker type="date" placeholder="选择日期" v-model="dataForm.actualReturnTime" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="陪同人" prop="escorted">
      <el-input v-model="dataForm.escorted" placeholder="陪同人"></el-input>
    </el-form-item>
    <el-form-item label="与老人关系" prop="relation">
      <el-input v-model="dataForm.relation" placeholder="与老人关系"></el-input>
    </el-form-item>
    <el-form-item label="陪同人电话" prop="escortedTel">
      <el-input v-model="dataForm.escortedTel" placeholder="陪同人电话"></el-input>
    </el-form-item>
    <el-form-item label="审批状态" prop="auditStatus">
      <el-input v-model="dataForm.auditStatus" placeholder="审批状态"></el-input>
    </el-form-item>
    <el-form-item label="审批人" prop="auditPerson">
      <el-input v-model="dataForm.auditPerson" placeholder="审批人"></el-input>
    </el-form-item>
    <el-form-item label="审批时间" prop="auditTime">
      <el-col :span="15">
        <el-form-item prop="updateTime">
          <el-date-picker type="date" placeholder="选择日期" v-model="dataForm.auditTime" style="width: 100%;"></el-date-picker>
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
          outgoingReason: '',
          outgoingTime: '',
          expectedReturnTime: '',
          actualReturnTime: '',
          escorted: '',
          relation: '',
          escortedTel: '',
          auditStatus: '',
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
          outgoingReason: [
            { required: true, message: '外出事由不能为空', trigger: 'blur' }
          ],
          outgoingTime: [
            { required: true, message: '外出时间不能为空', trigger: 'blur' }
          ],
          expectedReturnTime: [
            { required: true, message: '预计回院时间不能为空', trigger: 'blur' }
          ],
          actualReturnTime: [
            { required: true, message: '实际回院时间不能为空', trigger: 'blur' }
          ],
          escorted: [
            { required: true, message: '陪同人不能为空', trigger: 'blur' }
          ],
          relation: [
            { required: true, message: '与老人关系不能为空', trigger: 'blur' }
          ],
          escortedTel: [
            { required: true, message: '陪同人电话不能为空', trigger: 'blur' }
          ],
          auditStatus: [
            { required: true, message: '审批状态不能为空', trigger: 'blur' }
          ],
          auditPerson: [
            { required: true, message: '审批人不能为空', trigger: 'blur' }
          ],
          auditTime: [
            { required: true, message: '审批时间不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/generator/outgoing/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.createTime = data.outgoing.createTime
                this.dataForm.createBy = data.outgoing.createBy
                this.dataForm.updateTime = data.outgoing.updateTime
                this.dataForm.updateBy = data.outgoing.updateBy
                this.dataForm.isDeleted = data.outgoing.isDeleted
                this.dataForm.outgoingReason = data.outgoing.outgoingReason
                this.dataForm.outgoingTime = data.outgoing.outgoingTime
                this.dataForm.expectedReturnTime = data.outgoing.expectedReturnTime
                this.dataForm.actualReturnTime = data.outgoing.actualReturnTime
                this.dataForm.escorted = data.outgoing.escorted
                this.dataForm.relation = data.outgoing.relation
                this.dataForm.escortedTel = data.outgoing.escortedTel
                this.dataForm.auditStatus = data.outgoing.auditStatus
                this.dataForm.auditPerson = data.outgoing.auditPerson
                this.dataForm.auditTime = data.outgoing.auditTime
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
              url: this.$http.adornUrl(`/generator/outgoing/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'createTime': this.dataForm.createTime,
                'createBy': this.dataForm.createBy,
                'updateTime': this.dataForm.updateTime,
                'updateBy': this.dataForm.updateBy,
                'isDeleted': this.dataForm.isDeleted,
                'outgoingReason': this.dataForm.outgoingReason,
                'outgoingTime': this.dataForm.outgoingTime,
                'expectedReturnTime': this.dataForm.expectedReturnTime,
                'actualReturnTime': this.dataForm.actualReturnTime,
                'escorted': this.dataForm.escorted,
                'relation': this.dataForm.relation,
                'escortedTel': this.dataForm.escortedTel,
                'auditStatus': this.dataForm.auditStatus,
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
