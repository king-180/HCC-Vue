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
          <el-form-item prop="craeteTime">
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
    <el-form-item label="名称" prop="nursingName">
      <el-input v-model="dataForm.nursingName" placeholder="名称"></el-input>
    </el-form-item>
    <el-form-item label="价格" prop="servicePrice">
      <el-input v-model="dataForm.servicePrice" placeholder="价格"></el-input>
    </el-form-item>
    <el-form-item label="描述" prop="describes">
      <el-input v-model="dataForm.describes" placeholder="描述"></el-input>
    </el-form-item>
    <el-form-item label="是否增值服务" prop="increaseFlag">
      <el-input v-model="dataForm.increaseFlag" placeholder="是否增值服务"></el-input>
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <el-input v-model="dataForm.status" placeholder="状态 1：启用；2：停用"></el-input>
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
          nursingName: '',
          servicePrice: '',
          describes: '',
          increaseFlag: '',
          status: ''
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
          nursingName: [
            { required: true, message: '名称不能为空', trigger: 'blur' }
          ],
          servicePrice: [
            { required: true, message: '价格不能为空', trigger: 'blur' }
          ],
          describes: [
            { required: true, message: '描述不能为空', trigger: 'blur' }
          ],
          increaseFlag: [
            { required: true, message: '是否增值服务不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '状态 1：启用；2：停用不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/generator/nursingcontent/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.craeteBy = data.nursingContent.craeteBy
                this.dataForm.craeteTime = data.nursingContent.craeteTime
                this.dataForm.updateBy = data.nursingContent.updateBy
                this.dataForm.updateTime = data.nursingContent.updateTime
                this.dataForm.delFlag = data.nursingContent.delFlag
                this.dataForm.nursingName = data.nursingContent.nursingName
                this.dataForm.servicePrice = data.nursingContent.servicePrice
                this.dataForm.describes = data.nursingContent.describes
                this.dataForm.increaseFlag = data.nursingContent.increaseFlag
                this.dataForm.status = data.nursingContent.status
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
              url: this.$http.adornUrl(`/generator/nursingcontent/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'craeteBy': this.dataForm.craeteBy,
                'craeteTime': this.dataForm.craeteTime,
                'updateBy': this.dataForm.updateBy,
                'updateTime': this.dataForm.updateTime,
                'delFlag': this.dataForm.delFlag,
                'nursingName': this.dataForm.nursingName,
                'servicePrice': this.dataForm.servicePrice,
                'describes': this.dataForm.describes,
                'increaseFlag': this.dataForm.increaseFlag,
                'status': this.dataForm.status
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
