<template>
  <el-card
    class="box-card"
    v-loading="page.loading"
  >
    <div slot="header" class="clearfix">
      <span class="card-title">
        {{page.title}}
      </span>
    </div>
    bac
  </el-card>
</template>
<script>
export default {
  name: 'trackerAssign',
  data() {
    return {
      page: {
        title: this.$route.meta.title,
        loading: false,
      },
    };
  },
};
</script>
