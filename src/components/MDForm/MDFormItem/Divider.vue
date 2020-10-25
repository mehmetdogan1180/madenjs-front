<template>
  <el-divider
    v-bind="attrs"
    :content-position="position"
  >
    <span v-html="title"></span>
  </el-divider>
</template>

<script>
export default {
  name: 'MDDivider',
  props: {
    position: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    attrs: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style scoped>

</style>
