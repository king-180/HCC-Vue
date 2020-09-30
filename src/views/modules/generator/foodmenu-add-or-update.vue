<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="创建时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>
    </el-form-item>
    <el-form-item label="创建者" prop="createBy">
      <el-input v-model="dataForm.createBy" placeholder="创建者"></el-input>
    </el-form-item>
    <el-form-item label="更新时间" prop="updateTime">
      <el-input v-model="dataForm.updateTime" placeholder="更新时间"></el-input>
    </el-form-item>
    <el-form-item label="更新者" prop="updateBy">
      <el-input v-model="dataForm.updateBy" placeholder="更新者"></el-input>
    </el-form-item>
    <el-form-item label="逻辑删除" prop="isDeleted">
      <el-input v-model="dataForm.isDeleted" placeholder="逻辑删除"></el-input>
    </el-form-item>
    <el-form-item label="食品名称" prop="foodName">
      <el-input v-model="dataForm.foodName" placeholder="食品名称"></el-input>
    </el-form-item>
    <el-form-item label="食品类别" prop="foodType">
      <el-input v-model="dataForm.foodType" placeholder="食品类别"></el-input>
    </el-form-item>
    <el-form-item label="食品标签" prop="foodTag">
      <el-input v-model="dataForm.foodTag" placeholder="食品标签"></el-input>
    </el-form-item>
    <el-form-item label="食品价格" prop="foodPrice">
      <el-input v-model="dataForm.foodPrice" placeholder="食品价格"></el-input>
    </el-form-item>
    <el-form-item label="食品图片" prop="foodPicture">
      <el-input v-model="dataForm.foodPicture" placeholder="食品图片"></el-input>
    </el-form-item>
    <el-form-item label="供应类型" prop="supplyType">
      <el-input v-model="dataForm.supplyType" placeholder="供应类型"></el-input>
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
          foodName: '',
          foodType: '',
          foodTag: '',
          foodPrice: '',
          foodPicture: '',
          supplyType: ''
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
            { required: true, message: '逻辑删除不能为空', trigger: 'blur' }
          ],
          foodName: [
            { required: true, message: '食品名称不能为空', trigger: 'blur' }
          ],
          foodType: [
            { required: true, message: '食品类别不能为空', trigger: 'blur' }
          ],
          foodTag: [
            { required: true, message: '食品标签不能为空', trigger: 'blur' }
          ],
          foodPrice: [
            { required: true, message: '食品价格不能为空', trigger: 'blur' }
          ],
          foodPicture: [
            { required: true, message: '食品图片不能为空', trigger: 'blur' }
          ],
          supplyType: [
            { required: true, message: '供应类型不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/generator/foodmenu/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.createTime = data.foodMenu.createTime
                this.dataForm.createBy = data.foodMenu.createBy
                this.dataForm.updateTime = data.foodMenu.updateTime
                this.dataForm.updateBy = data.foodMenu.updateBy
                this.dataForm.isDeleted = data.foodMenu.isDeleted
                this.dataForm.foodName = data.foodMenu.foodName
                this.dataForm.foodType = data.foodMenu.foodType
                this.dataForm.foodTag = data.foodMenu.foodTag
                this.dataForm.foodPrice = data.foodMenu.foodPrice
                this.dataForm.foodPicture = data.foodMenu.foodPicture
                this.dataForm.supplyType = data.foodMenu.supplyType
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
              url: this.$http.adornUrl(`/generator/foodmenu/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'createTime': this.dataForm.createTime,
                'createBy': this.dataForm.createBy,
                'updateTime': this.dataForm.updateTime,
                'updateBy': this.dataForm.updateBy,
                'isDeleted': this.dataForm.isDeleted,
                'foodName': this.dataForm.foodName,
                'foodType': this.dataForm.foodType,
                'foodTag': this.dataForm.foodTag,
                'foodPrice': this.dataForm.foodPrice,
                'foodPicture': this.dataForm.foodPicture,
                'supplyType': this.dataForm.supplyType
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
