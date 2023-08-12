<template>
  <el-card class="page-top">
    <el-row type="flex" justify="space-between" align="middle">
      <el-col>
        <div v-if="showBefore" class="before">
          <i class="el-icon-bell" />
          <slot name="before" />
        </div>
      </el-col>
      <el-col>
        <el-row type="flex" justify="end">
          <slot name="after" />
        </el-row>
      </el-col>

    </el-row>
  </el-card>
</template>

<script>
export default {
  props: {
    showBefore: {
      type: Boolean,
      default: false
    }
  }
}
</script>

  <style lang="scss">
   .page-top {
      background-color:#ebf1f6;
      .before {
        line-height: 34px;
        background-color:#ebf1f6;
      i {
        margin-right: 5px;
        color:blue;
      }
      display: inline-block;
      padding: 0px 100px;
      border-radius: 3px;
      border: 1px solid rgba(145, 213, 255, 1);
    }
   }
  </style>

