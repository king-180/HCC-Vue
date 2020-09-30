<template>
  <div>
    <el-dialog
      :title="!dataForm.id ? '新增' : '修改'"
      :close-on-click-modal="false"
      :visible.sync="visible">
      <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
               label-width="110px">
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
        <el-form-item label="房间号码" prop="roomNumber">
          <el-input v-model="dataForm.roomNumber" placeholder="房间号码"></el-input>
        </el-form-item>
        <el-form-item label="床位状态" prop="bedStatus">
          <el-input v-model="dataForm.bedStatus" placeholder="床位状态"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="positionType">
          <el-input v-model="dataForm.positionType" placeholder="类型"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="dataForm.name" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="dataForm.sort" placeholder="排序"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
    </el-dialog>
  </div>
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
          roomNumber: '',
          bedStatus: '',
          positionType: '',
          name: '',
          sort: ''
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
          isDeleted: [
            {required: true, message: '逻辑删除标记（0：显示；1：隐藏）不能为空', trigger: 'blur'}
          ],
          roomNumber: [
            {required: true, message: '房间号码不能为空', trigger: 'blur'}
          ],
          bedStatus: [
            {required: true, message: '床位状态不能为空', trigger: 'blur'}
          ],
          positionType: [
            {required: true, message: '类型不能为空', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '名称不能为空', trigger: 'blur'}
          ],
          sort: [
            {required: true, message: '排序不能为空', trigger: 'blur'}
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
              url: this.$http.adornUrl(`/generator/bed/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.createTime = data.bed.createTime
                this.dataForm.createBy = data.bed.createBy
                this.dataForm.updateTime = data.bed.updateTime
                this.dataForm.updateBy = data.bed.updateBy
                this.dataForm.isDeleted = data.bed.isDeleted
                this.dataForm.roomNumber = data.bed.roomNumber
                this.dataForm.bedStatus = data.bed.bedStatus
                this.dataForm.positionType = data.bed.positionType
                this.dataForm.name = data.bed.name
                this.dataForm.sort = data.bed.sort
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
              url: this.$http.adornUrl(`/generator/bed/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'createTime': this.dataForm.createTime,
                'createBy': this.dataForm.createBy,
                'updateTime': this.dataForm.updateTime,
                'updateBy': this.dataForm.updateBy,
                'isDeleted': this.dataForm.isDeleted,
                'roomNumber': this.dataForm.roomNumber,
                'bedStatus': this.dataForm.bedStatus,
                'positionType': this.dataForm.positionType,
                'name': this.dataForm.name,
                'sort': this.dataForm.sort
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
