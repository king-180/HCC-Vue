<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="参数名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button  type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button  type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      height="480px"
      style="width: 100%;">
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        type="index"
        :index="indexMethod"
        label="序号"
        width="50"
        align="center">
      </el-table-column>
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        label="创建时间"
        width="130px">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ formatDate(scope.row.createTime)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="createBy"
        header-align="center"
        align="center"
        label="创建者">
      </el-table-column>
      <el-table-column
        prop="updateTime"
        header-align="center"
        align="center"
        label="更新时间"
        width="130px">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ formatDate(scope.row.updateTime)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="updateBy"
        header-align="center"
        align="center"
        label="更新者">
      </el-table-column>
      <!--<el-table-column-->
        <!--prop="isDeleted"-->
        <!--header-align="center"-->
        <!--align="center"-->
        <!--label="逻辑删除">-->
        <!--<template slot-scope="scope">-->
                    <!--<span style="margin-left: 10px">-->
                        <!--<el-switch-->
                          <!--v-model="scope.row.isDeleted"-->
                          <!--:active-value="1"-->
                          <!--:inactive-value="0"-->
                          <!--active-color="#13ce66"-->
                          <!--inactive-color="#ff4949"-->
                          <!--@change="handleChange(scope.row)">-->
                        <!--</el-switch>-->
                    <!--</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column
        prop="outgoingReason"
        header-align="center"
        align="center"
        width="130px"
        label="外出事由">
      </el-table-column>
      <el-table-column
        prop="outgoingTime"
        header-align="center"
        align="center"
        label="外出时间"
        width="130px">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ formatDate(scope.row.outgoingTime)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="expectedReturnTime"
        header-align="center"
        align="center"
        label="预计回院时间"
        width="130px">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ formatDate(scope.row.expectedReturnTime)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="actualReturnTime"
        header-align="center"
        align="center"
        label="实际回院时间"
        width="130px">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ formatDate(scope.row.actualReturnTime)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="escorted"
        header-align="center"
        align="center"
        label="陪同人">
      </el-table-column>
      <el-table-column
        prop="relation"
        header-align="center"
        align="center"
        width="130px"
        label="与老人关系">
      </el-table-column>
      <el-table-column
        prop="escortedTel"
        header-align="center"
        align="center"
        width="130px"
        label="陪同人电话">
      </el-table-column>
      <el-table-column
        prop="auditStatus"
        header-align="center"
        align="center"
        label="审批状态">
      </el-table-column>
      <el-table-column
        prop="auditPerson"
        header-align="center"
        align="center"
        label="审批人">
      </el-table-column>
      <el-table-column
        prop="auditTime"
        header-align="center"
        align="center"
        label="审批时间"
        width="130px">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ formatDate(scope.row.auditTime)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
  import AddOrUpdate from './outgoing-add-or-update'
  import {makeSimpleDate} from "../../../utils/dateformat";

  export default {
    data () {
      return {
        dataForm: {
          key: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false
      }
    },
    components: {
      AddOrUpdate
    },
    activated () {
      this.getDataList()
    },
    methods: {
      //转换日期
      formatDate(date) {
        return makeSimpleDate(date)
      },
      indexMethod(index) {
        return index + 1;
      },
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/generator/outgoing/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'key': this.dataForm.key
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list
            this.totalPage = data.page.totalCount
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 新增 / 修改
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
      // 删除
      deleteHandle (id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.id
        })
        this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/generator/outgoing/delete'),
            method: 'post',
            data: this.$http.adornData(ids, false)
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        })
      }
    }
  }
</script>
