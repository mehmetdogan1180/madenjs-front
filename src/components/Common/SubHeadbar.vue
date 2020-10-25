<template>
  <div class="sub-header">
    <div class="float-left">

    </div>
    <div class="float-right">
      <el-button
        type="info"
        size="mini"
        @click="goBack"
        icon="el-icon-back"
      >
        Geri Dön
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SubHeadbar',
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
