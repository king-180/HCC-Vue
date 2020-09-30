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
    <el-form-item label="服务项目ID" prop="serviceId">
      <el-input v-model="dataForm.serviceId" placeholder="服务项目ID"></el-input>
    </el-form-item>
    <el-form-item label="服务到期日" prop="maturityTime">
      <el-col :span="15">
        <el-form-item prop="nursingTime">
          <el-date-picker type="date" placeholder="选择日期" v-model="dataForm.maturityTime" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="服务购买日" prop="buyDate">
      <el-col :span="15">
        <el-form-item prop="nursingTime">
          <el-date-picker type="date" placeholder="选择日期" v-model="dataForm.buyDate" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="备注" prop="others">
      <el-input v-model="dataForm.others" placeholder="备注"></el-input>
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
          serviceId: '',
          maturityTime: '',
          buyDate: '',
          others: ''
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
          serviceId: [
            { required: true, message: '服务项目ID不能为空', trigger: 'blur' }
          ],
          maturityTime: [
            { required: true, message: '服务到期日不能为空', trigger: 'blur' }
          ],
          buyDate: [
            { required: true, message: '服务购买日不能为空', trigger: 'blur' }
          ],
          others: [
            { required: true, message: '备注不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/generator/serviceinfo/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.craeteBy = data.serviceInfo.craeteBy
                this.dataForm.craeteTime = data.serviceInfo.craeteTime
                this.dataForm.updateBy = data.serviceInfo.updateBy
                this.dataForm.updateTime = data.serviceInfo.updateTime
                this.dataForm.delFlag = data.serviceInfo.delFlag
                this.dataForm.customerId = data.serviceInfo.customerId
                this.dataForm.serviceId = data.serviceInfo.serviceId
                this.dataForm.maturityTime = data.serviceInfo.maturityTime
                this.dataForm.buyDate = data.serviceInfo.buyDate
                this.dataForm.others = data.serviceInfo.others
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
              url: this.$http.adornUrl(`/generator/serviceinfo/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'craeteBy': this.dataForm.craeteBy,
                'craeteTime': this.dataForm.craeteTime,
                'updateBy': this.dataForm.updateBy,
                'updateTime': this.dataForm.updateTime,
                'delFlag': this.dataForm.delFlag,
                'customerId': this.dataForm.customerId,
                'serviceId': this.dataForm.serviceId,
                'maturityTime': this.dataForm.maturityTime,
                'buyDate': this.dataForm.buyDate,
                'others': this.dataForm.others
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
