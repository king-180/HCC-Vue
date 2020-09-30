<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="110px">


      <el-form-item label="创建者" prop="createBy">
        <el-input v-model="dataForm.createBy" placeholder="创建者"></el-input>
      </el-form-item>
      <el-form-item label="创建时间" prop="craeteTime">
        <el-col :span="15">
          <el-form-item prop="craeteTime">
            <el-date-picker type="date" placeholder="选择日期" v-model="dataForm.craeteTime"
                            style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="更新者" prop="updateBy">
        <el-input v-model="dataForm.updateBy" placeholder="更新者"></el-input>
      </el-form-item>
      <el-form-item label="更新时间" prop="updateTime">
        <el-col :span="15">
          <el-form-item prop="updateTime">
            <el-date-picker type="date" placeholder="选择日期" v-model="dataForm.updateTime"
                            style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label="逻辑删除" prop="delFlag">
        <el-input v-model="dataForm.delFlag" placeholder="逻辑删除"></el-input>
      </el-form-item>
      <el-form-item label="客户ID" prop="customerId">
        <el-input v-model="dataForm.customerId" placeholder="客户ID"></el-input>
      </el-form-item>
      <el-form-item label="膳食ID" prop="foodId">
        <el-input v-model="dataForm.foodId" placeholder="膳食ID"></el-input>
      </el-form-item>
      <el-form-item label="膳食日期" prop="foodDate">
        <el-input v-model="dataForm.foodDate" placeholder="膳食日期"></el-input>
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
    data() {
      return {
        visible: false,
        dataForm: {
          id: 0,
          createBy: '',
          craeteTime: '',
          updateBy: '',
          updateTime: '',
          delFlag: '',
          customerId: '',
          foodId: '',
          foodDate: ''
        },
        dataRule: {
          createTime: [
            {required: true, message: '创建时间不能为空', trigger: 'blur'}
          ],
          createBy: [
            {required: true, message: '创建者不能为空', trigger: 'blur'}
          ],
          updateTime: [
            {required: true, message: '更新时间不能为空', trigger: 'blur'}
          ],
          updateBy: [
            {required: true, message: '更新者不能为空', trigger: 'blur'}
          ],
          delFlag: [
            {required: true, message: '逻辑删除标记不能为空', trigger: 'blur'}
          ],
          customerId: [
            {required: true, message: '客户ID不能为空', trigger: 'blur'}
          ],
          foodId: [
            {required: true, message: '膳食ID不能为空', trigger: 'blur'}
          ],
          foodDate: [
            {required: true, message: '膳食日期不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      init(id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/generator/customerfood/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.createBy = data.customerFood.createBy
                this.dataForm.craeteTime = data.customerFood.craeteTime
                this.dataForm.updateBy = data.customerFood.updateBy
                this.dataForm.updateTime = data.customerFood.updateTime
                this.dataForm.delFlag = data.customerFood.delFlag
                this.dataForm.customerId = data.customerFood.customerId
                this.dataForm.foodId = data.customerFood.foodId
                this.dataForm.foodDate = data.customerFood.foodDate
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/generator/customerfood/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'createBy': this.dataForm.createBy,
                'craeteTime': this.dataForm.craeteTime,
                'updateBy': this.dataForm.updateBy,
                'updateTime': this.dataForm.updateTime,
                'delFlag': this.dataForm.delFlag,
                'customerId': this.dataForm.customerId,
                'foodId': this.dataForm.foodId,
                'foodDate': this.dataForm.foodDate
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
