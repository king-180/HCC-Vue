<template>
  <div>
    <el-dialog
      :title="!dataForm.id ? '新增' : '修改'"
      :close-on-click-modal="false"
      :visible.sync="visible"
      width="40%">
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
        <el-form-item label="客户姓名" prop="customerName">
          <el-input v-model="dataForm.customerName" placeholder="客户姓名"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="customerAge">
          <el-input v-model.number="dataForm.customerAge" placeholder="年龄"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="customerSex">
          <el-input v-model="dataForm.customerSex" placeholder="填数字“1”或者“0”（1：男，0：女）"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idcard">
          <el-input v-model="dataForm.idcard" placeholder="身份证号"></el-input>
        </el-form-item>
        <el-form-item label="房间号" prop="roomNumber">
          <el-input v-model="dataForm.roomNumber" placeholder="房间号"></el-input>
        </el-form-item>
        <el-form-item label="所属楼房" prop="buildingId">
          <el-input v-model="dataForm.buildingId" placeholder="所属楼房"></el-input>
        </el-form-item>
        <el-form-item label="档案号" prop="recordId">
          <el-input v-model="dataForm.recordId" placeholder="档案号"></el-input>
        </el-form-item>
        <el-form-item label="老人类型" prop="elderType">
          <el-input v-model="dataForm.elderType" placeholder="老人类型（老年人、自理老人、介助老人、介护老人、失能老人）"></el-input>
        </el-form-item>
        <el-form-item label="入住时间" prop="checkinDate">
          <el-col :span="15">
            <el-form-item prop="checkinDate">
              <el-date-picker type="date" placeholder="选择日期" v-model="dataForm.checkinDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="合同到期时间" prop="expirationDate">
          <el-col :span="15">
            <el-form-item prop="expirationDate">
              <el-date-picker type="date" placeholder="选择日期" v-model="dataForm.expirationDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="联系电话" prop="contactTel">
          <el-input v-model="dataForm.contactTel" placeholder="联系电话"></el-input>
        </el-form-item>
        <el-form-item label="床号" prop="bedId">
          <el-input v-model="dataForm.bedId" placeholder="床号"></el-input>
        </el-form-item>
        <el-form-item label="身心状况" prop="psychosomaticState">
          <el-input v-model="dataForm.psychosomaticState" placeholder="身心状况"></el-input>
        </el-form-item>
        <el-form-item label="注意事项" prop="attention">
          <el-input v-model="dataForm.attention" placeholder="注意事项"></el-input>
        </el-form-item>
        <el-form-item label="出生日期" prop="birthday">
          <el-col :span="15">
            <el-form-item prop="birthday">
              <el-date-picker type="date" placeholder="选择日期" v-model="dataForm.birthday" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <!--<el-form-item label="身高" prop="height">-->
          <!--<el-input v-model="dataForm.height" placeholder="身高只填数字（单位为：cm）"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="婚姻状况" prop="maritalStatus">-->
          <!--<el-input v-model="dataForm.maritalStatus" placeholder="婚姻状况（已婚、未婚、离异）"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="体重" prop="weight">-->
          <!--<el-input v-model="dataForm.weight" placeholder="体重只填数字（单位为：kg）"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="血型" prop="bloodType">-->
          <!--<el-input v-model="dataForm.bloodType" placeholder="血型（A、B、AB、O）"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="头像路径" prop="filepath">-->
          <!--<el-input v-model="dataForm.filepath" placeholder="头像路径"></el-input>-->
        <!--</el-form-item>-->
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
    data() {
      //自定义校验规则
      var checkIdCard = (rule, value, cb) => {
        const regIdCard = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        if (regIdCard.test(value)) {
          return cb();
        }
        cb(new Error("您输入的身份证号码不是有效格式"));
      };
      var checkPhoneNum = (rule, value, cb) => {
        const regPhoneNum =/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        if (regPhoneNum.test(value)) {
          return cb();
        }
        cb(new Error("您输入的电话号码不是有效格式"));
      };
      return {
        visible: false,
        dataForm: {
          // id: 0,
          createTime: '',
          createBy: '',
          updateTime: '',
          updateBy: '',
          isDeleted: '1',
          customerName: '',
          customerAge: '',
          customerSex: '',
          idcard: '',
          roomNumber: '',
          buildingId: '',
          recordId: '',
          elderType: '',
          checkinDate: '',
          expirationDate: '',
          contactTel: '',
          bedId: '',
          psychosomaticState: '',
          attention: '',
          birthday: '',
          height: '',
          maritalStatus: '',
          weight: '',
          bloodType: '',
          filepath: ''
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
            {required: true, message: '逻辑删除标记不能为空', trigger: 'blur'}
          ],
          customerName: [
            {required: true, message: '客户姓名不能为空', trigger: 'blur'}
          ],
          customerAge: [
            {required: true, message: '年龄不能为空', trigger: 'blur'},
            { type: 'number', message: '年龄必须为数字值'}
          ],
          customerSex: [
            {required: true, message: '性别不能为空', trigger: 'blur'}
          ],
          idcard: [
            {required: true, message: '身份证号不能为空', trigger: 'blur'},
            { validator: checkIdCard, trigger: "blur" }
          ],
          roomNumber: [
            {required: true, message: '房间号不能为空', trigger: 'blur'}
          ],
          buildingId: [
            {required: true, message: '所属楼房不能为空', trigger: 'blur'}
          ],
          recordId: [
            {required: true, message: '档案号不能为空', trigger: 'blur'}
          ],
          elderType: [
            {required: true, message: '老人类型不能为空', trigger: 'blur'}
          ],
          checkinDate: [
            {required: true, message: '入住时间不能为空', trigger: 'blur'}
          ],
          expirationDate: [
            {required: true, message: '合同到期时间不能为空', trigger: 'blur'}
          ],
          contactTel: [
            {required: true, message: '联系电话不能为空', trigger: 'blur'},
            { validator: checkPhoneNum, trigger: "blur" }
          ],
          bedId: [
            {required: true, message: '床号不能为空', trigger: 'blur'}
          ],
          psychosomaticState: [
            {required: false, message: '身心状况不能为空', trigger: 'blur'}
          ],
          attention: [
            {required: false, message: '注意事项不能为空', trigger: 'blur'}
          ],
          birthday: [
            {required: true, message: '出生日期不能为空', trigger: 'blur'}
          ],
          height: [
            {required: false, message: '身高不能为空', trigger: 'blur'}
          ],
          maritalStatus: [
            {required: false, message: '婚姻状况不能为空', trigger: 'blur'}
          ],
          weight: [
            {required: false, message: '体重不能为空', trigger: 'blur'}
          ],
          bloodType: [
            {required: false, message: '血型不能为空', trigger: 'blur'}
          ],
          filepath: [
            {required: false, message: '头像路径不能为空', trigger: 'blur'}
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
              url: this.$http.adornUrl(`/generator/customer/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.createTime = data.customer.createTime
                this.dataForm.createBy = data.customer.createBy
                this.dataForm.updateTime = data.customer.updateTime
                this.dataForm.updateBy = data.customer.updateBy
                this.dataForm.isDeleted = data.customer.isDeleted
                this.dataForm.customerName = data.customer.customerName
                this.dataForm.customerAge = data.customer.customerAge
                this.dataForm.customerSex = data.customer.customerSex
                this.dataForm.idcard = data.customer.idcard
                this.dataForm.roomNumber = data.customer.roomNumber
                this.dataForm.buildingId = data.customer.buildingId
                this.dataForm.recordId = data.customer.recordId
                this.dataForm.elderType = data.customer.elderType
                this.dataForm.checkinDate = data.customer.checkinDate
                this.dataForm.expirationDate = data.customer.expirationDate
                this.dataForm.contactTel = data.customer.contactTel
                this.dataForm.bedId = data.customer.bedId
                this.dataForm.psychosomaticState = data.customer.psychosomaticState
                this.dataForm.attention = data.customer.attention
                this.dataForm.birthday = data.customer.birthday
                this.dataForm.height = data.customer.height
                this.dataForm.maritalStatus = data.customer.maritalStatus
                this.dataForm.weight = data.customer.weight
                this.dataForm.bloodType = data.customer.bloodType
                this.dataForm.filepath = data.customer.filepath
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
              url: this.$http.adornUrl(`/generator/customer/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'createTime': this.dataForm.createTime,
                'createBy': this.dataForm.createBy,
                'updateTime': this.dataForm.updateTime,
                'updateBy': this.dataForm.updateBy,
                'isDeleted': this.dataForm.isDeleted,
                'customerName': this.dataForm.customerName,
                'customerAge': this.dataForm.customerAge,
                'customerSex': this.dataForm.customerSex,
                'idcard': this.dataForm.idcard,
                'roomNumber': this.dataForm.roomNumber,
                'buildingId': this.dataForm.buildingId,
                'recordId': this.dataForm.recordId,
                'elderType': this.dataForm.elderType,
                'checkinDate': this.dataForm.checkinDate,
                'expirationDate': this.dataForm.expirationDate,
                'contactTel': this.dataForm.contactTel,
                'bedId': this.dataForm.bedId,
                'psychosomaticState': this.dataForm.psychosomaticState,
                'attention': this.dataForm.attention,
                'birthday': this.dataForm.birthday,
                'height': this.dataForm.height,
                'maritalStatus': this.dataForm.maritalStatus,
                'weight': this.dataForm.weight,
                'bloodType': this.dataForm.bloodType,
                'filepath': this.dataForm.filepath
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
