<template>
  <el-button
    native-type="submit"
    type="primary"
    :loading="loading"
    v-bind="attrs"
  >
    {{text}}
  </el-button>
</template>

<script>
export default {
  name: 'MDSubmit',
  props: {
    text: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: false,
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
